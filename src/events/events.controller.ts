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
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  getEvents(@Query() filterDto: GetEventFiltersDto): Promise<Event[]> {
    return this.eventsService.getEvents(filterDto);
  }

  @Get(':id')
  getEventById(@Param('id') id: string, @GetUser() user: User): Promise<Event> {
    return this.eventsService.getEventById(id, user);
  }

  @UseGuards(AuthGuard())
  @Post()
  createEvent(
    @Body() createEventDto: CreateEventDto,
    @GetUser() user: User,
  ): Promise<Event> {
    return this.eventsService.createEvent(createEventDto, user);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  deleteEventById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.eventsService.deleteEventById(id, user);
  }

  @UseGuards(AuthGuard())
  @Patch('/:id/status')
  updateEventStatus(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() updateEventStatusDto: UpdateEventStatusDto,
  ): Promise<Event> {
    const { status } = updateEventStatusDto;
    return this.eventsService.updateEventStatus(id, status, user);
  }
}
