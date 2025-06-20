import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Vehicle } from './vehicle.model';
import { VehiclesService } from './vehicles.service';
import { UpdateVehicleInput } from './dto/update-vehicle.input';
import { CreateVehicleInput } from './dto/create-vehicle.input';

@Resolver(() => Vehicle)
export class VehicleResolver {
  constructor(private readonly vehiclesService: VehiclesService) {}

  // QUERIES
  @Query(() => [Vehicle])
  async vehicles(): Promise<Vehicle[]> {
    return this.vehiclesService.findAll();
  }

  @Query(() => Vehicle)
  async vehicle(@Args('id', { type: () => ID }) id: string): Promise<Vehicle> {
    const vehicle = await this.vehiclesService.findOne(id);
    if (!vehicle) {
      throw new Error(`Vehicle with id ${id} not found`);
    }
    return vehicle;
  }

  // MUTATIONS
  @Mutation(() => Vehicle)
  async addVehicle(@Args('input') input: CreateVehicleInput): Promise<Vehicle> {
    return this.vehiclesService.create(input);
  }

  @Mutation(() => Vehicle)
  async updateVehicle(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateVehicleInput,
  ): Promise<Vehicle> {
    const updatedVehicle = await this.vehiclesService.update(id, input);
    if (!updatedVehicle) {
      throw new Error(`Vehicle with id ${id} not found`);
    }
    return updatedVehicle;
  }

  @Mutation(() => Vehicle)
  async deleteVehicle(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Vehicle> {
    const deletedVehicle = await this.vehiclesService.delete(id);
    if (!deletedVehicle) {
      throw new Error(`Vehicle with id ${id} not found`);
    }
    return deletedVehicle;
  }
}