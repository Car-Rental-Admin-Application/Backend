import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { VehicleResolver } from './vehicles/vehicles.resolver'; // Add this
import { VehiclesService } from './vehicles/vehicles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [
    // 1. MongoDB Setup (replace 'mongodb://localhost/vehicle_db' with your actual URL)
    MongooseModule.forRoot('mongodb://localhost:27017/vehicle_db'),

    // 2. GraphQL Setup
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true, // Generates schema.gql automatically
      playground: true,     // Enables GraphQL playground at /graphql
    }),

    // 3. Feature Module
    VehiclesModule,
  ],
})
export class AppModule {}