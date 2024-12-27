# Proyecto API para Web Store


## Instalación

1. Clona el repositorio:
    ```sh
    git clone <URL_DEL_REPOSITORIO>
    ```

2. Navega al directorio del proyecto:
    ```sh
    cd webstore-jasz-api

    ```

3. Instala las dependencias:
    ```sh
    npm install
    ```

4. Copia el archivo .env.example  a un nuevo archivo  .env y coloca tus datos locales de conexión:
    ```sh
    cp .env.example .env
    ```

5. Configura tus variables de entorno en el archivo .env :
    ```env
    DB_NAME=tu_nombre_de_base_de_datos
    DB_USER=tu_usuario_de_base_de_datos
    DB_PASSWORD=tu_contraseña_de_base_de_datos
    DB_HOST=tu_host_de_base_de_datos
    DB_DIALECT=tu_dialect_de_base_de_datos
    JWT_SECRET=tu_clave_secreta_jwt
    ```

## Uso

1. Inicia el servidor:
    ```sh
    npm run dev
    ```

2. La API estará disponible en `http://localhost:3000`.

## Endpoints

### Autenticación
- `POST /auth/register`: Registro de usuario
- `POST /auth/login`: Inicio de sesión

### Categorías
- `GET /categorias`: Obtener todas las categorías
- `POST /categorias`: Crear una nueva categoría
- `PUT /categorias/:id`: Actualizar una categoría
- `DELETE /categorias/:id`: Eliminar una categoría

### Roles
- `GET /roles`: Obtener todos los roles
- `POST /roles`: Crear un nuevo rol
- `PUT /roles/:id`: Actualizar un rol
- `DELETE /roles/:id`: Eliminar un rol

### Estados
- `GET /estados`: Obtener todos los estados
- `POST /estados`: Crear un nuevo estado
- `PUT /estados/:id`: Actualizar un estado
- `DELETE /estados/:id`: Eliminar un estado

### Clientes
- `GET /clientes`: Obtener todos los clientes
- `POST /clientes`: Crear un nuevo cliente
- `PUT /clientes/:id`: Actualizar un cliente
- `DELETE /clientes/:id`: Eliminar un cliente

### Usuarios
- `GET /usuarios`: Obtener todos los usuarios
- `POST /usuarios`: Crear un nuevo usuario
- `PUT /usuarios/:id`: Actualizar un usuario
- `DELETE /usuarios/:id`: Eliminar un usuario

### Productos
- `GET /productos`: Obtener todos los productos
- `GET /productos/:id`: Obtener producto por id
- `POST /productos`: Crear un nuevo producto
- `PUT /productos/:id`: Actualizar un producto
- `DELETE /productos/:id`: Eliminar un producto
- `GET /stock`: Obtener todos los productos con stock
- `GET /paginado/:pagina/:cantidad`: Obtener productos por paginado
- `GET /categoria/:id`: Obtener todos los productos por categoria

### Órdenes
- `POST /create`: Crear una nueva orden
- `POST /list/user"`: Para obtener las lisrta de ordenes del usuario


