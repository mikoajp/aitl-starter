import { PostgreSqlContainer, type StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { buildContainer, createOrm, MikroTaskRepository } from '../src'

// W CI baza startuje w kontenerze (testcontainers). Lokalnie bez Dockera
// ustaw TEST_DATABASE_URL na istniejącą, pustą bazę PostgreSQL.
let container: StartedPostgreSqlContainer | undefined
let orm: Awaited<ReturnType<typeof createOrm>>

beforeAll(async () => {
  const url = process.env.TEST_DATABASE_URL ?? (container = await new PostgreSqlContainer('postgres:16-alpine').start()).getConnectionUri()
  orm = await createOrm(url)
  await orm.schema.refreshDatabase()
})

afterAll(async () => {
  await orm?.close()
  await container?.stop()
})

describe('TaskService with PostgreSQL', () => {
  it('persists, completes and lists tasks', async () => {
    const di = buildContainer({ taskRepository: new MikroTaskRepository(orm.em) })
    const service = di.resolve('taskService')

    const first = await service.create('Write the first migration')
    await service.create('Add CI')
    await service.complete(first.id)

    const tasks = await service.list()
    expect(tasks.map((t) => [t.title, t.done])).toEqual([
      ['Write the first migration', true],
      ['Add CI', false],
    ])
  })
})
