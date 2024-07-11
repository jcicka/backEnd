const express = require("express");
const rutas = require("./routes/auth");
//const authRoutes = require(`./routes/authRoutes`);
const path = require('path')

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, './public')));

app.use("/auth", rutas);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server en puerto ${PORT}`);
});
