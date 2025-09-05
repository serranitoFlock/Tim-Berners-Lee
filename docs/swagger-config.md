# Configuración de Swagger

Este archivo contiene la configuración automática de Swagger para la API.

## Auto-generación

Swagger se regenera automáticamente en los siguientes casos:

1. **Durante el desarrollo**: `npm run dev`
2. **Durante el build**: `npm run build`
3. **Manualmente**: `npm run generate-swagger`

## Archivos generados

- `.swagger-ready`: Indica que Swagger está listo
- `docs/build-info.json`: Información del build actual
- Documentación en `/docs` y `/api/swagger`

## Endpoints documentados

### GET /api/users
- Obtiene todos los usuarios
- Respuesta con datos mock o Supabase
- Incluye metadatos de origen

### POST /api/users
- Crea un nuevo usuario
- Validación de email y campos requeridos
- Soporte para mock y Supabase

### GET /api/swagger
- Retorna la especificación OpenAPI completa
- Formato JSON estándar
- Auto-generado con cada inicio

## Personalización

Para modificar la documentación, edita:
- `src/lib/swagger.ts` - Configuración principal
- `src/app/api/*/route.ts` - Anotaciones JSDoc específicas
- `src/app/docs/page.tsx` - Interfaz de usuario

## Producción

En producción, la documentación se pre-genera durante el build para mejor rendimiento.

Último build: 2025-09-05T20:55:16.733Z
