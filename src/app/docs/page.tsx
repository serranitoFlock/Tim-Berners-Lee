'use client'

import { useEffect, useState } from 'react'

interface SwaggerSpec {
  openapi: string
  info: {
    title: string
    version: string
    description: string
  }
  paths: Record<string, any>
  components?: {
    schemas?: Record<string, any>
  }
}

export default function SwaggerDocsPage() {
  const [swaggerSpec, setSwaggerSpec] = useState<SwaggerSpec | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null)

  const fetchSwaggerSpec = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/swagger')
      
      if (!response.ok) {
        throw new Error('Error al cargar la documentación de Swagger')
      }
      
      const spec = await response.json()
      setSwaggerSpec(spec)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSwaggerSpec()
  }, [])

  const testEndpoint = async (path: string, method: string) => {
    try {
      const response = await fetch(path, {
        method: method.toUpperCase(),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      const data = await response.json()
      alert(`Respuesta del servidor:\n${JSON.stringify(data, null, 2)}`)
    } catch (err) {
      alert(`Error: ${err instanceof Error ? err.message : 'Error desconocido'}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando documentación de la API...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Error al cargar la documentación
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              type="button"
              onClick={fetchSwaggerSpec}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{swaggerSpec?.info.title}</h1>
              <p className="text-blue-100 mt-1">
                {swaggerSpec?.info.description?.split('\n')[0]}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-200">Versión {swaggerSpec?.info.version}</p>
              <button
                type="button"
                onClick={fetchSwaggerSpec}
                className="text-sm bg-blue-500 hover:bg-blue-400 px-3 py-1 rounded mt-1 transition-colors"
              >
                🔄 Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex space-x-6">
            <a href="#endpoints" className="text-blue-600 hover:text-blue-800 font-medium">
              📋 Endpoints
            </a>
            <a href="#schemas" className="text-blue-600 hover:text-blue-800 font-medium">
              📊 Esquemas
            </a>
            <a href="/" className="text-gray-600 hover:text-gray-800">
              🏠 Volver al Dashboard
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Endpoints */}
        <section id="endpoints" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Endpoints de la API</h2>
          
          {swaggerSpec?.paths && Object.entries(swaggerSpec.paths).map(([path, methods]) => (
            <div key={path} className="mb-8 bg-white border rounded-lg shadow-sm">
              <div className="border-b px-6 py-4 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">{path}</h3>
              </div>
              
              {Object.entries(methods as Record<string, any>).map(([method, details]) => (
                <div key={method} className="p-6 border-b last:border-b-0">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className={`
                        px-3 py-1 rounded text-sm font-semibold uppercase
                        ${method === 'get' ? 'bg-green-100 text-green-800' : ''}
                        ${method === 'post' ? 'bg-blue-100 text-blue-800' : ''}
                        ${method === 'put' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${method === 'delete' ? 'bg-red-100 text-red-800' : ''}
                      `}>
                        {method}
                      </span>
                      <h4 className="text-lg font-medium text-gray-900">
                        {details.summary || 'Sin descripción'}
                      </h4>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => testEndpoint(`/api${path}`, method)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      ⚡ Probar
                    </button>
                  </div>
                  
                  {details.description && (
                    <p className="text-gray-600 mb-4">{details.description}</p>
                  )}
                  
                  {/* Request Body */}
                  {details.requestBody && (
                    <div className="mb-4">
                      <h5 className="font-semibold text-gray-900 mb-2">📤 Request Body</h5>
                      <div className="bg-gray-50 p-3 rounded border">
                        <code className="text-sm">
                          {details.requestBody.required ? 'Requerido' : 'Opcional'} - 
                          Content-Type: application/json
                        </code>
                      </div>
                    </div>
                  )}
                  
                  {/* Responses */}
                  {details.responses && (
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">📥 Respuestas</h5>
                      <div className="space-y-2">
                        {Object.entries(details.responses).map(([status, response]: [string, any]) => (
                          <div key={status} className="flex items-center space-x-2">
                            <span className={`
                              px-2 py-1 rounded text-xs font-semibold
                              ${status.startsWith('2') ? 'bg-green-100 text-green-800' : ''}
                              ${status.startsWith('4') ? 'bg-yellow-100 text-yellow-800' : ''}
                              ${status.startsWith('5') ? 'bg-red-100 text-red-800' : ''}
                            `}>
                              {status}
                            </span>
                            <span className="text-sm text-gray-600">
                              {response.description || 'Sin descripción'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </section>

        {/* Schemas */}
        <section id="schemas" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Esquemas de Datos</h2>
          
          {swaggerSpec?.components?.schemas && Object.entries(swaggerSpec.components.schemas).map(([name, schema]) => (
            <div key={name} className="mb-6 bg-white border rounded-lg shadow-sm">
              <div className="border-b px-6 py-4 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
              </div>
              <div className="p-6">
                <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
                  <code>{JSON.stringify(schema, null, 2)}</code>
                </pre>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
