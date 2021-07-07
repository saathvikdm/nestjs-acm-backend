import { Injectable, NotFoundException } from '@nestjs/common';
import { EventStatus } from './event-status.enum';
import { CreateEventDto } from './dto/create-event.dto';
import { GetEventFiltersDto } from './dto/get-event-filter.dto';
import { EventsRepository } from './events.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventsRepository)
    private eventsRepository: EventsRepository,
  ) {}

  async getEventById(id: string): Promise<Event> {
    const found = await this.eventsRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Event with ID '${id}' not found.`);
    }

    return found;
  }

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    return this.eventsRepository.createEvent(createEventDto);
  }

  async deleteEventById(id: string): Promise<void> {
    const result = await this.eventsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Event with ID '${id}' not found.`);
    }
  }

  async updateEventStatus(id: string, status: EventStatus): Promise<Event> {
    const event = await this.getEventById(id);

    event.status = status;

    await this.eventsRepository.save(event);
    return event;
  }

  async getEvents(filterDto: GetEventFiltersDto): Promise<Event[]> {
    return this.eventsRepository.getEvents(filterDto);
  }
}
