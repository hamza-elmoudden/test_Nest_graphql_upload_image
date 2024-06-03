import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'body-parser';
import * as graphqlUplodExpress from "graphql-upload/graphqlUploadExpress.js"


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(json({ limit: '100mb' }));

  app.use(urlencoded({ extended: true, limit: '100mb' }));

  app.use(
    "/graphql",
    graphqlUplodExpress({maxFileSize:"100kb",maxFiles:10})
    )
  await app.listen(3000);
}
bootstrap();


