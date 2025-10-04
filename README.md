# 部署流水線作業 (Deployment Pipeline Assignment)

展示使用 GitHub Actions 進行多階段部署流水線的 Node.js 範例專案。此專案包含完整的 CI/CD 自動化流程。

A Node.js sample project demonstrating multi-stage deployment pipeline using GitHub Actions, featuring complete CI/CD automation workflows.

## 最近活動
<!--START_SECTION:activity-->
1. 🗣 Commented on [#92](https://github.com/brstu/OTIS-2025/pull/92#issuecomment-3368102747) in [brstu/OTIS-2025](https://github.com/brstu/OTIS-2025)
<!--END_SECTION:activity-->

<!-- ## 📋 專案概述 (Project Overview)

這個專案展示了現代軟體開發中的持續整合與持續部署 (CI/CD) 實務，包含：

- **Express.js REST API** - 簡潔的 Web 服務應用程式
- **自動化測試** - 使用 Jest 進行單元測試與 API 測試
- **程式碼品質控制** - ESLint 代碼風格檢查
- **多階段部署流水線** - 開發、測試、生產環境的自動化部署
- **GitHub Actions 工作流程** - 完整的 CI/CD 自動化

## 🏗️ 專案架構 (Project Structure)

```
deployment-pipeline/
├── .github/workflows/          # GitHub Actions 工作流程檔案
│   ├── deploy.yml             # 簡化版部署流水線 (A 級作業)
│   └── cicd.yml              # 完整版 CI/CD 流水線 (E 級作業)
├── src/                       # 原始程式碼
│   └── index.js              # Express.js 主應用程式
├── tests/                     # 測試檔案
│   └── app.test.js           # API 端點測試
├── scripts/                   # 建置腳本
│   └── build.js              # 自動化建置腳本
├── config/                    # 配置檔案
│   └── environments-setup.md # 環境設定說明
├── build/                     # 建置輸出目錄
├── package.json              # Node.js 專案設定檔
├── .eslintrc.js             # ESLint 配置
├── .gitignore               # Git 忽略規則
└── README.md                # 專案說明文件
```

## 🚀 快速開始 (Quick Start)

### 前置需求 (Prerequisites)

- **Node.js** 16.0+ 
- **npm** 或 **yarn**
- **Git**
- **GitHub 帳號**

### 本地開發環境設定 (Local Development Setup)

1. **複製專案 (Clone Repository)**
   ```bash
   git clone https://github.com/RogerTangg/Deployment-Pipeline.git
   cd Deployment-Pipeline
   ```

2. **安裝相依套件 (Install Dependencies)**
   ```bash
   npm install
   ```

3. **執行程式碼檢查 (Run Linting)**
   ```bash
   npm run lint
   ```

4. **執行測試 (Run Tests)**
   ```bash
   npm test
   ```

5. **啟動開發伺服器 (Start Development Server)**
   ```bash
   npm start
   ```
   伺服器將在 http://localhost:3000 啟動

6. **建置專案 (Build Project)**
   ```bash
   npm run build
   ```

## 📡 API 端點說明 (API Endpoints)

### GET /
**根路由** - 回傳基本應用程式資訊

**回應範例 (Response Example):**
```json
{
  "message": "Deployment Pipeline Assignment API",
  "environment": "development",
  "version": "1.0.0",
  "buildTag": "local-build",
  "timestamp": "2024-10-01T10:00:00.000Z"
}
```

### GET /health
**健康檢查端點** - 回傳伺服器運行狀態

**回應範例:**
```json
{
  "status": "healthy",
  "environment": "development",
  "uptime": 123.456,
  "timestamp": "2024-10-01T10:00:00.000Z"
}
```

### GET /api/info
**詳細資訊端點** - 回傳完整應用程式資訊

**回應範例:**
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

## 🔄 CI/CD 流水線 (CI/CD Pipelines)

### 簡化版流水線 (Simplified Pipeline) - `deploy.yml`

**適用對象：** A 級作業要求  
**觸發條件：** 推送至 main 分支 或 手動觸發

**流程階段：**
1. **建置階段 (Build Stage)**
   - 程式碼檢出 (Code Checkout)
   - Node.js 環境設定
   - 相依套件安裝
   - 程式碼風格檢查 (Linting)
   - 單元測試執行
   - 應用程式建置
   - 建置產物打包

2. **部署階段 (Deploy Stage)**
   - 建置產物下載
   - GitHub Release 建立
   - 開發環境部署標記

### 完整版流水線 (Complete Pipeline) - `cicd.yml`

**適用對象：** E 級作業要求  
**觸發條件：** 
- 推送至 main 分支（僅執行開發環境部署）
- 手動觸發（執行完整流程）

**流程階段：**

1. **建置階段 (Build Stage)**
   - 完整的程式碼品質檢查
   - 測試覆蓋率分析
   - 版本管理
   - 建置產物建立

2. **開發環境部署 (Development Deployment)**
   - 自動觸發（推送時）
   - 建立 Pre-release
   - 開發環境標記

3. **測試環境部署 (Staging Deployment)**
   - 手動觸發
   - 測試環境驗證
   - 預生產環境準備

4. **生產環境部署 (Production Deployment)**
   - **需要人工審核** ⚠️
   - 生產環境部署
   - 最終版本發佈

## 🌍 GitHub 環境設定 (GitHub Environments)

### 必要環境配置 (Required Environment Setup)

在 GitHub 專案的 **Settings → Environments** 中建立以下環境：

#### 1. `dev` (開發環境)
```yaml
變數 (Variables):
  BUILD_TAG: "dev-v1.0"
  RELEASE_NOTE: "開發版本建置 - Development build for testing"
```

#### 2. `staging` (測試環境)
```yaml
變數 (Variables):
  BUILD_TAG: "staging-v1.0"
  RELEASE_NOTE: "測試環境版本 - Testing pre-production release"
```

#### 3. `production` (生產環境)
```yaml
變數 (Variables):
  BUILD_TAG: "prod-v1.0"
  RELEASE_NOTE: "正式版本發佈 - Production release"

保護規則 (Protection Rules):
  ✅ 必要審核者: [指導老師/團隊成員]
  ✅ 等待時間: 1-5 分鐘
  ✅ 部署分支限制: 僅 main 分支
```

## 🛠️ 可用指令 (Available Commands)

| 指令 (Command) | 說明 (Description) |
|----------------|-------------------|
| `npm start` | 啟動應用程式伺服器 |
| `npm test` | 執行所有測試 |
| `npm run test:watch` | 監看模式執行測試 |
| `npm run build` | 建置專案（包含檢查、測試、打包） |
| `npm run lint` | 執行程式碼風格檢查 |
| `npm run lint:fix` | 自動修復程式碼風格問題 |

## 🧪 測試說明 (Testing)

專案包含完整的測試覆蓋：

- **API 端點測試** - 驗證所有 REST API 功能
- **環境變數處理測試** - 確保配置正確載入
- **錯誤處理測試** - 驗證異常情況處理
- **健康檢查測試** - 確保服務可用性監控

**執行測試並查看覆蓋率：**
```bash
npm test -- --coverage
```

## 🔧 環境變數設定 (Environment Variables)

| 變數名稱 | 說明 | 預設值 |
|----------|------|--------|
| `NODE_ENV` | 執行環境 | `development` |
| `PORT` | 伺服器埠號 | `3000` |
| `APP_VERSION` | 應用程式版本 | `1.0.0` |
| `BUILD_TAG` | 建置標籤 | `local-build` |
| `RELEASE_NOTE` | 發布說明 | `Local development build` |

## 📝 作業完成指南 (Assignment Completion Guide)

### A 級作業 (Basic Requirements)
1. ✅ 使用 `deploy.yml` 工作流程
2. ✅ 設定 `dev` 環境變數
3. ✅ 推送程式碼觸發自動部署
4. ✅ 驗證 GitHub Release 建立成功

### E 級作業 (Advanced Requirements)
1. ✅ 使用 `cicd.yml` 完整工作流程
2. ✅ 設定三個環境 (dev, staging, production)
3. ✅ 配置生產環境保護規則
4. ✅ 測試手動工作流程觸發
5. ✅ 驗證審核流程運作
6. ✅ 確認多階段部署成功

### O 級作業 (Outstanding Requirements)
進階功能擴展建議：
- 🔄 動態版本號自動遞增
- 📧 Slack/Email 部署通知
- 🧪 多 Node.js 版本矩陣測試
- 🔙 自動回滚機制
- 📊 部署狀態儀表板

## � 專案特色 (Project Features)

- **🎯 教學導向** - 清晰的程式碼註解和文件說明
- **🔒 安全實務** - Helmet 安全中介軟體和環境變數管理
- **⚡ 效能優化** - 輕量級架構和快速建置流程
- **📱 現代化** - 使用最新的 Node.js 和 GitHub Actions 功能
- **🧪 品質保證** - 完整的測試覆蓋和自動化檢查
- **🌍 國際化** - 中英文雙語支援

## 🤝 參與貢獻 (Contributing)

1. Fork 此專案
2. 建立功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交變更 (`git commit -m 'Add some amazing feature'`)
4. 推送至分支 (`git push origin feature/amazing-feature`)
5. 開啟 Pull Request

## 📄 授權條款 (License)

此專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 檔案

## 🆘 常見問題與排除 (Troubleshooting)

### 常見問題 (Common Issues)

1. **測試失敗**
   ```bash
   # 確保安裝所有相依套件
   npm install
   # 清除快取
   npm cache clean --force
   ```

2. **建置錯誤**
   ```bash
   # 檢查 Node.js 版本（需要 16+）
   node --version
   ```

3. **工作流程失敗**
   - 確認環境變數正確設定
   - 檢查 GitHub token 權限
   - 驗證分支保護規則

4. **部署權限錯誤**
   - 確認 GITHUB_TOKEN 權限
   - 檢查環境保護設定
   - 驗證審核者設定

---

*最後更新：2024年10月 | Last Updated: October 2024*