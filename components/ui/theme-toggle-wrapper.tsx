"use client"

import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"

// Dynamic import to prevent hydration issues
const ThemeToggle = dynamic(() => import('./theme-toggle').then(mod => ({ default: mod.ThemeToggle })), {
  ssr: false,
  loading: () => (
    <Button
      variant="ghost"
      size="sm"
      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-400 dark:text-white"
      disabled
    >
      <div className="h-4 w-4" />
    </Button>
  ),
})

export default ThemeToggle 