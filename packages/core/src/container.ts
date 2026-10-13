import { asClass, asFunction, asValue, createContainer, InjectionMode, type AwilixContainer } from 'awilix'
import { TaskService, type TaskRepository } from './application/taskService'

export interface Cradle {
  taskRepository: TaskRepository
  generateId: () => string
  taskService: TaskService
}

export function buildContainer(overrides: { taskRepository: TaskRepository; generateId?: () => string }): AwilixContainer<Cradle> {
  const container = createContainer<Cradle>({ injectionMode: InjectionMode.PROXY, strict: true })
  container.register({
    taskRepository: asValue(overrides.taskRepository),
    generateId: overrides.generateId ? asValue(overrides.generateId) : asFunction(() => () => crypto.randomUUID()).singleton(),
    taskService: asClass(TaskService).singleton(),
  })
  return container
}
