import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Event } from '../events/event.entity.js';
import { Registration } from '../registrations/registration.entity.js';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany(() => Event, (event) => event.owner)
  events: Relation<Event[]>;

  @OneToMany(() => Registration, (reg) => reg.user)
  registrations: Relation<Registration[]>;
}
