import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { EventsController } from './events.controller';
import { EventsRepository } from './events.repository';
import { EventsService } from './events.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventsRepository]), AuthModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
