require('dotenv').config({path: './.env'})
const express = require('express');
const app = express();
const cors = require("cors");
const db = require('./db/index.js')

const port = process.env.API_PORT || 8000;

// import usersRoutes from "./routes/user.routes";

const sellerRoutes = require("../src/routes/seller.route.js");
const buyerRoutes = require("../src/routes/buyer.route.js");


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
// app.use(express.static("public"))
// app.use(cookieParser())

app.use("/api/v1", sellerRoutes);
app.use('/api/v1', buyerRoutes);

app.get("/",(req,res)=>{
    res.send("Hello World")
})

db.sequelize
  .sync()
  .then(() => {
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });




