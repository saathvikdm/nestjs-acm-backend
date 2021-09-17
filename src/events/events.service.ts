import { Injectable, NotFoundException } from '@nestjs/common';
import { EventStatus } from './event-status.enum';
import { CreateEventDto } from './dto/create-event.dto';
import { GetEventFiltersDto } from './dto/get-event-filter.dto';
import { EventsRepository } from './events.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventsRepository)
    private eventsRepository: EventsRepository,
  ) {}

  async getEventById(id: string, user: User): Promise<Event> {
    const found = await this.eventsRepository.findOne({ id, user });

    if (!found) {
      throw new NotFoundException(`Event with ID '${id}' not found.`);
    }

    return found;
  }

  async createEvent(
    createEventDto: CreateEventDto,
    user: User,
  ): Promise<Event> {
    return this.eventsRepository.createEvent(createEventDto, user);
  }

  async deleteEventById(id: string, user: User): Promise<void> {
    const result = await this.eventsRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Event with ID '${id}' not found.`);
    }
  }

  async updateEventStatus(
    id: string,
    status: EventStatus,
    user: User,
  ): Promise<Event> {
    const event = await this.getEventById(id, user);

    event.status = status;

    await this.eventsRepository.save(event);
    return event;
  }

  async getEvents(filterDto: GetEventFiltersDto): Promise<Event[]> {
    return this.eventsRepository.getEvents(filterDto);
  }
}
