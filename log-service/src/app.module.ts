import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogsService } from './logs/logs.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, LogsService],
})
export class AppModule {}
