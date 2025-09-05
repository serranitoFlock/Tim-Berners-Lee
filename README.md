# Tim Berners-Lee Dashboard

Una aplicación web moderna desarrollada en Next.js que honra al creador de la World Wide Web. Esta aplicación incluye una API REST para gestión de usuarios, un chat interactivo estilo ChatGPT y gráficos con datos informativos.

## 🚀 Características

### API REST
- **GET /api/users** - Obtener todos los usuarios
- **POST /api/users** - Agregar un nuevo usuario
- Soporte para Supabase (configurable)
- Datos mockeados para desarrollo

### Frontend Interactivo
- **Chat Interface** - Asistente virtual con respuestas automáticas
- **Gráficos Dinámicos** - Visualización de datos sobre la historia de la web
- **Gestión de Usuarios** - Interfaz para agregar y visualizar usuarios
- **Diseño Responsive** - Funciona en dispositivos móviles y desktop

## 🛠️ Tecnologías

- **Next.js 15** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **Recharts** - Gráficos y visualizaciones
- **Supabase** - Base de datos (opcional)
- **Lucide React** - Iconos

## 📦 Instalación

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno (Opcional)**
   
   El archivo `.env.local` ya está creado con valores de ejemplo:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```
   
   **Reemplaza estos valores con tus credenciales reales de Supabase.**
   
   **Nota:** Si no configuras Supabase, la aplicación funcionará con datos mockeados.

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```
   
   Este comando:
   - Genera automáticamente la documentación de Swagger
   - Inicia el servidor de desarrollo
   - Hace la documentación disponible en `/docs`

4. **Abrir en el navegador**
   ```
   http://localhost:3000          # Aplicación principal
   http://localhost:3000/docs     # Documentación de la API (Swagger)
   ```

## 📚 Documentación de la API (Swagger)

La aplicación incluye **documentación automática de Swagger** que se actualiza cada vez que ejecutas o compilas la aplicación.

### 🚀 Características de Swagger

- **📋 Documentación completa** - Todos los endpoints están documentados
- **🔄 Auto-actualización** - Se regenera automáticamente en cada inicio
- **⚡ Interfaz interactiva** - Puedes probar los endpoints directamente
- **📊 Esquemas de datos** - Modelos y tipos claramente definidos
- **🎯 Ejemplos incluidos** - Requests y responses de ejemplo

### 🔗 Enlaces importantes

- **Documentación Swagger**: http://localhost:3000/docs
- **Especificación OpenAPI**: http://localhost:3000/api/swagger
- **Badge flotante**: Visible en la esquina inferior derecha de la app

### 📝 Comandos disponibles

```bash
npm run dev              # Inicia con Swagger auto-generado
npm run dev:simple       # Inicia sin auto-generación de Swagger
npm run generate-swagger # Solo genera la documentación
npm run docs            # Genera Swagger y inicia servidor simple
```

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
