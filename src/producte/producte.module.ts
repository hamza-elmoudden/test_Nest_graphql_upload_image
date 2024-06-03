import { Module } from '@nestjs/common';
import { ProducteResolver } from './producte.resolver';
import { ProducteService } from './producte.service';

@Module({
    providers:[ProducteResolver, ProducteService,]
})
export class ProducteModule {}
