import { describe, expect, it } from 'vitest'
import { completeTask, createTask, InvalidTaskTitleError, normalizeTitle } from './task'

describe('task domain', () => {
  it('trims the title', () => {
    expect(normalizeTitle('  Write tests ')).toBe('Write tests')
  })

  it('rejects empty and too long titles', () => {
    expect(() => normalizeTitle('   ')).toThrow(InvalidTaskTitleError)
    expect(() => normalizeTitle('x'.repeat(201))).toThrow(InvalidTaskTitleError)
  })

  it('creates an open task with the given timestamp', () => {
    const now = new Date('2026-01-01T00:00:00Z')
    expect(createTask({ id: '1', title: 'A', now })).toEqual({ id: '1', title: 'A', done: false, createdAt: now })
  })

  it('defaults the timestamp to the current time', () => {
    expect(createTask({ id: '1', title: 'A' }).createdAt).toBeInstanceOf(Date)
  })

  it('completes a task idempotently', () => {
    const task = createTask({ id: '1', title: 'A' })
    const done = completeTask(task)
    expect(done.done).toBe(true)
    expect(completeTask(done)).toBe(done)
  })
})
