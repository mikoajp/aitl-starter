import { completeTask, createTask, type Task } from '../domain/task'

export interface TaskRepository {
  save(task: Task): Promise<void>
  findById(id: string): Promise<Task | null>
  list(): Promise<Task[]>
}

export class TaskNotFoundError extends Error {
  constructor(id: string) {
    super(`Task ${id} not found`)
    this.name = 'TaskNotFoundError'
  }
}

export interface TaskServiceDeps {
  taskRepository: TaskRepository
  generateId: () => string
}

export class TaskService {
  constructor(private readonly deps: TaskServiceDeps) {}

  async create(title: string): Promise<Task> {
    const task = createTask({ id: this.deps.generateId(), title })
    await this.deps.taskRepository.save(task)
    return task
  }

  async complete(id: string): Promise<Task> {
    const existing = await this.deps.taskRepository.findById(id)
    if (!existing) throw new TaskNotFoundError(id)
    const done = completeTask(existing)
    await this.deps.taskRepository.save(done)
    return done
  }

  list(): Promise<Task[]> {
    return this.deps.taskRepository.list()
  }
}
