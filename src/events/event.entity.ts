import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EventStatus } from './event-status.enum';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: EventStatus;
}
