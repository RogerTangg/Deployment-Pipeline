const assert = require('assert')
const { sum } = require('../src/sum')

/* eslint-disable no-console */
console.log('🔎 Running automated tests...')
/* eslint-enable no-console */

try {
  assert.strictEqual(sum(1, 2), 4) // ❌ 故意錯的期待值，會失敗
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
