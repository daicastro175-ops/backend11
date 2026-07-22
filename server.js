import express from "express";
import { engine } from "express-handlebars";
import { connectDB } from "./src/config/database.js";
import { envs } from "./src/config/envs.js";
import productRouter from "./src/routes/product.routes.js";
import categoryRouter from "./src/routes/category.routes.js";
import sellerRouter from "./src/routes/seller.routes.js";
import viewsRouter from "./src/routes/views.routes.js";
import cartRouter from "./src/routes/cart.routes.js";

const app = express();


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


// Handlebars
app.engine("handlebars", engine({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");
app.set("views", "./src/views");


// Rutas
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/sellers", sellerRouter);
app.use("/", viewsRouter);


connectDB();

app.listen(envs.port, () => {
    console.log(`Servidor escuchando en el puerto ${envs.port}`);
});