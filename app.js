const express = require('express')
const app = express()
const path = require('path')
const port = 3030;

/* CONFIGS */
app.set("view engine", "ejs")
app.set("views",path.join(__dirname,"./views"))

/* MIDDLEWARE */
app.use(express.static('public'))

/* RUTAS */
const authRoutes = require('./routes/authentication.routes')
const cartRoutes = require('./routes/cart.routes')
const otherRoutes = require("./routes/other.routes")
const productRoutes = require("./routes/products.routes")

/* ENRUTADORES */
app.use("/", otherRoutes)
app.use("/autenticacion", authRoutes)
app.use("/carrito-compra", cartRoutes)
app.use("/productos", productRoutes)

app.listen(port,() => console.log(`http://localhost:${port}`))