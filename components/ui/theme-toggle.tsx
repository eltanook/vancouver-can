"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by not rendering anything until mounted
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-400 dark:text-white"
        disabled
      >
        <div className="h-4 w-4" />
      </Button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-400 dark:text-white"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  )
} 