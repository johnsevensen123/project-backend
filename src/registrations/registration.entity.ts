import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { User } from '../users/user.entity.js';
import { Event } from '../events/event.entity.js';

@Entity('registrations')
@Unique(['user', 'event'])
export class Registration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

   @ManyToOne(() => User, (user) => user.registrations, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  user: Relation<User>;

  @ManyToOne(() => Event, (event) => event.registrations, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  event: Relation<Event>;
  @CreateDateColumn()
  createdAt: Date;
}
