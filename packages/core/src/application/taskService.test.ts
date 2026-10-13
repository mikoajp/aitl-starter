import { describe, expect, it } from 'vitest'
import type { Task } from '../domain/task'
import { TaskNotFoundError, TaskService, type TaskRepository } from './taskService'

function inMemoryRepository(): TaskRepository {
  const store = new Map<string, Task>()
  return {
    async save(task) {
      store.set(task.id, task)
    },
    async findById(id) {
      return store.get(id) ?? null
    },
    async list() {
      return [...store.values()]
    },
  }
}

function makeService() {
  let counter = 0
  return new TaskService({ taskRepository: inMemoryRepository(), generateId: () => `id-${++counter}` })
}

describe('TaskService', () => {
  it('creates and lists tasks', async () => {
    const service = makeService()
    const created = await service.create(' Ship it ')
    expect(created.title).toBe('Ship it')
    expect(await service.list()).toEqual([created])
  })

  it('completes an existing task', async () => {
    const service = makeService()
    const { id } = await service.create('A')
    expect((await service.complete(id)).done).toBe(true)
  })

  it('fails when completing an unknown task', async () => {
    await expect(makeService().complete('missing')).rejects.toBeInstanceOf(TaskNotFoundError)
  })
})
