# 部署流水線作業 (Deployment Pipeline Assignment)

展示使用 GitHub Actions 進行 CI/CD 部署流水線的 Node.js 範例專案。此專案包含完整的建置、測試、發布自動化流程。

A Node.js sample project demonstrating CI/CD deployment pipeline using GitHub Actions, featuring complete build, test, and release automation workflows.

## 最近活動
<!--START_SECTION:activity-->
1. ❌ Labeled PR [#27204](undefined) in [ydb-platform/ydb](https://github.com/ydb-platform/ydb)
<!--END_SECTION:activity-->

## 📋 專案概述 (Project Overview)

這個專案展示了現代軟體開發中的持續整合與持續部署 (CI/CD) 實務，包含：

- **Express.js REST API** - 簡潔的 Web 服務應用程式
- **自動化測試** - 使用 Jest 進行單元測試與 API 測試
- **程式碼品質控制** - ESLint 代碼風格檢查
- **自動化建置流水線** - Build-Test-Release 完整流程
- **GitHub Actions 工作流程** - 完整的 CI/CD 自動化

## 🏗️ 專案架構 (Project Structure)

```
deployment-pipeline/
├── .github/workflows/          # GitHub Actions 工作流程檔案
│   ├── BuildTestRelease.yml   # 建置-測試-發布流水線
│   ├── update-readme.yml      # README 自動更新
│   └── cicd.yml              # 多環境 CI/CD 流水線
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

### 主要工作流程 (Main Workflow) - `BuildTestRelease.yml`

**觸發條件：** 推送至 main 分支 或 手動觸發

**流程階段：**

1. **建置階段 (Build Stage)**
   - 程式碼檢出 (Code Checkout)
   - Node.js 18 環境設定
   - 相依套件安裝 (`npm ci`)
   - 執行建置腳本 (`npm run build`)
   - 建置產物上傳 (Upload build artifact)

2. **測試階段 (Test Stage)**
   - 下載建置產物
   - 執行自動化測試 (`npm test`)
   - 測試失敗時終止流程

3. **發布階段 (Release Stage)**
   - 在 `dev` 環境執行
   - 創建部署包 (`deployment-package.tar.gz`)
   - 自動建立 GitHub Release
   - 上傳部署檔案

### 多環境流水線 (Multi-Environment Pipeline) - `cicd.yml`

**適用對象：** 進階多環境部署  
**觸發條件：** 
- 推送至 main 分支（自動執行 Dev 部署）
- 手動觸發（可執行 Staging 和 Production 部署）

**流程階段：**

1. **建置與打包 (Build & Package)**
   - 完整的程式碼品質檢查
   - 版本管理與 Artifact 建立

2. **開發環境部署 (Development Deployment)**
   - 自動觸發（推送時）
   - 建立 Pre-release

3. **測試環境部署 (Staging Deployment)**
   - 手動觸發工作流程
   - 測試環境驗證

4. **生產環境部署 (Production Deployment)**
   - 手動觸發工作流程
   - **需要人工審核** ⚠️
   - 正式版本發佈

### README 自動更新 - `update-readme.yml`

**功能：** 自動更新 README 中的最近活動區塊  
**觸發時間：** 每小時執行一次 或 手動觸發

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

## 📝 使用指南 (Usage Guide)

### 基本工作流程 (Basic Workflow)

1. **自動觸發 (Push 到 main 分支)**
   ```bash
   git add .
   git commit -m "feat: 新增功能"
   git push origin main
   ```
   - 自動執行 `BuildTestRelease.yml` 工作流程
   - 通過測試後自動建立 Dev Release

2. **手動觸發進階部署**
   - 前往 GitHub Actions 頁面
   - 選擇 `CI/CD Deployment Pipeline`
   - 點擊 `Run workflow`
   - 輸入可選的版本號和發布說明
   - 可部署到 Staging 或 Production 環境

### 建置產物說明 (Build Artifacts)

**建置腳本 (`scripts/build.js`) 會產生：**
- `build/src/` - 應用程式原始碼
- `build/package.json` - 生產環境用的簡化配置
- `build/build-info.json` - 建置資訊和版本詳細
- `build/*.tgz` - 打包的部署檔案

**GitHub Release 包含：**
- `deployment-package.tar.gz` - 完整的部署包
- 自動產生的版本標籤（格式：`dev-{timestamp}`）
- 建置說明和環境資訊

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

## 🔧 故障排除 (Troubleshooting)

### GitHub Actions 常見問題

1. **Artifact 找不到錯誤**
   ```
   Error: Unable to download artifact(s): Artifact not found
   ```
   **解決方案：** 確保 build job 成功完成，檢查建置腳本是否正確產生 `build/` 目錄

2. **權限錯誤 (HTTP 403)**
   ```
   HTTP 403: Resource not accessible by integration
   ```
   **解決方案：** 確認工作流程檔案中包含適當的權限設定：
   ```yaml
   permissions:
     contents: write
     deployments: write
   ```

3. **測試失敗**
   ```bash
   # 確保安裝所有相依套件
   npm install
   # 清除快取
   npm cache clean --force
   ```

4. **建置錯誤**
   ```bash
   # 檢查 Node.js 版本（需要 16+）
   node --version
   ```

5. **Release 建立失敗**
   - 確認 `GITHUB_TOKEN` 有適當權限
   - 檢查是否嘗試上傳目錄而非檔案
   - 驗證檔案路徑是否正確

---

*最後更新：2025年10月 | Last Updated: October 2025*