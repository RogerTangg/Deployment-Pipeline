const request = require('supertest')
const app = require('../src/index')

describe('API Endpoints', () => {
  describe('GET /', () => {
    test('should return app information', async () => {
      const response = await request(app).get('/')

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message')
      expect(response.body).toHaveProperty('environment')
      expect(response.body).toHaveProperty('version')
      expect(response.body).toHaveProperty('buildTag')
      expect(response.body).toHaveProperty('timestamp')
      expect(response.body.message).toBe('Deployment Pipeline Assignment API')
    })
  })

  describe('GET /health', () => {
    test('should return health status', async () => {
      const response = await request(app).get('/health')

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('status', 'healthy')
      expect(response.body).toHaveProperty('environment')
      expect(response.body).toHaveProperty('uptime')
      expect(response.body).toHaveProperty('timestamp')
    })
  })

  describe('GET /api/info', () => {
    test('should return detailed app information', async () => {
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

  describe('GET /nonexistent', () => {
    test('should return 404 for non-existent routes', async () => {
      const response = await request(app).get('/nonexistent')

      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty('error', 'Route not found')
      expect(response.body).toHaveProperty('path', '/nonexistent')
    })
  })
})

describe('Environment Variables', () => {
  test('should handle custom environment variables', async () => {
    // Set environment variables for testing
    const originalEnv = process.env
    process.env.APP_VERSION = '2.0.0'
    process.env.BUILD_TAG = 'test-build'
    process.env.RELEASE_NOTE = 'Test release'
    process.env.NODE_ENV = 'test'

    const response = await request(app).get('/api/info')

    expect(response.body.version).toBe('2.0.0')
    expect(response.body.buildTag).toBe('test-build')
    expect(response.body.releaseNote).toBe('Test release')
    expect(response.body.environment).toBe('test')

    // Restore original environment
    process.env = originalEnv
  })
})
