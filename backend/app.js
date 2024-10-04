const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URL)
  .then((result) => {
    console.log("conexion exitosa");
  })
  .catch((error) => {
    console.log("error al conectar con mongodb", error);
  });

const Booking = require("./models/booking");

// Endpoints
//GET obtener el listado de reservas
app.get("/booking", (req, res) => {
  Booking.find({}).then((bookings) => {
    res.json(bookings);
  });
});

//POST crear una nueva reserva
app.post("/booking", (request, response) => {
  const body = request.body;

  if (body === undefined) {
    return response.status(400).json({ error: "falta contenido" });
  }

  const newBooking = new Booking({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email || null,
    checkIn: body.checkIn,
    checkOut: body.checkOut,
  });

  newBooking
    .save()
    .then((savedBooking) => {
      response
        .status(201)
        .json({
          status: "success",
          message: "Booking exitoso",
          bookingId: savedBooking._id,
        })
        .end();
    })
    .catch((error) => {
      console.log(error);
      response.status(400).json({
        status: "error",
        message: "Datos invalidos",
        error: "Faltan campos requeridos",
      });
    });
});

//GET obtener detalle de reserva
app.get('/booking-details/:id', (request, response, next) => {
    Booking.findById(request.params.id)
      .then(bookingDetail => {
        if (bookingDetail) {
          response.json(bookingDetail)
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
  })

  //DELETE eliminar reservas
  app.delete('/booking-details/:id', (request, response) => {
    Booking.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(200)
      .json(
        {
          status: "success",
          message: "Reserva eliminada",
          error: "",
        }
      )
      .end()
    })
    .catch(error => next(error))
  })

  //PUT actualiza datos de una reserva
  app.put('/booking-details/:id', (request, response, next) => {
    const body = request.body
    const booking = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email || null,
      checkIn: body.checkIn,
      checkOut: body.checkOut,
    };

    Booking.findByIdAndUpdate(request.params.id, booking, { new: true })
      .then(updateBooking => {
        response.status(200)
      .json(
        {
          status: "success",
          message: "Reserva actualizada",
          bookingId: updateBooking._id,
        }
      )
      .end()
      })
      .catch(error => next(error))
  })

  //POST chequear disponibilidad
  app.post('/booking-check', async (request, response)=>{
    const {checkIn, checkOut} = request.body
    const availability = await Booking.find({
      checkIn: {$gte: checkOut}, // evalua la fecha de checkIn existente en la bd, con la fecha de salida que se quiere agregar
      checkOut: {$lte: checkIn} // evalua si el checkout existente es mas chico que checkin que ingresa
    });

    if(availability.length != 0) {
      return response.status(200)
      .json(
        {
          status: "not availability",
          message: "The room is not available on that date",
        }
      )
      .end()
    } else{
      return response.status(200)
     .json({ status: "availability", message: 'The room is available on that date' }).end();
    }
     
  })

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
