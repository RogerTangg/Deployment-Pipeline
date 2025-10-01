const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const BUILD_DIR = 'build'
const DIST_DIR = 'dist'

console.log('🚀 Starting build process...')

// Clean previous builds
if (fs.existsSync(BUILD_DIR)) {
  fs.rmSync(BUILD_DIR, { recursive: true })
  console.log('✅ Cleaned previous build directory')
}

if (fs.existsSync(DIST_DIR)) {
  fs.rmSync(DIST_DIR, { recursive: true })
  console.log('✅ Cleaned previous dist directory')
}

// Create build directories
fs.mkdirSync(BUILD_DIR, { recursive: true })
fs.mkdirSync(DIST_DIR, { recursive: true })
console.log('✅ Created build directories')

// Copy source files
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

// Copy necessary files
copyRecursiveSync('src', path.join(BUILD_DIR, 'src'))
fs.copyFileSync('package.json', path.join(BUILD_DIR, 'package.json'))
console.log('✅ Copied source files')

// Create production package.json (remove dev dependencies)
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
delete packageJson.devDependencies
packageJson.scripts = {
  start: 'node src/index.js'
}

fs.writeFileSync(
  path.join(BUILD_DIR, 'package.json'),
  JSON.stringify(packageJson, null, 2)
)
console.log('✅ Created production package.json')

// Create build info
const buildInfo = {
  buildTime: new Date().toISOString(),
  version: packageJson.version,
  buildTag: process.env.BUILD_TAG || `build-${Date.now()}`,
  environment: process.env.NODE_ENV || 'production',
  releaseNote: process.env.RELEASE_NOTE || 'Production build',
  gitCommit: process.env.GITHUB_SHA || 'unknown'
}

fs.writeFileSync(
  path.join(BUILD_DIR, 'build-info.json'),
  JSON.stringify(buildInfo, null, 2)
)
console.log('✅ Created build info')

// Create deployment-ready archive
try {
  execSync(`cd ${BUILD_DIR} && npm pack`, { stdio: 'inherit' })
  console.log('✅ Created deployment package')
} catch (error) {
  console.error('❌ Failed to create deployment package:', error.message)
  process.exit(1)
}

console.log('🎉 Build process completed successfully!')
console.log(`📦 Build output: ${BUILD_DIR}/`)
console.log(`🏷️  Build tag: ${buildInfo.buildTag}`)
console.log(`📝 Release note: ${buildInfo.releaseNote}`)