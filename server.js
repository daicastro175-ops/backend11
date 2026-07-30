import express from "express";
import { engine } from "express-handlebars";
import { connectDB } from "./src/config/database.js";
import { envs } from "./src/config/envs.js";
import productRouter from "./src/routes/product.routes.js";
import categoryRouter from "./src/routes/category.routes.js";
import sellerRouter from "./src/routes/seller.routes.js";
import viewsRouter from "./src/routes/views.routes.js";
import cartRouter from "./src/routes/cart.routes.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { initSocket } from "./src/utils/socket.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer);

initSocket(io);

io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


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

httpServer.listen(envs.port, () => {
    console.log(`Servidor escuchando en el puerto ${envs.port}`);
});