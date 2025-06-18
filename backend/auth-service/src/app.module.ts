import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ItemController } from './item/item.controller'; // Add this
import { ItemService } from './item/item.service';       // Add this

@Module({
  imports: [AuthModule],
  controllers: [AppController, ItemController], // Add ItemController
  providers: [AppService, ItemService],         // Add ItemService
})
export class AppModule {}
