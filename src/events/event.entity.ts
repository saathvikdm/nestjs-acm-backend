import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne((_type) => User, (user) => user.events, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
