import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as express from 'express';

// Cosmetic change 1

async function bootstrap() {
  // Create an HTTP server for health checks
  const healthCheckServer = express();
  healthCheckServer.get('/', (_, res) => {
    console.log("Received a request on '/'");
    
    res.status(200).send('OK');
  });
  healthCheckServer.listen(3000);

  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      port: 3001
    }
  });

  await microservice.listen(() => {
    const port = microservice.get('MicroserviceOptions').options.port;
    console.log(`Microservice is listening on port ${port}`);
  });
  // console.log("Logging app after await app.listen();", app)
}
bootstrap();
