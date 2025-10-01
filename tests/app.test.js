/**
 * API 端點測試
 * API Endpoints Testing
 * 
 * 測試所有 API 端點的功能性和正確性
 * Testing functionality and correctness of all API endpoints
 */

const request = require('supertest')
const app = require('../src/index')

// API 端點測試群組
describe('API Endpoints', () => {
  // 根路由測試
  describe('GET /', () => {
    test('應該回傳應用程式資訊 (should return app information)', async () => {
      const response = await request(app).get('/')

      // 驗證回應狀態碼
      expect(response.status).toBe(200)
      // 驗證回應內容包含必要欄位
      expect(response.body).toHaveProperty('message')
      expect(response.body).toHaveProperty('environment')
      expect(response.body).toHaveProperty('version')
      expect(response.body).toHaveProperty('buildTag')
      expect(response.body).toHaveProperty('timestamp')
      expect(response.body.message).toBe('Deployment Pipeline Assignment API')
    })
  })

  // 健康檢查端點測試
  describe('GET /health', () => {
    test('應該回傳健康狀態 (should return health status)', async () => {
      const response = await request(app).get('/health')

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('status', 'healthy')
      expect(response.body).toHaveProperty('environment')
      expect(response.body).toHaveProperty('uptime')  // 執行時間
      expect(response.body).toHaveProperty('timestamp')
    })
  })

  // 詳細資訊端點測試
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

  // 404 錯誤處理測試
  describe('GET /nonexistent', () => {
    test('不存在的路由應該回傳 404 (should return 404 for non-existent routes)', async () => {
      const response = await request(app).get('/nonexistent')

      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty('error', 'Route not found')
      expect(response.body).toHaveProperty('path', '/nonexistent')
    })
  })
})

// 環境變數測試群組
describe('Environment Variables', () => {
  test('應該正確處理自訂環境變數 (should handle custom environment variables)', async () => {
    // 設定測試用環境變數
    const originalEnv = process.env
    process.env.APP_VERSION = '2.0.0'
    process.env.BUILD_TAG = 'test-build'
    process.env.RELEASE_NOTE = 'Test release'
    process.env.NODE_ENV = 'test'

    const response = await request(app).get('/api/info')

    // 驗證環境變數是否正確反映在回應中
    expect(response.body.version).toBe('2.0.0')
    expect(response.body.buildTag).toBe('test-build')
    expect(response.body.releaseNote).toBe('Test release')
    expect(response.body.environment).toBe('test')

    // 恢復原始環境變數
    process.env = originalEnv
  })
})
