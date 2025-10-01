/**
 * 部署流水線作業 - Express.js API 伺服器
 * Deployment Pipeline Assignment - Express.js API Server
 *
 * 這是一個簡單的 REST API 伺服器，用於演示 CI/CD 部署流水線
 * A simple REST API server for demonstrating CI/CD deployment pipeline
 */

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const app = express()
// 從環境變數取得埠號，預設為 3000
const PORT = process.env.PORT || 3000
// 從環境變數取得執行環境，預設為 development
const NODE_ENV = process.env.NODE_ENV || 'development'

// 中介軟體 (Middleware) 設定
app.use(helmet()) // 安全性標頭設定
app.use(cors()) // 跨來源資源共享設定
app.use(express.json()) // JSON 解析設定

// 路由定義 (Routes)

/**
 * 根路由 - 回傳基本應用程式資訊
 * Root route - Returns basic application information
 */
app.get('/', (req, res) => {
  res.json({
    message: 'Deployment Pipeline Assignment API',
    environment: NODE_ENV,
    version: process.env.APP_VERSION || '1.0.0',
    buildTag: process.env.BUILD_TAG || 'local-build',
    timestamp: new Date().toISOString()
  })
})

/**
 * 健康檢查端點 - 回傳伺服器狀態
 * Health check endpoint - Returns server status
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    environment: NODE_ENV,
    uptime: process.uptime(), // 伺服器執行時間（秒）
    timestamp: new Date().toISOString()
  })
})

/**
 * 詳細資訊端點 - 回傳完整應用程式資訊
 * Detailed info endpoint - Returns complete application information
 */
app.get('/api/info', (req, res) => {
  res.json({
    name: 'Deployment Pipeline Assignment',
    description: 'A sample application for demonstrating CI/CD pipeline with GitHub Actions',
    environment: NODE_ENV,
    version: process.env.APP_VERSION || '1.0.0',
    buildTag: process.env.BUILD_TAG || 'local-build',
    releaseNote: process.env.RELEASE_NOTE || 'Local development build'
  })
})

// 錯誤處理中介軟體 (Error handling middleware)
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err.stack) // 記錄錯誤堆疊資訊
  res.status(500).json({
    error: 'Something went wrong!',
    environment: NODE_ENV
  })
})

// 404 錯誤處理器 - 處理找不到的路由
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  })
})

// 僅在直接執行此檔案時啟動伺服器（非 import 時）
// Start server only if this file is run directly (not when imported)
if (require.main === module) {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`伺服器運行於埠號 ${PORT}，環境：${NODE_ENV}`)
    // eslint-disable-next-line no-console
    console.log(`建置標籤 (Build Tag): ${process.env.BUILD_TAG || 'local-build'}`)
    // eslint-disable-next-line no-console
    console.log(`版本 (Version): ${process.env.APP_VERSION || '1.0.0'}`)
  })
}

module.exports = app
