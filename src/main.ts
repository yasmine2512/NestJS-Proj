import { NestFactory ,HttpAdapterHost} from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import { allExceptionFilter } from './allException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    bufferLogs: true,
  }
  );
  const {httpAdapter} = app.get(HttpAdapterHost);
  app.useGlobalFilters(new allExceptionFilter(httpAdapter));
  app.useLogger(app.get(LoggerService));   //logger
  app.enableCors() //acces to everyone
  app.setGlobalPrefix('api');    // localost:3000/api/
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
