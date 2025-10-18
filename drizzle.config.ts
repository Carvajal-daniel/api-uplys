import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle', // pasta onde as migrations vão ser geradas
  schema: './src/infra/db/schema', // 👈 aponta para a PASTA schema
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});