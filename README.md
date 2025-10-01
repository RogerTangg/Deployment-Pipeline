# 部署流水線作業 (Deployment Pipeline Assignment)

一個示範使用 GitHub Actions 進行多階段部署流水線的 Node.js 範例應用程式，用於作業 4。

## 📋 專案概述 (Project Overview)

此專案為完成部署流水線作業提供基礎架構，包含以下功能：

- 簡單的 Express.js REST API
- 使用 Jest 進行自動化測試
- 多階段 GitHub Actions 工作流程
- 環境特定配置
- 建置與部署自動化

## 🚀 快速開始 (Getting Started)

### 前置需求 (Prerequisites)

- Node.js 16+ 
- npm 或 yarn
- Git
- GitHub 帳號

### 本地開發 (Local Development)

1. **複製專案儲存庫 (Clone the repository)**
   ```bash
   git clone <your-repo-url>
   cd deployment-pipeline-assignment
   ```

2. **安裝相依套件 (Install dependencies)**
   ```bash
   npm install
   ```

3. **執行測試 (Run tests)**
   ```bash
   npm test
   ```

4. **啟動開發伺服器 (Start development server)**
   ```bash
   npm start
   ```

5. **建置應用程式 (Build the application)**
   ```bash
   npm run build
   ```

## 🏗️ 專案結構 (Project Structure)

```
deployment-pipeline-assignment/
├── .github/
│   └── workflows/
│       ├── ci-dev.yml              # 基本 2 階段流水線 (A 級)
│       └── ci-cd-pipeline.yml      # 進階 3 階段流水線 (E 級)
├── config/
│   ├── .env.development            # 開發環境變數
│   ├── .env.staging                # 測試環境變數
│   ├── .env.production             # 生產環境變數
│   └── environments-setup.md       # GitHub 環境設定指南
├── src/
│   └── index.js                    # 主要應用程式檔案
├── tests/
│   └── app.test.js                 # 應用程式測試
├── scripts/
│   └── build.js                    # 建置腳本
├── package.json                    # 專案配置
├── .eslintrc.js                    # ESLint 配置
├── .gitignore                      # Git 忽略規則
└── README.md                       # 本檔案
```

## 🔄 CI/CD 流水線 (CI/CD Pipelines)

### 基本流水線 (Basic Pipeline) - `ci-dev.yml` (A 級)

**觸發條件：** 推送至 main 分支，手動觸發

**階段說明：**
1. **建置作業 (Build Job)**
   - 檢出程式碼
   - 安裝相依套件
   - 執行代碼檢查和測試
   - 建置應用程式
   - 上傳構建產物

2. **開發環境部署作業 (Deploy Dev Job)**
   - 下載構建產物
   - 建立 GitHub release（dev 標籤）
   - 部署至開發環境

### 進階流水線 (Advanced Pipeline) - `ci-cd-pipeline.yml` (E 級)

**觸發條件：** 僅限手動觸發

**階段說明：**
1. **建置作業 (Build Job)**
   - 完整測試與覆蓋率檢查
   - 版本管理
   - 建立構建產物

2. **測試環境部署 (Deploy Staging)**
   - 部署至測試環境
   - 執行測試環境驗證測試
   - 建立測試環境 release

3. **生產環境部署 (Deploy Production)**
   - 需要手動審核
   - 部署至生產環境
   - 部署後驗證
   - 建立生產環境 release

## 🌍 GitHub 環境設定 (GitHub Environments Setup)

### 必要環境設定 (Required Environments)

在 GitHub Settings → Environments 建立以下環境：

#### 1. `dev` 開發環境
```
變數 (Variables):
- BUILD_TAG: dev-v1.0
- RELEASE_NOTE: Development build for testing
```

#### 2. `staging` 測試環境  
```
變數 (Variables):
- BUILD_TAG: staging-v1.0
- RELEASE_NOTE: Testing pre-production release
```

#### 3. `production` 生產環境
```
變數 (Variables):
- BUILD_TAG: prod-v1.0
- RELEASE_NOTE: Production release v1.0

保護規則 (Protection Rules):
- 必要審核者 (Required reviewers): [添加您的指導老師/隊友]
- 等待計時器 (Wait timer): 1-5 分鐘（可選）
- 部署分支 (Deployment branches): 僅限 main
```

### 詳細設定說明 (Detailed Setup Instructions)

詳細的環境配置步驟請參考 [`config/environments-setup.md`](config/environments-setup.md)。

## 🛠️ 可用腳本 (Available Scripts)

| 腳本 (Script) | 描述 (Description) |
|--------|-------------|
| `npm start` | 啟動應用程式 |
| `npm test` | 執行測試 |
| `npm run test:watch` | 以監看模式執行測試 |
| `npm run build` | 建置應用程式 |
| `npm run lint` | 執行 ESLint |
| `npm run lint:fix` | 修復 ESLint 問題 |

## 📡 API 端點 (API Endpoints)

### GET /
回傳基本應用程式資訊，包括版本、環境和建置詳細資訊。

**回應 (Response):**
```json
{
  "message": "Deployment Pipeline Assignment API",
  "environment": "development",
  "version": "1.0.0",
  "buildTag": "local-build",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### GET /health
健康檢查端點。

**回應 (Response):**
```json
{
  "status": "healthy",
  "environment": "development", 
  "uptime": 123.456,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### GET /api/info
詳細應用程式資訊。

**回應 (Response):**
```json
{
  "name": "Deployment Pipeline Assignment",
  "description": "A sample application for demonstrating CI/CD pipeline with GitHub Actions",
  "environment": "development",
  "version": "1.0.0",
  "buildTag": "local-build",
  "releaseNote": "Local development build"
}
```

## 🧪 測試 (Testing)

專案包含以下方面的完整測試：
- API 端點功能
- 環境變數處理
- 錯誤處理
- 健康檢查

執行包含覆蓋率的測試：
```bash
npm test -- --coverage
```

## 🔧 環境變數 (Environment Variables)

應用程式使用以下環境變數：

| 變數 (Variable) | 描述 (Description) | 預設值 (Default) |
|----------|-------------|---------|
| `NODE_ENV` | 應用程式環境 | `development` |
| `PORT` | 伺服器埠號 | `3000` |
| `APP_VERSION` | 應用程式版本 | `1.0.0` |
| `BUILD_TAG` | 建置識別碼 | `local-build` |
| `RELEASE_NOTE` | 發布說明 | `Local development build` |

## 📝 作業完成指南 (Assignment Completion Guide)

### A 級作業 (基本任務)
1. 使用 `ci-dev.yml` 工作流程
2. 設定包含變數的 `dev` 環境
3. 推送至 main 分支以觸發流水線
4. 驗證建置和 release 建立

### E 級作業 (進階任務)
1. 使用 `ci-cd-pipeline.yml` 工作流程
2. 設定所有三個環境（dev、staging、production）
3. 配置生產環境保護規則
4. 測試手動工作流程觸發
5. 驗證測試環境部署
6. 測試生產環境審核流程

### O 級作業 (優秀任務)
擴展現有工作流程，添加：
- 動態版本升級
- Slack/電子郵件通知
- 多個 Node.js 版本的矩陣策略
- 回滾功能
- 增強測試策略

## 📚 報告文件 (Documentation for Report)

此專案提供報告所需的所有螢幕截圖和記錄：

1. **環境設定**：GitHub Settings → Environments 的螢幕截圖
2. **保護規則**：生產環境審核者設定
3. **工作流程執行**：GitHub Actions 執行記錄
4. **發布版本**：GitHub releases 頁面顯示不同環境標籤
5. **建置產物**：可下載的建置套件

## 🤝 貢獻 (Contributing)

1. Fork 此專案儲存庫
2. 建立功能分支
3. 進行您的修改
4. 執行測試並確保通過
5. 提交 pull request

## 📄 授權 (License)

此專案採用 MIT 授權 - 詳細資訊請參見 [LICENSE](LICENSE) 檔案。

## 🆘 疑難排解 (Troubleshooting)

### 常見問題 (Common Issues)

1. **測試失敗**：確保使用 `npm install` 安裝所有相依套件
2. **建置錯誤**：檢查 Node.js 版本（需要 16+）
3. **工作流程失敗**：驗證環境變數設定正確
4. **權限錯誤**：確保 GITHUB_TOKEN 具備必要權限

### 取得協助 (Getting Help)

- 檢查 GitHub Actions 記錄獲取詳細錯誤訊息
- 查看 `config/environments-setup.md` 中的環境設定指南
- 確保所有必要的環境變數都已配置

---

**快樂部署！🚀 (Happy deploying! 🚀)**