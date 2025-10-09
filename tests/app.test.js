const assert = require('assert')
const { sum } = require('../src/sum')

/* eslint-disable no-console */
console.log('🔎 Running automated tests...')
/* eslint-enable no-console */

// 檢查是否在 GitHub Action 的 Test 階段
const isGitHubActionTestStage = process.env.GITHUB_ACTIONS === 'true' &&
                               process.env.GITHUB_WORKFLOW

try {
  if (isGitHubActionTestStage) {
    // ❌ 在 GitHub Action Test 階段故意失敗
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
