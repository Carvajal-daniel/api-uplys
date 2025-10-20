import { Application } from "express";
import * as express from "express";
import * as cookieParser from "cookie-parser";
import userRoutes from "./infra/routes/user.routes";
import * as cors from "cors";

const allowedOrigins = [
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

    // CORS seguro e flexível
    this.app.use(
      cors({
        origin: (origin, callback) => {
          const isDev = process.env.NODE_ENV !== "production";

          if (!origin) return callback(null, true); // Postman, SSR, etc.

          if (isDev) {
            // Permite qualquer localhost com qualquer porta
            if (/^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) return callback(null, true);
          }

          if (allowedOrigins.includes(origin)) return callback(null, true);

          return callback(new Error(`CORS bloqueado para origem: ${origin}`));
        },
        credentials: true, // ⚠️ permite enviar cookies cross-site
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
