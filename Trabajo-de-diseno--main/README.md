# Trabajo de diseño de sistemas de internet

**Estudiantes**:
-Francelia Michell Lopez Alonzo
-Anthony Alexander Aguilar Parrales
-Yessbelin Valezka Alvarado 

## Descripción
Proyecto de práctica que expone un API REST simple para gestionar usuarios (CRUD). El servicio usa almacenamiento en memoria para facilitar pruebas rápidas y documentación con Swagger.

## Endpoints principales
- POST /users — crear un usuario
- GET /users — listar usuarios
- GET /users/:id — obtener usuario por id
- PUT /users/:id — actualizar usuario
- DELETE /users/:id — eliminar usuario
- Swagger UI: `/api` (ver `src/main.ts`)

Modelos (DTO)
- CreateUserDto
  - `username` (string) — nombre único de usuario
  - `password` (string) — contraseña
  - `name` (string, opcional) — nombre para mostrar
- UpdateUserDto: mismas propiedades opcionales

Archivos relevantes
- Controlador: [src/user/user.controller.ts](src/user/user.controller.ts#L1-L200)
- Servicio: [src/user/user.service.ts](src/user/user.service.ts#L1-L200)
- DTOs: [src/user/dto/create-user.dto.ts](src/user/dto/create-user.dto.ts#L1-L200)
- Swagger setup: [src/main.ts](src/main.ts#L1-L200)

## Cómo ejecutar (local)
1. Instalar dependencias:

```bash
npm install
```

2. Iniciar en modo desarrollo:

```bash
npm run start:dev
```

3. Abrir Swagger UI en: `http://localhost:3000/api`

## Ejemplos de uso (curl)
- Crear usuario

```bash
curl -X POST "http://localhost:3000/users" \
  -H "Content-Type: application/json" \
  -d '{"username":"juan","password":"P@ss123","name":"Juan Perez"}'
```

- Listar usuarios

```bash
curl http://localhost:3000/users
```

- Obtener usuario

```bash
curl http://localhost:3000/users/<id>
```

- Actualizar usuario

```bash
curl -X PUT "http://localhost:3000/users/<id>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Nuevo Nombre"}'
```

- Eliminar usuario

```bash
curl -X DELETE http://localhost:3000/users/<id>
```

## Notas
- Actualmente los usuarios se almacenan en memoria (no persistente). Si quieres persistencia, puedo corregir y configurar Prisma y la base de datos SQLite que aparece en `prisma/Schema.prisma`.
- Para que Swagger muestre esquemas más detallados, ya se añadieron DTOs con `@ApiProperty()`.

---
Archivo creado para la entrega: "Trabajo de diseño de sistemas de internet"
