'use client'

import { useState } from 'react'

export default function SwaggerBadge() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <a
        href="/docs"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`
          bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg
          transition-all duration-300 transform hover:scale-105
          flex items-center space-x-2 font-medium
          ${isHovered ? 'shadow-xl' : ''}
        `}>
          <span className="text-sm">📚</span>
          <span className="text-sm">API Docs</span>
          <span className="text-xs bg-green-400 px-2 py-1 rounded">Swagger</span>
        </div>
        
        {/* Tooltip */}
        <div className={`
          absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg
          transition-all duration-300 whitespace-nowrap
          ${isHovered ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2 pointer-events-none'}
        `}>
          <div className="relative">
            Ver documentación completa de la API
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </a>
    </div>
  )
}
