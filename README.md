<div align="center">
  <h1>📚 Bimser Docs Portal</h1>
  <p>Şirket İçi Akıllı Dokümantasyon Arama Motoru (Yapay Zeka Destekli)</p>
</div>

---

## 📌 Proje Hakkında

Bu proje, kurum içi dokümanların (Kullanım Kılavuzları, Kurulum Rehberleri, Teknik Şartnameler) son kullanıcılar tarafından akıllı ve anlamsal (semantic) olarak aranabildiği **Son Kullanıcı Arayüzüdür (Frontend)**.

Kullanıcılar klasik anahtar kelime araması yerine, doğrudan cümleler kurarak veya soru sorarak `pgvector` veritabanı içinde en alakalı doküman parçalarına milisaniyeler içinde ulaşabilirler.

### 🌟 Öne Çıkan Özellikler

*   **Semantic Search (Anlamsal Arama):** "Sisteme nasıl giriş yaparım?" gibi doğal dil sorularını anlayarak en doğru dokümanı getirme.
*   **Hızlı ve Modern Arayüz:** Next.js 14 altyapısı ile anında yanıt veren kullanıcı deneyimi.
*   **Tam Entegrasyon:** Arka planda `bimser-rag-api` üzerinden Vektör Veritabanı ve Llama 3.1 ile kusursuz iletişim.

---

## 🛠️ Mimari ve Teknolojiler

*   **Framework:** Next.js 14
*   **Dil:** TypeScript
*   **Stil:** Tailwind CSS
*   **Bağlantı:** FastAPI Backend (`bimser-rag-api`) ile entegre.

---

## 🚀 Kurulum (Local Development)

Paneli bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin:

### Gereksinimler
*   Node.js (v18 veya üzeri)
*   Arka planda `bimser-rag-api` projesinin (Backend) 8000 portunda çalışıyor olması gerekir.

### Adım Adım Kurulum

1.  **Projeyi Klonlayın:**
    ```bash
    git clone https://github.com/kadirerentugran/bimser-docs-portal.git
    cd bimser-docs-portal
    ```

2.  **Bağımlılıkları Kurun:**
    ```bash
    npm install --legacy-peer-deps
    ```

3.  **Çalıştırın:**
    ```bash
    npm run dev
    ```

4.  **Erişim:**
    Tarayıcınızdan şu adrese giderek portala ulaşabilirsiniz (Backend port 8000, Admin port 3000 kullandığı için bu proje varsayılan olarak **3001** portunda çalışır):
    👉 **[http://localhost:3001](http://localhost:3001)**

---
