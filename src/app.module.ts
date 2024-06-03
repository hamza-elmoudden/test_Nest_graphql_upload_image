import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ProducteModule } from './producte/producte.module';



@Module({
  imports: [
    GraphQLModule.forRoot({

      autoSchemaFile:'schema.gql',
      driver: ApolloDriver,

    }),
    ProducteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule{}

// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//     .apply(bodyParser.json({ limit: '800kb' })) 
//     .forRoutes({ path: '*', method: RequestMethod.POST }); 
//   }
  
// }
