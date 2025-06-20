import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle } from './vehicle.model';
import { UpdateVehicleInput } from './dto/update-vehicle.input';
import { CreateVehicleInput } from './dto/create-vehicle.input';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<Vehicle>,
  ) {}

  // CREATE
  async create(vehicle: Vehicle): Promise<Vehicle> {
    const newVehicle = new this.vehicleModel(vehicle);
    return newVehicle.save();
  }

  // READ (ALL)
  async findAll(): Promise<Vehicle[]> {
    return this.vehicleModel.find().exec();
  }

  // READ (ONE)
  async findOne(id: string): Promise<Vehicle | null> {
    return this.vehicleModel.findById(id).exec();
  }

  // UPDATE
  async update(id: string, input: UpdateVehicleInput): Promise<Vehicle | null> {
    return this.vehicleModel
      .findByIdAndUpdate(id, input, { new: true })
      .exec();
  }

  // DELETE
  async delete(id: string): Promise<Vehicle | null> {
    return this.vehicleModel.findByIdAndDelete(id).exec();
  }
}