import swaggerJSDoc from 'swagger-jsdoc'

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Tim Berners-Lee Dashboard API',
    version: '1.0.0',
    description: `
      API REST para la gestión de usuarios en el dashboard de Tim Berners-Lee.
      
      Esta API permite obtener y crear usuarios, con soporte tanto para datos mockeados
      durante el desarrollo como para integración con Supabase en producción.
      
      **Características:**
      - Gestión completa de usuarios
      - Validación de datos
      - Soporte para Supabase
      - Datos de prueba incluidos
      
      **Creado en honor a Sir Tim Berners-Lee, inventor de la World Wide Web.**
    `,
    contact: {
      name: 'Tim Berners-Lee Dashboard',
      url: 'https://github.com/serranitoFlock/Tim-Berners-Lee'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  servers: [
    {
      url: process.env.NODE_ENV === 'production' 
        ? 'https://your-domain.com' 
        : 'http://localhost:3000',
      description: process.env.NODE_ENV === 'production' 
        ? 'Servidor de Producción' 
        : 'Servidor de Desarrollo'
    }
  ],
  components: {
    schemas: {
      User: {
        type: 'object',
        required: ['name', 'email'],
        properties: {
          id: {
            type: 'string',
            description: 'ID único del usuario (generado automáticamente)',
            example: '1'
          },
          name: {
            type: 'string',
            description: 'Nombre completo del usuario',
            example: 'Tim Berners-Lee',
            minLength: 1,
            maxLength: 100
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Correo electrónico del usuario',
            example: 'tim@w3.org'
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha y hora de creación del usuario',
            example: '2024-01-01T00:00:00Z'
          }
        }
      },
      CreateUserRequest: {
        type: 'object',
        required: ['name', 'email'],
        properties: {
          name: {
            type: 'string',
            description: 'Nombre completo del usuario',
            example: 'Ada Lovelace',
            minLength: 1,
            maxLength: 100
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Correo electrónico del usuario',
            example: 'ada@analytical.com'
          }
        }
      },
      UsersResponse: {
        type: 'object',
        properties: {
          users: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/User'
            },
            description: 'Lista de usuarios'
          },
          source: {
            type: 'string',
            enum: ['mock', 'supabase'],
            description: 'Fuente de los datos (mock para datos de prueba, supabase para base de datos real)',
            example: 'mock'
          }
        }
      },
      CreateUserResponse: {
        type: 'object',
        properties: {
          user: {
            $ref: '#/components/schemas/User'
          },
          message: {
            type: 'string',
            description: 'Mensaje de confirmación',
            example: 'Usuario creado exitosamente'
          },
          source: {
            type: 'string',
            enum: ['mock', 'supabase'],
            description: 'Fuente de los datos',
            example: 'mock'
          }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            description: 'Mensaje de error descriptivo',
            example: 'Nombre y email son requeridos'
          }
        }
      }
    }
  },
  tags: [
    {
      name: 'Users',
      description: 'Operaciones relacionadas con la gestión de usuarios'
    }
  ]
}

const options = {
  definition: swaggerDefinition,
  apis: ['./src/app/api/**/*.ts'], // Rutas a los archivos que contienen las anotaciones de Swagger
}

export const swaggerSpec = swaggerJSDoc(options)

// Función para regenerar la documentación
export function generateSwaggerSpec() {
  return swaggerJSDoc(options)
}
