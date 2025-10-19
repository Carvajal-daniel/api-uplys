import { Application } from "express";
import * as express from "express";
import * as cookieParser from "cookie-parser";
import userRoutes from "./infra/routes/user.routes";
import * as cors from "cors";

const allowedOrigins = [
  "http://localhost:3000", 
  "http://localhost:3001", 
  "http://localhost:5803", 
  "https://www.uplys.com.br"
];

export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    
    // ⭐️ Adicionamos um middleware para verificar e forçar o SameSite=None e Secure=true em produção ⭐️
    this.app.use((req, res, next) => {
      const isProduction = process.env.NODE_ENV === 'production';
      const origin = req.headers.origin;
      
      // Se for produção e a origem for permitida, forçamos HTTPS para cookies
      if (isProduction && origin && allowedOrigins.includes(origin)) {
        res.setHeader('Set-Cookie', 'SameSite=None; Secure');
      }
      next();
    });

    this.app.use(cookieParser());
    this.app.use(
      cors({
        origin: (origin, callback) => {
          // Permite requisições sem origem (como Postman ou requisições do mesmo servidor)
          if (!origin) return callback(null, true); 
          
          // Verifica se a origem está na lista
          if (allowedOrigins.includes(origin)) {
            return callback(null, true);
          }
          
          // Se não estiver permitido
          callback(new Error(`Não permitido por CORS: ${origin}`));
        },
        // ⭐️ ESSENCIAL para enviar e receber cookies em requisições cross-site ⭐️
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