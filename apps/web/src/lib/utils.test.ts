import { describe, expect, it } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('merges conflicting tailwind classes, last one wins', () => {
    const hidden = Math.random() > 2
    expect(cn('px-2', 'px-4', hidden && 'hidden')).toBe('px-4')
  })
})
