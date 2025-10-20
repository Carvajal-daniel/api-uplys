import { Application } from "express";
import * as express from "express";
import * as cookieParser from "cookie-parser";
import userRoutes from "./infra/routes/user.routes";
import * as cors from "cors";

export class App {
  public app: Application;

  constructor() {
    this.app = express();

    // ⚡️ Essencial para cookies secure atrás do proxy (Render/Cloud)
    this.app.set("trust proxy", 1);

    this.app.use(express.json());
    this.app.use(cookieParser());

    // CORS seguro e flexível
    this.app.use(
      cors({
        origin: (origin, callback) => {
          const isDev = process.env.NODE_ENV !== "production";

          if (!origin) return callback(null, true); // Postman, SSR, etc.

          // Permite qualquer localhost no dev
          if (isDev && /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) {
            return callback(null, true);
          }

          const allowedOrigins = [
            process.env.NEXT_PUBLIC_FRONTEND_DOMAIN,
            `https://www.${process.env.NEXT_PUBLIC_FRONTEND_DOMAIN}`,
            "https://uplys.vercel.app",
          ];

          if (allowedOrigins.includes(origin)) return callback(null, true);

          return callback(new Error(`CORS bloqueado para origem: ${origin}`));
        },
        credentials: true, // ⚠️ envia cookies cross-site
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
