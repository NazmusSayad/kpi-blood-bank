import { twMerge } from 'tailwind-merge'
import tailwind from 'tailwind-variant-group'

export function cn(...args: unknown[]) {
  return twMerge(tailwind(...args))
}
