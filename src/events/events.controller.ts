import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { GetEventFiltersDto } from './dto/get-event-filter.dto';
import { UpdateEventStatusDto } from './dto/update-event-status.dto';
import { Event } from './event.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedGuard } from 'src/auth/guards';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get(':id')
  getEventById(@Param('id') id: string): Promise<Event> {
    return this.eventsService.getEventById(id);
  }

  @UseGuards(AuthGuard())
  @Post()
  createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventsService.createEvent(createEventDto);
  }

  @Delete(':id')
  deleteEventById(@Param('id') id: string): Promise<void> {
    return this.eventsService.deleteEventById(id);
  }

  @Patch('/:id/status')
  updateEventStatus(
    @Param('id') id: string,
    @Body() updateEventStatusDto: UpdateEventStatusDto,
  ): Promise<Event> {
    const { status } = updateEventStatusDto;
    return this.eventsService.updateEventStatus(id, status);
  }

  @Get()
  @UseGuards(AuthenticatedGuard)
  getEvents(@Query() filterDto: GetEventFiltersDto): Promise<Event[]> {
    return this.eventsService.getEvents(filterDto);
  }
}
