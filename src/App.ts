import { Application } from "express";
import * as express from "express";
import * as cookieParser from "cookie-parser";
import userRoutes from "./infra/routes/user.routes";
import * as cors from "cors";

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5803",
  "https://uplys.com.br",
  "https://www.uplys.com.br",
  "https://uplys.vercel.app",
];

export class App {
  public app: Application;

  constructor() {
    this.app = express();

    // ⚡️ necessário para cookies secure atrás do proxy (Render/Cloud)
    this.app.set("trust proxy", 1);

    this.app.use(express.json());
    this.app.use(cookieParser());

    // CORS seguro e simplificado
    this.app.use(
      cors({
        origin: (origin, callback) => {
          if (!origin) return callback(null, true); // permite requests sem origin (Postman, SSR)
          if (allowedOrigins.includes(origin)) return callback(null, true);
          callback(new Error(`CORS bloqueado para origem: ${origin}`));
        },
        credentials: true, // envia cookies cross-site
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );

    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.app.get("/", (req, res) => res.send("Hello World!"));
    this.app.use("/api", userRoutes);
  }
}
