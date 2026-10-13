import type { EntityManager } from '@mikro-orm/postgresql'
import type { TaskRepository } from '../application/taskService'
import type { Task } from '../domain/task'
import { TaskEntity } from './taskEntity'

export class MikroTaskRepository implements TaskRepository {
  constructor(private readonly em: EntityManager) {}

  async save(task: Task): Promise<void> {
    await this.em.upsert(TaskEntity, task)
  }

  async findById(id: string): Promise<Task | null> {
    const row = await this.em.fork().findOne(TaskEntity, { id })
    return row ? { id: row.id, title: row.title, done: row.done, createdAt: row.createdAt } : null
  }

  async list(): Promise<Task[]> {
    const rows = await this.em.fork().find(TaskEntity, {}, { orderBy: { createdAt: 'asc' } })
    return rows.map((row) => ({ id: row.id, title: row.title, done: row.done, createdAt: row.createdAt }))
  }
}
