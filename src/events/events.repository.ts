import { EntityRepository, Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { GetEventFiltersDto } from './dto/get-event-filter.dto';
import { EventStatus } from './event-status.enum';
import { Event } from './event.entity';

@EntityRepository(Event)
export class EventsRepository extends Repository<Event> {
  async getEvents(filterDto: GetEventFiltersDto): Promise<Event[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('event');

    if (status) {
      query.andWhere('event.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(event.title) LIKE LOWER(:search) or LOWER(event.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const events = await query.getMany();
    return events;
  }

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const { title, description } = createEventDto;

    const event = this.create({
      title,
      description,
      status: EventStatus.OPEN,
    });

    return await this.save(event);
  }
}
