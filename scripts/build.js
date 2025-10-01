/**
 * 建置腳本 (Build Script)
 * 
 * 用於建立生產環境部署包的自動化腳本
 * Automated script for creating production deployment packages
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// 建置目錄常數定義
const BUILD_DIR = 'build'  // 建置輸出目錄
const DIST_DIR = 'dist'    // 分發目錄

console.log('🚀 開始建置流程... (Starting build process...)')

// 清理先前的建置檔案
// Clean previous builds
if (fs.existsSync(BUILD_DIR)) {
  fs.rmSync(BUILD_DIR, { recursive: true })
  console.log('✅ 已清理先前的建置目錄 (Cleaned previous build directory)')
}

if (fs.existsSync(DIST_DIR)) {
  fs.rmSync(DIST_DIR, { recursive: true })
  console.log('✅ 已清理先前的分發目錄 (Cleaned previous dist directory)')
}

// 建立建置目錄
// Create build directories
fs.mkdirSync(BUILD_DIR, { recursive: true })
fs.mkdirSync(DIST_DIR, { recursive: true })
console.log('✅ 已建立建置目錄 (Created build directories)')

// 遞迴複製檔案函數
// Recursive file copy function
const copyRecursiveSync = (src, dest) => {
  const exists = fs.existsSync(src)
  const stats = exists && fs.statSync(src)
  const isDirectory = exists && stats.isDirectory()
  
  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true })
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName))
    })
  } else {
    fs.copyFileSync(src, dest)
  }
}

// 複製必要檔案到建置目錄
// Copy necessary files
copyRecursiveSync('src', path.join(BUILD_DIR, 'src'))
fs.copyFileSync('package.json', path.join(BUILD_DIR, 'package.json'))
console.log('✅ 已複製原始檔案 (Copied source files)')

// 建立生產環境用的 package.json（移除開發相依套件）
// Create production package.json (remove dev dependencies)
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
delete packageJson.devDependencies  // 移除開發相依套件
packageJson.scripts = {
  start: 'node src/index.js'  // 僅保留啟動腳本
}

fs.writeFileSync(
  path.join(BUILD_DIR, 'package.json'),
  JSON.stringify(packageJson, null, 2)
)
console.log('✅ 已建立生產環境 package.json (Created production package.json)')

// 建立建置資訊檔案
// Create build info
const buildInfo = {
  buildTime: new Date().toISOString(),                    // 建置時間
  version: packageJson.version,                           // 版本號
  buildTag: process.env.BUILD_TAG || `build-${Date.now()}`,  // 建置標籤
  environment: process.env.NODE_ENV || 'production',     // 執行環境
  releaseNote: process.env.RELEASE_NOTE || 'Production build',  // 發布說明
  gitCommit: process.env.GITHUB_SHA || 'unknown'         // Git 提交雜湊
}

fs.writeFileSync(
  path.join(BUILD_DIR, 'build-info.json'),
  JSON.stringify(buildInfo, null, 2)
)
console.log('✅ 已建立建置資訊 (Created build info)')

// 建立部署用的壓縮包
// Create deployment-ready archive
try {
  execSync(`cd ${BUILD_DIR} && npm pack`, { stdio: 'inherit' })
  console.log('✅ 已建立部署套件 (Created deployment package)')
} catch (error) {
  console.error('❌ 建立部署套件失敗 (Failed to create deployment package):', error.message)
  process.exit(1)
}

console.log('🎉 建置流程成功完成！(Build process completed successfully!)')
console.log(`📦 建置輸出目錄 (Build output): ${BUILD_DIR}/`)
console.log(`🏷️  建置標籤 (Build tag): ${buildInfo.buildTag}`)
console.log(`📝 發布說明 (Release note): ${buildInfo.releaseNote}`)