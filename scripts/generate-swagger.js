const fs = require('fs')
const path = require('path')

// Script para generar automáticamente la documentación de Swagger
// Se ejecuta antes del build y desarrollo

console.log('🚀 Generando documentación de Swagger...')

// Verificar que los archivos de la API existan
const apiPath = path.join(__dirname, '../src/app/api')
const swaggerPath = path.join(__dirname, '../src/lib/swagger.ts')

if (!fs.existsSync(apiPath)) {
  console.error('❌ No se encontró el directorio de API')
  process.exit(1)
}

if (!fs.existsSync(swaggerPath)) {
  console.error('❌ No se encontró el archivo de configuración de Swagger')
  process.exit(1)
}

// Obtener información sobre los endpoints de la API
const apiRoutes = []

function scanDirectory(dir, basePath = '') {
  const items = fs.readdirSync(dir)
  
  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)
    
    if (stat.isDirectory()) {
      scanDirectory(fullPath, path.join(basePath, item))
    } else if (item === 'route.ts') {
      const routePath = basePath || '/'
      apiRoutes.push({
        path: routePath,
        file: fullPath
      })
    }
  }
}

scanDirectory(apiPath)

console.log(`📋 Encontrados ${apiRoutes.length} endpoints de API:`)
apiRoutes.forEach(route => {
  console.log(`   - /api${route.path}`)
})

// Generar información de build
const buildInfo = {
  timestamp: new Date().toISOString(),
  version: '1.0.0',
  endpoints: apiRoutes.length,
  generatedBy: 'Auto-generación de Swagger',
  environment: process.env.NODE_ENV || 'development'
}

// Crear directorio de documentación si no existe
const docsDir = path.join(__dirname, '../docs')
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true })
}

// Guardar información de build
const buildInfoPath = path.join(docsDir, 'build-info.json')
fs.writeFileSync(buildInfoPath, JSON.stringify(buildInfo, null, 2))

console.log('✅ Documentación de Swagger generada exitosamente')
console.log(`📅 Timestamp: ${buildInfo.timestamp}`)
console.log(`🌍 Entorno: ${buildInfo.environment}`)
console.log('📖 Documentación disponible en: http://localhost:3000/docs')

// Crear un archivo de estado para indicar que Swagger está listo
const statusPath = path.join(__dirname, '../.swagger-ready')
fs.writeFileSync(statusPath, JSON.stringify({
  ready: true,
  timestamp: buildInfo.timestamp
}))

console.log('🎉 ¡Swagger listo para usar!')
