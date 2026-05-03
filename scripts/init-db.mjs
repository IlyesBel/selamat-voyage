import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    whatsapp VARCHAR(30) NOT NULL,
    email VARCHAR(255),
    answers JSONB,
    created_at TIMESTAMP DEFAULT NOW()
  )
`;

console.log('✅ Table "leads" créée avec succès.');
