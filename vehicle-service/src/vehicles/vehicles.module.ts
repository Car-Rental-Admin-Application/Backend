import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicle, VehicleSchema } from './vehicle.model';
import { VehiclesService } from './vehicles.service';
import { VehicleResolver } from './vehicles.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vehicle.name, schema: VehicleSchema }]),
  ],
  providers: [VehiclesService, VehicleResolver],
})
export class VehiclesModule {}