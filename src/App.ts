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

 
 this.app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_FRONTEND_DOMAIN,
    credentials: true,
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
