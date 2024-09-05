import { twMerge } from 'tailwind-merge'
import tailwind from 'tailwind-variant-group'
import { actions, useStore } from '@/store'

function twFn(...args: unknown[]) {
  return twMerge(tailwind(...args))
}

window.cn = twFn
window.$store = actions
window.$useStore = useStore

declare global {
  var cn: typeof twFn
  var $store: typeof actions
  var $useStore: typeof useStore
}

import './index'
