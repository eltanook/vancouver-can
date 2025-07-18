"use client"

import { useTheme } from "next-themes"

export default function WhatsappButton() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  return (
    <a
      href="https://wa.me/5491160294510"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 z-40
        ${isDark ? "bg-white text-black hover:bg-gray-100" : "bg-black text-white hover:bg-gray-800"}`}
      style={{ borderRadius: 0 }}
    >
      {/* Simple WhatsApp SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12 0a11.88 11.88 0 0 0-10 18l-2 6 6-2A11.88 11.88 0 0 0 12 24a11.86 11.86 0 0 0 11.52-15.39 11.86 11.86 0 0 0-2.99-4.67Zm-8.5 17.43a9.29 9.29 0 0 1-4.71-1.29l-.34-.2-3.51 1 1-3.4-.22-.35a9.35 9.35 0 1 1 7.78 4.24Zm5.1-6.71c-.28-.14-1.64-.81-1.89-.9s-.44-.14-.63.14-.72.9-.88 1.09-.32.2-.6.07a7.57 7.57 0 0 1-2.2-1.36 8.3 8.3 0 0 1-1.54-1.93c-.16-.28 0-.43.12-.57s.28-.35.42-.53a1.94 1.94 0 0 0 .28-.47.5.5 0 0 0 0-.49c-.07-.14-.63-1.47-.86-2-.23-.55-.46-.47-.63-.48h-.54a1 1 0 0 0-.7.32 2.95 2.95 0 0 0-.92 2.18 5.1 5.1 0 0 0 1.09 2.39 11.71 11.71 0 0 0 4.42 4c.62.27 1.1.43 1.47.55a3.5 3.5 0 0 0 1.6.1 2.63 2.63 0 0 0 1.73-1.22 2.14 2.14 0 0 0 .15-1.22c-.07-.14-.25-.2-.53-.35Z"/>
      </svg>
    </a>
  )
} 