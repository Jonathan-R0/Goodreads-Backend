# Start a basic postgres container

1. Pull the postgres image with the following command:

```bash
docker pull postgres
```

2. Start a postgres container with the following command:

```bash
docker run --name goodreadsdb -p 5432:5432 -e POSTGRES_PASSWORD=password123 -d postgres
```

3. After that log into the container and create a database:

```bash
docker exec -it goodreadsdb bash
psql -h localhost -U postgres
CREATE DATABASE goodreadsdb;
```

4. And after that, you can connect to the database with the following command:

```bash
\c goodreadsdb;
```

5. To create and execute the migration run the following command:

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

6. To use the drizzle dashboard kit run the following command:

```bash
npx drizzle-kit studio
```
