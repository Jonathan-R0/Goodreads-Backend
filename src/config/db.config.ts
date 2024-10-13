import { drizzle } from 'drizzle-orm/node-postgres';

import { Client } from 'pg';

const client = new Client({
	user: 'postgres',
	host: 'localhost',
	database: 'goodreadsdb',
	password: 'password123',
	port: 5432,
});

if (process.env.NODE_ENV !== 'test') {
	client.connect();
}

const db = drizzle(client);

export default db;
