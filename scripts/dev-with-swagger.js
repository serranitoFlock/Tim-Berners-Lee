#!/usr/bin/env node

const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🚀 Iniciando Tim Berners-Lee Dashboard con Swagger...')

// Función para ejecutar comandos
function runCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options
    })

    child.on('close', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`Comando falló con código ${code}`))
      }
    })

    child.on('error', reject)
  })
}

// Función principal
async function start() {
  try {
    // 1. Generar documentación de Swagger
    console.log('📚 Generando documentación de Swagger...')
    await runCommand('npm', ['run', 'generate-swagger'])
    
    // 2. Verificar que los archivos de Swagger estén listos
    const swaggerReady = path.join(__dirname, '../.swagger-ready')
    if (fs.existsSync(swaggerReady)) {
      const status = JSON.parse(fs.readFileSync(swaggerReady, 'utf8'))
      console.log(`✅ Swagger listo (${status.timestamp})`)
    }
    
    // 3. Iniciar el servidor de desarrollo
    console.log('🔥 Iniciando servidor de desarrollo...')
    console.log('📖 Documentación de Swagger estará disponible en: http://localhost:3000/docs')
    console.log('🌐 Aplicación principal: http://localhost:3000')
    console.log('')
    
    // Ejecutar Next.js en modo desarrollo
    const nextProcess = spawn('npx', ['next', 'dev', '--turbopack'], {
      stdio: 'inherit',
      shell: true
    })

    // Manejar cierre del proceso
    process.on('SIGINT', () => {
      console.log('\n🛑 Cerrando servidor...')
      nextProcess.kill('SIGINT')
      process.exit(0)
    })

    process.on('SIGTERM', () => {
      nextProcess.kill('SIGTERM')
      process.exit(0)
    })

  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

start()
