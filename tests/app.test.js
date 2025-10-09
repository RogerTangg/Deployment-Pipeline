/**
 * API 端點測試 - 故意失敗版本
 * API Endpoints Testing - Intentionally Failing Version
 *
 * 此版本包含故意設置錯誤的測試，用於演示 CI/CD 流程中的測試失敗處理
 * This version contains intentionally incorrect tests to demonstrate test failure handling in CI/CD pipeline
 */

const assert = require('assert')
const request = require('supertest')
const app = require('../src/index')

/* eslint-disable no-console */
console.log('🔎 Running automated tests...')
/* eslint-enable no-console */

// API 端點測試群組
describe('API Endpoints', () => {
  // 根路由測試 - 故意失敗
  describe('GET /', () => {
    test('應該回傳應用程式資訊 (should return app information)', async () => {
      const response = await request(app).get('/')

      // 驗證回應狀態碼
      expect(response.status).toBe(200)
      // ❌ 故意錯誤的期待值 - 預期會得到錯誤的訊息
      expect(response.body.message).toBe('Wrong Expected Message') // 故意失敗
      expect(response.body).toHaveProperty('environment')
      expect(response.body).toHaveProperty('version')
      expect(response.body).toHaveProperty('buildTag')
      expect(response.body).toHaveProperty('timestamp')
    })
  })

  // 健康檢查端點測試 - 故意失敗
  describe('GET /health', () => {
    test('應該回傳健康狀態 (should return health status)', async () => {
      const response = await request(app).get('/health')

      // ❌ 故意錯誤的狀態碼期待
      expect(response.status).toBe(500) // 故意失敗，實際應該是 200
      expect(response.body).toHaveProperty('status', 'healthy')
      expect(response.body).toHaveProperty('environment')
      expect(response.body).toHaveProperty('uptime')
      expect(response.body).toHaveProperty('timestamp')
    })
  })

  // 詳細資訊端點測試 - 使用 assert 的故意失敗
  describe('GET /api/info', () => {
    test('應該回傳詳細應用程式資訊 (should return detailed app information)', async () => {
      const response = await request(app).get('/api/info')

      expect(response.status).toBe(200)

      try {
        // ❌ 使用 assert 進行故意失敗的測試
        assert.strictEqual(response.body.name, 'Wrong App Name') // 故意錯的期待值，會失敗
        /* eslint-disable no-console */
        console.log('✅ Assert test passed (this should not appear)')
        /* eslint-enable no-console */
      } catch (err) {
        /* eslint-disable no-console */
        console.error('❌ Assert test failed:', err.message)
        /* eslint-enable no-console */
        // 重新拋出錯誤讓 Jest 捕獲
        throw err
      }

      expect(response.body).toHaveProperty('description')
      expect(response.body).toHaveProperty('environment')
      expect(response.body).toHaveProperty('version')
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

// 環境變數測試群組 - 故意失敗
describe('Environment Variables', () => {
  test('應該正確處理自訂環境變數 (should handle custom environment variables)', async () => {
    // 設定測試用環境變數
    const originalEnv = process.env
    process.env.APP_VERSION = '2.0.0'
    process.env.BUILD_TAG = 'test-build'
    process.env.RELEASE_NOTE = 'Test release'
    process.env.NODE_ENV = 'test'

    const response = await request(app).get('/api/info')

    // ❌ 故意錯誤的版本期待值
    expect(response.body.version).toBe('999.999.999') // 故意失敗
    expect(response.body.buildTag).toBe('test-build')
    expect(response.body.releaseNote).toBe('Test release')
    expect(response.body.environment).toBe('test')

    // 恢復原始環境變數
    process.env = originalEnv
  })
})
