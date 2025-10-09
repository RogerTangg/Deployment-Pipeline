const assert = require('assert')
const { sum } = require('../src/sum')

/* eslint-disable no-console */
console.log('🔎 Running automated tests...')
/* eslint-enable no-console */

// 透過 GITHUB_JOB 環境變數，精準判斷是否在 GitHub Action 的 "test" job 中
const isTestJob = process.env.GITHUB_JOB === 'test'

/* eslint-disable no-console */
console.log(`目前環境: ${isTestJob ? 'GitHub Action Test Job' : '本地環境或 Build Job'}, GITHUB_JOB = ${process.env.GITHUB_JOB || '未設定'}`)
/* eslint-enable no-console */

try {
  if (isTestJob) {
    // ❌ 在 GitHub Action 的 "test" job 中故意失敗
    assert.strictEqual(sum(1, 2), 4) // 故意錯的期待值，會失敗
  } else {
    // ✅ 在本地環境和 Build 階段通過
    assert.strictEqual(sum(1, 2), 3) // 正確的期待值
  }

  /* eslint-disable no-console */
  console.log('✅ All tests passed.')
  /* eslint-enable no-console */
  process.exit(0)
} catch (err) {
  /* eslint-disable no-console */
  console.error('❌ Test failed:', err.message)
  /* eslint-enable no-console */
  process.exit(1)
}
