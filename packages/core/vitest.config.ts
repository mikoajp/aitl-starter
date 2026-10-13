import { defineConfig } from 'vitest/config'

// Testy jednostkowe: szybkie, bez bazy. Warstwa infrastructure jest pokryta testami integracyjnymi.
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/domain/**', 'src/application/**', 'src/container.ts'],
      exclude: ['src/**/*.test.ts'],
      thresholds: { statements: 100, branches: 100, functions: 100, lines: 100 },
    },
  },
})
