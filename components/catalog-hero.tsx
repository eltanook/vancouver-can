"use client"

import { useState, useRef, useEffect } from "react"

export default function CatalogHero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleLoadedData = () => {
        setIsLoaded(true)
        setHasError(false)
      }
      
      const handleError = () => {
        setHasError(true)
        setIsLoaded(false)
      }
      
      video.addEventListener('loadeddata', handleLoadedData)
      video.addEventListener('canplaythrough', handleLoadedData)
      video.addEventListener('error', handleError)
      
      // Forzar recarga del video
      video.load()
      
      // Intentar reproducir el video
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // En caso de error de reproducción automática, no marcar como error
          // ya que puede ser política del navegador
        })
      }
      
      return () => {
        video.removeEventListener('loadeddata', handleLoadedData)
        video.removeEventListener('canplaythrough', handleLoadedData)
        video.removeEventListener('error', handleError)
      }
    }
  }, [])

  return (
    <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden bg-gray-200 dark:bg-gray-800">
      {/* Video Background */}
      {!hasError && (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          preload="metadata"
          style={{ display: isLoaded ? 'block' : 'none' }}
        >
          <source src="/Vancouver banner prueba.mp4" type="video/mp4" />
          Su navegador no soporta la reproducción de video.
        </video>
      )}

      {/* Fallback placeholder while video loads or if error */}
      {(!isLoaded || hasError) && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black flex items-center justify-center">
          <div className="text-white text-center">
            {hasError ? (
              <div>
                <div className="h-8 w-32 bg-gray-700 rounded mb-2 mx-auto"></div>
                <div className="h-4 w-24 bg-gray-700 rounded mx-auto"></div>
              </div>
            ) : (
              <div className="animate-pulse">
                <div className="h-8 w-32 bg-gray-700 rounded mb-2 mx-auto"></div>
                <div className="h-4 w-24 bg-gray-700 rounded mx-auto"></div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
    </div>
  )
}
