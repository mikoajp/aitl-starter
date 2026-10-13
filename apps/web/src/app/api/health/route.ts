import { buildHealthReport } from '@/lib/health'

export const dynamic = 'force-dynamic'

export function GET() {
  return Response.json(buildHealthReport())
}
