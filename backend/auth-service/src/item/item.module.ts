import { Module } from '@nestjs/common';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  imports: [],
  controllers: [AppController, ItemController],
  providers: [AppService, ItemService],
})
export class AppModule {}