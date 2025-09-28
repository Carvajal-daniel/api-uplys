import { Application } from "express";
import * as express from "express";
import userRoutes from "./infra/routes/user.routes";
import * as cors from "cors";

export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: "http://localhost:3001",
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
