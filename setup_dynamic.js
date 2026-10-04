const fs = require('fs');
const path = require('path');

const data = require('./sidebar_menu_items.json');
const docsDir = path.join(__dirname, 'app', 'docs');
const dataDir = path.join(__dirname, 'app', 'data', 'docs');

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

// 1. CLEANUP
const dirsToKeep = ['eba', 'layout.tsx', 'page.tsx'];
if (fs.existsSync(docsDir)) {
  const items = fs.readdirSync(docsDir);
  items.forEach(item => {
    if (!dirsToKeep.includes(item)) {
      const p = path.join(docsDir, item);
      fs.rmSync(p, { recursive: true, force: true });
    }
  });
  // Clean up non-custom parts of 'eba' if they exist, but preserve eba/kullanim-dokumanlari/eba-ebys-egitim
  const ebaDir = path.join(docsDir, 'eba');
  if (fs.existsSync(ebaDir)) {
    const ebaItems = fs.readdirSync(ebaDir);
    ebaItems.forEach(item => {
      if (item !== 'kullanim-dokumanlari') {
        fs.rmSync(path.join(ebaDir, item), { recursive: true, force: true });
      } else {
        const kullanim = path.join(ebaDir, 'kullanim-dokumanlari');
        const kItems = fs.readdirSync(kullanim);
        kItems.forEach(ki => {
          if (ki !== 'eba-ebys-egitim') {
            fs.rmSync(path.join(kullanim, ki), { recursive: true, force: true });
          }
        });
      }
    });
  }
}

// 2. CREATE SAMPLE JSON DATA
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

function processNodeForData(node, currentPathParts, originalNames) {
  if (typeof node === 'string') {
    const parts = [...currentPathParts, slugify(node)];
    const p = path.join(dataDir, ...parts.slice(0, -1));
    if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
    
    const filePath = path.join(p, parts[parts.length - 1] + '.json');
    const title = node;
    const parent = originalNames[originalNames.length - 1] || "Dokümantasyon";
    
    fs.writeFileSync(filePath, JSON.stringify({
      title: title,
      parent: parent,
      description: `${title} ile ilgili detaylı içerik ve yapılandırma bilgileri bu sayfada listelenmektedir.`,
      content: `Bu alan dinamik olarak JSON dosyasından gelmektedir. ${parent} ürün grubuna ait ${title} ayarlarını, kullanım adımlarını ve en iyi pratikleri buradan inceleyebilirsiniz.`,
      lastUpdated: new Date().toISOString().split('T')[0]
    }, null, 2));
  } else if (Array.isArray(node)) {
    node.forEach(item => processNodeForData(item, currentPathParts, originalNames));
  } else if (typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) {
      if (Array.isArray(value) && value.length === 0) {
        // Empty category
        if (key !== "Dijital Dönüşüm Yol Arkadaşınız!") {
           const slugKey = slugify(key);
           const p = path.join(dataDir, ...currentPathParts);
           if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
           
           fs.writeFileSync(path.join(p, slugKey + '.json'), JSON.stringify({
             title: key,
             description: `${key} sayfası.`,
             content: `Dinamik JSON içeriği: ${key}`,
             lastUpdated: new Date().toISOString().split('T')[0]
           }, null, 2));
        }
      } else {
        processNodeForData(value, [...currentPathParts, slugify(key)], [...originalNames, key]);
      }
    }
  }
}

data["Bimser Dokümantasyon"].forEach(obj => {
  for (const [key, val] of Object.entries(obj)) {
    if (val.length === 0) {
       if (key !== "Dijital Dönüşüm Yol Arkadaşınız!") {
          processNodeForData(key, [], []);
       }
    } else {
       processNodeForData(val, [slugify(key)], [key]);
    }
  }
});

console.log("Cleanup & JSON data creation complete.");
