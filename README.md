# SantoVecino

Proyecto creado con [Angular CLI](https://github.com/angular/angular-cli) version 18.2.1.
Implementación de estilos CSS de [TailwindCSS](https://tailwindcss.com/)
Para la visualizacion de reservas se requiere crear una base de datos en MongoDB Atlas.

## Development server

Correr `ng serve` en la raiz del proyecto para levantar el servidor de Angular. Navegar a `http://localhost:4200/` para visualizar la aplicación.

Correr `node app.js` para levantar el servidor express(backend), el cual contiene la API con la que
interactua la aplicación de Angular

## Backend

`npm install dotenv`
`npm install moogoose`
`npm install cors`
`npm install express`

Dependencias instaladas en el backend para realizar la configuracion con la base de datos BookingApp
y la conexion con la aplicación Angular

Crear archivo .env para alojar la url otorgada por Mongo para la conexion a la base de datos,
junto con la password establecida para dicha base(no es la de login).

PORT:3000
MONGO_URL: url obtenida de Mongo Atlas

### Atajos
A fines de optización de tiempos se omite:
- Flujo de pago que requiere la realización de una reserva
- Autenticación del usuario para proteger los datos de su reserva
- Manejo de errores en BookingService
- Desarrollo de estado Empty
- Modales de feedback en operaciones como update y delete. En su lugar se encuentra loggeado
un mensaje de success/ error en la consola
- Test unitarios. En su lugar se testeo a traves de Postman
- Diseño en versión desktop.  
