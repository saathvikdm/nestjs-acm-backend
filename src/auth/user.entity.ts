import { Column, Entity, PrimaryGeneratedColumn, Generated } from 'typeorm';

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
}
