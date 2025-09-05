import { NextResponse } from 'next/server'
import { generateSwaggerSpec } from '@/lib/swagger'

/**
 * @swagger
 * /api/swagger:
 *   get:
 *     summary: Obtiene la especificación OpenAPI/Swagger
 *     description: Retorna la documentación completa de la API en formato JSON OpenAPI 3.0
 *     tags: [Documentation]
 *     responses:
 *       200:
 *         description: Especificación OpenAPI exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
export async function GET() {
  try {
    const spec = generateSwaggerSpec()
    return NextResponse.json(spec)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error generando la documentación de Swagger' },
      { status: 500 }
    )
  }
}
