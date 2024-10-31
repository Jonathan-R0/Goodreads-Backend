import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle('Goodreads Documentation')
		.setDescription('Endpoints for all Goodreads operations')
		.setVersion('1.0')
		.build();

	app.enableCors({
		origin: ['http://localhost:3001', 'http://localhost:3000'],
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
	});

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(8000);
}
bootstrap();
