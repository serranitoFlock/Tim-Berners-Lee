'use client'

import { useState, useEffect } from 'react'

interface User {
  id?: string
  name: string
  email: string
  created_at?: string
}

interface ApiResponse {
  users?: User[]
  user?: User
  message?: string
  error?: string
  source?: 'mock' | 'supabase'
}

export default function UserManager() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAddingUser, setIsAddingUser] = useState(false)
  const [newUser, setNewUser] = useState({ name: '', email: '' })
  const [dataSource, setDataSource] = useState<'mock' | 'supabase'>('mock')

  // Obtener usuarios al cargar el componente
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/users')
      const data: ApiResponse = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al obtener usuarios')
      }
      
      setUsers(data.users || [])
      setDataSource(data.source || 'mock')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  const addUser = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newUser.name.trim() || !newUser.email.trim()) {
      setError('Nombre y email son requeridos')
      return
    }

    try {
      setIsAddingUser(true)
      setError(null)

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })

      const data: ApiResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al agregar usuario')
      }

      // Actualizar la lista de usuarios
      await fetchUsers()
      
      // Limpiar el formulario
      setNewUser({ name: '', email: '' })
      
      // Mostrar mensaje de éxito (opcional)
      console.log(data.message)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setIsAddingUser(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Gestión de Usuarios</h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Lista de usuarios registrados • Fuente: {dataSource === 'mock' ? 'Datos de prueba' : 'Supabase'}
          </p>
          <button
            type="button"
            onClick={fetchUsers}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Actualizar
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Add user form */}
      <form onSubmit={addUser} className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Agregar Nuevo Usuario</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Nombre completo"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isAddingUser}
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isAddingUser}
          />
        </div>
        <button
          type="submit"
          disabled={isAddingUser}
          className="mt-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          {isAddingUser ? 'Agregando...' : 'Agregar Usuario'}
        </button>
      </form>

      {/* Users list */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-900">
          Usuarios ({users.length})
        </h4>
        
        {users.length === 0 ? (
          <p className="text-sm text-gray-500 py-4">No hay usuarios registrados</p>
        ) : (
          <div className="divide-y divide-gray-200">
            {users.map((user, index) => (
              <div key={user.id || index} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">
                    {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Fecha no disponible'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
