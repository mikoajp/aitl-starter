export interface HealthReport {
  status: 'ok'
  service: string
  time: string
}

export function buildHealthReport(now: Date = new Date()): HealthReport {
  return { status: 'ok', service: 'aitl-web', time: now.toISOString() }
}
