import { describe, expect, it } from 'vitest'
import { buildHealthReport } from './health'

describe('buildHealthReport', () => {
  it('reports ok with an ISO timestamp', () => {
    expect(buildHealthReport(new Date('2026-01-01T00:00:00Z'))).toEqual({
      status: 'ok',
      service: 'aitl-web',
      time: '2026-01-01T00:00:00.000Z',
    })
  })

  it('defaults to the current time', () => {
    expect(buildHealthReport().time).toMatch(/^\d{4}-\d{2}-\d{2}T/)
  })
})
