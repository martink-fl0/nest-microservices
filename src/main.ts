import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
    transport: Transport.TCP,
    options: {
      port: 3001
    }
  });
  console.log("Next line: await app.listen();")
  await app.listen();
  console.log("Logging app after await app.listen();", app)
}
bootstrap();
