import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class VehicleResolver {
  @Query(() => String)
  hello() {
    return 'Vehicle Service is working!';
  }
}