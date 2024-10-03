# SantoVecino

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.1.

Se requiere crear una bd en MongoDB para probar la aplicacion de manera local.
Crear archivo .env

PORT:3000
MONGO_URL: url obtenida de Mongo Atlas

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

Run `node app.js` para levantar el servidor express
Run node mongo.js yourPassword para conectarse con la base de datos

## Backend
se instalaron 
npm install dotenv
moogoose
cors
express

### Atajos
A fines de optizacion del tiempos se omite el flujo de pago que requiere la realizacion de una reserva
la autenticacion del usuario para proteger los datos de su reserva
el manejo de errores en BookingService
Desarrollo de estado Empty
