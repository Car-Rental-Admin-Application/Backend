import { Controller, Get, Post, Body } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './vehicle.model';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  async getAll(): Promise<Vehicle[]> {
    return this.vehiclesService.findAll();
  }

  @Post()
  async create(@Body() vehicle: Vehicle): Promise<Vehicle> {
    return this.vehiclesService.create(vehicle);
  }
}