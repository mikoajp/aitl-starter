import { describe, expect, it } from 'vitest'
import type { TaskRepository } from './application/taskService'
import { buildContainer } from './container'

const repository: TaskRepository = {
  async save() {},
  async findById() {
    return null
  },
  async list() {
    return []
  },
}

describe('buildContainer', () => {
  it('resolves a TaskService with the injected generator', async () => {
    const container = buildContainer({ taskRepository: repository, generateId: () => 'fixed' })
    const task = await container.resolve('taskService').create('A')
    expect(task.id).toBe('fixed')
  })

  it('falls back to random UUIDs', () => {
    const container = buildContainer({ taskRepository: repository })
    expect(container.resolve('generateId')()).toMatch(/^[0-9a-f-]{36}$/)
  })
})
