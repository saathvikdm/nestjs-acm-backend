import { Event } from 'src/events/event.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Generated,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @Generated()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  googleId: string;

  @Column()
  picture: string;

  @OneToMany((_type) => Event, (event) => event.user, { eager: true })
  events: Event[];
}
