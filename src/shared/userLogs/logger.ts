import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize } = format;

// 1. Formato para o Console (legível por humanos)
const consoleLogFormat = printf(({ level, message, timestamp, stack }) => {
    // 💡 Usa 'stack' (para erros) ou 'message' (para logs normais)
    return `${timestamp} [${level}]: ${stack || message}`;
});

// 2. Formato para Produção (JSON para logs estruturados)
const productionLogFormat = combine(
    timestamp(),
    format.errors({ stack: true }), 
    format.splat(),
    format.json() 
);


export const logger = createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  
  format: productionLogFormat, 
  
  transports: [
    new transports.Console({
      
      format: combine(
        colorize(),
        timestamp({ format: 'HH:mm:ss' }),
      ),
    }),
    
  ],
});