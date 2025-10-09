/**
 * API 端點測試 - 在 GitHub Action Test 階段故意失敗
 * API Endpoints Testing - Intentionally Failing in GitHub Action Test Stage
 *
 * Build 階段會通過，但在 Test 階段會故意失敗
 * Build stage will pass, but Test stage will intentionally fail
 */

const assert = require('assert')
const request = require('supertest')
const app = require('../src/index')

/* eslint-disable no-console */
console.log('🔎 Running automated tests...')
/* eslint-enable no-console */

// API 端點測試群組
describe('API Endpoints', () => {
  // 根路由測試 - 正確版本（讓 Build 階段通過）
  describe('GET /', () => {
    test('應該回傳應用程式資訊 (should return app information)', async () => {
      const response = await request(app).get('/')

      // 驗證回應狀態碼
      expect(response.status).toBe(200)
      // 正確的期待值
      expect(response.body.message).toBe('Deployment Pipeline Assignment API')
      expect(response.body).toHaveProperty('environment')
      expect(response.body).toHaveProperty('version')
      expect(response.body).toHaveProperty('buildTag')
      expect(response.body).toHaveProperty('timestamp')
    })
  })

  // 健康檢查端點測試 - 正確版本
  describe('GET /health', () => {
    test('應該回傳健康狀態 (should return health status)', async () => {
      const response = await request(app).get('/health')

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('status', 'healthy')
      expect(response.body).toHaveProperty('environment')
      expect(response.body).toHaveProperty('uptime')
      expect(response.body).toHaveProperty('timestamp')
    })
  })

  // 詳細資訊端點測試 - 正確版本
  describe('GET /api/info', () => {
    test('應該回傳詳細應用程式資訊 (should return detailed app information)', async () => {
      const response = await request(app).get('/api/info')

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('name', 'Deployment Pipeline Assignment')
      expect(response.body).toHaveProperty('description')
      expect(response.body).toHaveProperty('environment')
      expect(response.body).toHaveProperty('version')
      expect(response.body).toHaveProperty('buildTag')
      expect(response.body).toHaveProperty('releaseNote')
    })
  })

  // ❌ 故意失敗的測試 - 只在 GitHub Action Test 階段執行
  describe('Intentional Failure Tests', () => {
    test('故意失敗的測試 - 演示 CI/CD 測試失敗處理', async () => {
      // 檢查是否在 GitHub Action 環境中
      const isGitHubAction = process.env.CI === 'true' && process.env.GITHUB_ACTIONS === 'true'

      if (isGitHubAction) {
        /* eslint-disable no-console */
        console.log('🔥 在 GitHub Action 環境中執行故意失敗的測試...')
        /* eslint-enable no-console */

        try {
          // ❌ 故意失敗的 assert 測試
          assert.strictEqual(1 + 1, 3) // 故意錯誤：1+1 應該等於 2，不是 3

          /* eslint-disable no-console */
          console.log('✅ 這行不應該被執行到')
          /* eslint-enable no-console */
        } catch (err) {
          /* eslint-disable no-console */
          console.error('❌ GitHub Action Test 故意失敗:', err.message)
          /* eslint-enable no-console */
          // 重新拋出錯誤，讓 Jest 捕獲並使測試失敗
          throw err
        }
      } else {
        /* eslint-disable no-console */
        console.log('✅ 本地環境 - 跳過故意失敗的測試')
        /* eslint-enable no-console */
        // 在本地環境中，這個測試會通過
        expect(true).toBe(true)
      }
    })

    test('另一個故意失敗的測試 - API 錯誤期待', async () => {
      // 只在 GitHub Action 環境中故意失敗
      const isGitHubAction = process.env.CI === 'true' && process.env.GITHUB_ACTIONS === 'true'

      if (isGitHubAction) {
        const response = await request(app).get('/health')

        /* eslint-disable no-console */
        console.log('🔥 執行故意失敗的 API 測試...')
        /* eslint-enable no-console */

        // ❌ 故意錯誤的期待值
        expect(response.body.status).toBe('unhealthy') // 實際是 'healthy'
      } else {
        // 本地環境中正確的測試
        const response = await request(app).get('/health')
        expect(response.body.status).toBe('healthy')
      }
    })
  })

  // 404 錯誤處理測試 - 保持正確
  describe('GET /nonexistent', () => {
    test('不存在的路由應該回傳 404 (should return 404 for non-existent routes)', async () => {
      const response = await request(app).get('/nonexistent')

      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty('error', 'Route not found')
      expect(response.body).toHaveProperty('path', '/nonexistent')
    })
  })
})

// 環境變數測試群組 - 正確版本
describe('Environment Variables', () => {
  test('應該正確處理自訂環境變數 (should handle custom environment variables)', async () => {
    // 設定測試用環境變數
    const originalEnv = process.env
    process.env.APP_VERSION = '2.0.0'
    process.env.BUILD_TAG = 'test-build'
    process.env.RELEASE_NOTE = 'Test release'
    process.env.NODE_ENV = 'test'

    const response = await request(app).get('/api/info')

    // 正確的版本期待值
    expect(response.body.version).toBe('2.0.0')
    expect(response.body.buildTag).toBe('test-build')
    expect(response.body.releaseNote).toBe('Test release')
    expect(response.body.environment).toBe('test')

    // 恢復原始環境變數
    process.env = originalEnv
  })
})
