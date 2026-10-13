export interface Task {
  id: string
  title: string
  done: boolean
  createdAt: Date
}

export class InvalidTaskTitleError extends Error {
  constructor() {
    super('Task title must be between 1 and 200 characters')
    this.name = 'InvalidTaskTitleError'
  }
}

export function normalizeTitle(title: string): string {
  const trimmed = title.trim()
  if (trimmed.length === 0 || trimmed.length > 200) throw new InvalidTaskTitleError()
  return trimmed
}

export function createTask(input: { id: string; title: string; now?: Date }): Task {
  return { id: input.id, title: normalizeTitle(input.title), done: false, createdAt: input.now ?? new Date() }
}

export function completeTask(task: Task): Task {
  return task.done ? task : { ...task, done: true }
}
