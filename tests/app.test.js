const assert = require('assert');
const { sum } = require('../src/sum');

console.log('🔎 Running automated tests...');

try {
  assert.strictEqual(sum(1, 2), 4); // ❌ 故意錯的期待值，會失敗
  console.log('✅ All tests passed.');
  process.exit(0);
} catch (err) {
  console.error('❌ Test failed:', err.message);
  process.exit(1);
}