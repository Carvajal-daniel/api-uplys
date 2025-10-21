import { Application } from "express";
import * as express from "express";
import * as cookieParser from "cookie-parser";
import userRoutes from "./infra/routes/user.routes";
import * as cors from "cors";

export class App {
  public app: Application;

  constructor() {
    this.app = express();

  
    this.app.set("trust proxy", 1);

    this.app.use(express.json());
    this.app.use(cookieParser());

 const allowedOrigins = ["https://uplys.com.br", "https://www.uplys.com.br", "localhost:5800"];
this.app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Postman ou SSR
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS bloqueado para origem: ${origin}`));
    },
    credentials: true,
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type","Authorization"],
  })
);


    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.app.get("/", (req, res) => res.send("Hello World!"));
    this.app.use("/api", userRoutes);
  }
}
