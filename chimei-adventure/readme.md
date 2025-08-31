## 奇美博物館大冒險（Chimei Adventure）

一個以奇美博物館為主題的互動式小網頁，包含圖像線索翻牌與謎題翻牌兩個頁面。支援點擊與鍵盤操作、翻牌動畫、以及謎題頁的全螢幕檢視。

### 內容與頁面
- **index.html**: 活動入口
- **pictures.html**: 圖像線索翻牌（資料由 `js/picture.js` 產生）
- **puzzles.html**: 謎題翻牌（點擊可全螢幕檢視圖片）
- **tools/encrypt.html**: 小工具頁（若有使用）

### 特色
- **翻牌效果**: 點擊卡片或使用鍵盤即可在正面/背面之間切換
- **全螢幕檢視（謎題頁）**: 再次點擊或按 ESC 關閉，背景捲動會被鎖定
- **響應式格線**: 在手機、平板、桌機上都有良好顯示
- **無障礙**: 使用 `tabindex`, `role="button"`, `aria-pressed`，支援鍵盤操作（Enter/Space/ESC）

### 檔案結構（重點）
- `css/theme.css`: 共用主題樣式（字體、顏色等）
- `css/adventure.css`: 通用頁面樣式
- `css/picture.css`: 翻牌卡片與全螢幕樣式
- `js/picture.js`: 圖像線索頁卡片資料與互動邏輯
- `js/puzzles.js`: 謎題頁互動邏輯（翻牌與全螢幕、鍵盤操作）
- `pictures.html` / `puzzles.html`: 對應頁面
- `assets/`: 所有圖片資源

### 快速開始
1) 直接以瀏覽器開啟
   - 雙擊 `chimei-adventure/index.html` 開啟即可瀏覽

2) 使用本機靜態伺服器（建議）
   - Python 3:
     ```bash
     cd /Users/kylin/Documents/05-SideProject/kylin/chimei-adventure
     python3 -m http.server 8080
     ```
     開啟瀏覽器前往 `http://localhost:8080/`

### 如何新增卡片
- **圖像線索頁（pictures.html）**
  - 編輯 `js/picture.js` 中的 `PICTURE_CARDS` 陣列，新增一個物件：
    ```js
    {
      badge: '1F',
      title: '圖片題X-X',
      description: '說明文字',
      imageUrl: './assets/your-image.png',
      imageAlt: '替代文字'
    }
    ```

- **謎題頁（puzzles.html）**
  - 複製整個 `<article class="flip-card">...</article>` 區塊，修改樓層徽章、標題/描述，並替換背面圖片路徑：
    ```html
    <article class="flip-card" tabindex="0" role="button" aria-pressed="false">
      <div class="flip-inner">
        <div class="face front">
          <div class="face-content">
            <span class="badge">2F</span>
            <h2 class="title">謎題X</h2>
            <p class="desc">說明文字</p>
          </div>
        </div>
        <div class="face back">
          <img src="./assets/your-image.png" alt="替代文字">
        </div>
      </div>
    </article>
    ```

### 操作說明（可及性）
- Tab 鍵可移動焦點到卡片上
- Enter 或 Space：翻牌 / 進入全螢幕
- ESC：關閉全螢幕（謎題頁）

### 圖片資源
- 將圖片放在 `chimei-adventure/assets/`
- HTML 或 JS 內使用相對路徑，例如 `./assets/投影片1.png`

### 開發備註
- 翻牌與全螢幕狀態透過 CSS 類別控制：
  - `.flipped`: 卡片已翻到背面
  - `.expanded`: 全螢幕狀態（謎題頁）
- `picture.css` 內含相關動畫與全螢幕樣式，請避免更動上述類名以免互動邏輯失效。

### 如何建立密碼（產生加密線索）
此專案不在程式碼中存放明文答案，而是使用瀏覽器端的加密（AES‑GCM + PBKDF2）來保護線索內容。你可以用內建工具快速產生兩組密碼對應的密文。

1) 開啟加密工具
   - 用瀏覽器開啟 `chimei-adventure/tools/encrypt.html`

2) 產生線索 I（對應首頁「密碼 I」）
   - Key：輸入玩家要在首頁「密碼 I」欄位填入的字（例：`rose`）。注意大小寫與空白都會被精確比對。
   - Word：解密後要顯示的線索字（例：`NAVE`）
   - Note（可選）：補充說明（例：`中央長廊光線匯聚處`）
   - 點擊 Encrypt，複製輸出的 JSON 物件（包含 `salt`, `iv`, `cipherText`）
   - 貼到 `js/adventure.js` 的 `encryptedClue1` 物件中，覆蓋舊值

3) 產生線索 II（對應首頁「密碼 II」）
   - 重複上一步，在工具右側區塊輸入另一組 Key/Word/Note
   - 複製輸出的 JSON，貼到 `js/adventure.js` 的 `encryptedClue2`

4) 測試
   - 開啟 `index.html`，在「密碼 I / 密碼 II」輸入剛設定的 Key
   - 成功時會顯示兩組線索（Word/Note），全部正確會顯示「答對了兩個，您真內行！」

小提醒
- 密碼區分大小寫，且不會自動移除前後空白。請在設計密碼時避免不必要的空白。
- 目前加密採用：PBKDF2（SHA‑256，120,000 次迭代）導出金鑰，並以 AES‑GCM（256-bit）加密；每次會產生隨機 `salt`（16 bytes）與 `iv`（12 bytes）。
- 想更換密碼時，重新用工具產生新密文，覆蓋 `encryptedClue1/2` 即可。

## Crossword Puzzle Maker
1. [Puzzle1](https://crosswordlabs.com/edit/1-71064)
2. [Puzzle2](https://crosswordlabs.com/edit/2-1505672)
