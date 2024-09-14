'use client'

import { useState, useRef } from 'react'

export default function AutoWebsiteReveal() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const websiteUrl = 'https://jagranachieverawards.com/'

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleVideoEnd = () => {
    setIsPlaying(false)
    setVideoEnded(true)
    openWebsite()
  }

  const openWebsite = () => {
    const newWindow = window.open(websiteUrl, '_blank')
    if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
      window.location.href = websiteUrl
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="relative w-full h-screen aspect-video bg-black overflow-hidden shadow-xl">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/videos/launch.mp4"
          onEnded={handleVideoEnd}
        />
        {!isPlaying && !videoEnded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-56">
            <div
              onClick={handlePlay}
              className="relative w-32 h-32 flex items-center justify-center cursor-pointer select-none
                transition-transform duration-150 ease-in-out transform hover:scale-105 hover:shadow-lg animate-pulse opacity-60"
            >
              <img
                src="/launch.svg"
                alt="Launch"
                className="w-28 h-28 object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
