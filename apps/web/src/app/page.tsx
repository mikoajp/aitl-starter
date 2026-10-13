import { createTask } from '@aitl/core'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  const sample = createTask({ id: 'sample', title: 'Pierwsze zadanie z domeny @aitl/core' })

  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-semibold">AITL Starter</h1>
      <p className="mt-2 text-neutral-600">Monorepo gotowe do pracy z agentami AI. Sprawdź stan: /api/health.</p>
      <section className="mt-8 flex items-center justify-between rounded-md border border-neutral-200 p-4">
        <span>{sample.title}</span>
        <Button size="sm">Zrobione</Button>
      </section>
    </main>
  )
}
