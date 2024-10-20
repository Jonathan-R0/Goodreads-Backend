import type { Config } from 'drizzle-kit';

export default {
	schema: './src/*/*.entity.ts',
	out: './migrations',
	dialect: 'postgresql',
	dbCredentials: {
		user: 'postgres',
		host: 'localhost',
		database: 'goodreadsdb',
		password: 'password123',
		port: 5432,
		ssl: false,
	},
	verbose: true,
	strict: true,
} satisfies Config;
