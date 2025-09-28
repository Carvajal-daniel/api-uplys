import 'dotenv/config';
import {App} from './App';
import { logger } from './shared/userLogs/logger';

const PORT = process.env.PORT || 5800;
const server = new App();

server.app.listen(PORT, () => {
  logger.info(` 🚀 Server running http://localhost:${PORT}`);
  console.log(` 🚀 Server running http://localhost:${PORT}`);
})
