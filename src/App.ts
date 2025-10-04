import { Application } from "express";
import * as express from "express";
import userRoutes from "./infra/routes/user.routes";
import * as cors from "cors";


const allowedOrigins = [
  "http://localhost:3001",
  "https://uplys.vercel.app"
];
export class App {
  public app: Application;

  

  constructor() {
    this.app = express();
    this.app.use(express.json());
   this.app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("Não permitido por CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

    // Configura as rotas
    this.setupRoutes();
  }

  // Método privado para configurar rotas
  private setupRoutes(): void {
    this.app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    this.app.use("/api", userRoutes);
  }
}
