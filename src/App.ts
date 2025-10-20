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

    // 🟩 1. Render precisa disso para que 'secure cookies' funcionem
    this.app.set("trust proxy", 1);

    this.app.use(express.json());
    this.app.use(cookieParser());

    // 🟩 2. Configuração de CORS correta e simplificada
    this.app.use(
      cors({
        origin: (origin, callback) => {
          if (!origin) return callback(null, true);
          if (allowedOrigins.includes(origin)) {
            return callback(null, true);
          }
          callback(new Error(`CORS bloqueado para origem: ${origin}`));
        },
        credentials: true, // ⚠️ necessário para enviar cookies entre domínios
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );

    // 🟩 3. Middleware opcional — mas sem mexer no header Set-Cookie diretamente!
    // O 'Set-Cookie' é definido pelo res.cookie() no controller,
    // aqui não precisa (e pode até sobrescrever indevidamente).
    // Portanto, REMOVA o middleware abaixo do seu código anterior:
    // this.app.use((req, res, next) => {...})

    // 🟩 4. Rotas
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    this.app.use("/api", userRoutes);
  }
}
