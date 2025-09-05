import { NextRequest, NextResponse } from 'next/server'
import { supabase, User } from '@/lib/supabase'

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     description: Retorna una lista de todos los usuarios registrados en el sistema. Si Supabase no está configurado, retorna datos de prueba.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsersResponse'
 *             examples:
 *               mock_data:
 *                 summary: Datos de prueba
 *                 value:
 *                   users:
 *                     - id: "1"
 *                       name: "Tim Berners-Lee"
 *                       email: "tim@w3.org"
 *                       created_at: "2024-01-01T00:00:00Z"
 *                     - id: "2"
 *                       name: "Vint Cerf"
 *                       email: "vint@google.com"
 *                       created_at: "2024-01-02T00:00:00Z"
 *                   source: "mock"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
// GET - Obtener todos los usuarios
export async function GET() {
  try {
    // Si no tienes Supabase configurado aún, devuelve datos mockeados
    if (!supabase || !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'your_supabase_url_here') {
      const mockUsers: User[] = [
        { id: '1', name: 'Tim Berners-Lee', email: 'tim@w3.org', created_at: '2024-01-01T00:00:00Z' },
        { id: '2', name: 'Vint Cerf', email: 'vint@google.com', created_at: '2024-01-02T00:00:00Z' },
        { id: '3', name: 'Alan Turing', email: 'alan@enigma.com', created_at: '2024-01-03T00:00:00Z' },
        { id: '4', name: 'Ada Lovelace', email: 'ada@analytical.com', created_at: '2024-01-04T00:00:00Z' }
      ]
      return NextResponse.json({ users: mockUsers, source: 'mock' })
    }

    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ users, source: 'supabase' })
  } catch (error) {
    console.error('Error en GET /api/users:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     description: Agrega un nuevo usuario al sistema. Valida que el nombre y email sean proporcionados y que el email tenga un formato válido.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *           examples:
 *             ejemplo_usuario:
 *               summary: Ejemplo de usuario
 *               value:
 *                 name: "Ada Lovelace"
 *                 email: "ada@analytical.com"
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserResponse'
 *             examples:
 *               usuario_creado:
 *                 summary: Usuario creado con datos de prueba
 *                 value:
 *                   user:
 *                     id: "1735689123456"
 *                     name: "Ada Lovelace"
 *                     email: "ada@analytical.com"
 *                     created_at: "2024-01-01T12:00:00Z"
 *                   message: "Usuario creado exitosamente (mock)"
 *                   source: "mock"
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               campos_requeridos:
 *                 summary: Campos faltantes
 *                 value:
 *                   error: "Nombre y email son requeridos"
 *               email_invalido:
 *                 summary: Email inválido
 *                 value:
 *                   error: "Email inválido"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
// POST - Agregar un nuevo usuario
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Nombre y email son requeridos' }, { status: 400 })
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }

    // Si no tienes Supabase configurado aún, simula la creación
    if (!supabase || !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'your_supabase_url_here') {
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        created_at: new Date().toISOString()
      }
      return NextResponse.json({ user: newUser, message: 'Usuario creado exitosamente (mock)', source: 'mock' })
    }

    const { data: user, error } = await supabase
      .from('users')
      .insert([{ name, email }])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ user, message: 'Usuario creado exitosamente', source: 'supabase' })
  } catch (error) {
    console.error('Error en POST /api/users:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
