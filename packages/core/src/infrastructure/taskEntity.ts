import { EntitySchema } from '@mikro-orm/core'
import type { Task } from '../domain/task'

export const TaskEntity = new EntitySchema<Task>({
  name: 'Task',
  tableName: 'tasks',
  properties: {
    id: { type: 'uuid', primary: true },
    title: { type: 'string', length: 200 },
    done: { type: 'boolean', default: false },
    createdAt: { type: 'Date', columnType: 'timestamptz' },
  },
})
