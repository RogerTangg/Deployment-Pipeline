const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const app = express()
const PORT = process.env.PORT || 3000
const NODE_ENV = process.env.NODE_ENV || 'development'

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Deployment Pipeline Assignment API',
    environment: NODE_ENV,
    version: process.env.APP_VERSION || '1.0.0',
    buildTag: process.env.BUILD_TAG || 'local-build',
    timestamp: new Date().toISOString()
  })
})

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    environment: NODE_ENV,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  })
})

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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    error: 'Something went wrong!',
    environment: NODE_ENV
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  })
})

// Start server only if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`)
    console.log(`Build Tag: ${process.env.BUILD_TAG || 'local-build'}`)
    console.log(`Version: ${process.env.APP_VERSION || '1.0.0'}`)
  })
}

module.exports = app