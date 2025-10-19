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
    
    // 🛑 CORREÇÃO VITAL: Adicionar 'trust proxy' para o Render 🛑
    // Isso instrui o Express a confiar nos cabeçalhos do proxy reverso, 
    // reconhecendo a conexão como HTTPS e permitindo o uso do Cookie 'Secure'.
    this.app.set('trust proxy', 1); 
    
    this.app.use(express.json());
    

    this.app.use((req, res, next) => {
      const isProduction = process.env.NODE_ENV === 'production';
      const origin = req.headers.origin;
      
    
      if (isProduction && origin && allowedOrigins.includes(origin)) {
        // Nota: Esta lógica de setHeader('Set-Cookie') é redundante se você usa res.cookie, 
        // mas foi mantida para garantir compatibilidade com o código anterior.
        res.setHeader('Set-Cookie', 'SameSite=None; Secure');
      }
      next();
    });

    this.app.use(cookieParser());
    this.app.use(
      cors({
        origin: (origin, callback) => {

          if (!origin) return callback(null, true); 
          
          if (allowedOrigins.includes(origin)) {
            return callback(null, true);
          }
          
          
          callback(new Error(`Não permitido por CORS: ${origin}`));
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