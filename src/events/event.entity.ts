import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { User } from '../users/user.entity.js';
import { Registration } from '../registrations/registration.entity.js';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamptz' })
  startDate: Date;

  @Column({ type: 'timestamptz' })
  endDate: Date;

  @Column()
  location: string;

  @Column({ type: 'int' })
  capacity: number;

  @ManyToOne(() => User, (user) => user.events, {
  onDelete: 'CASCADE',
  nullable: false,
})
  owner: Relation<User>;

  @OneToMany(() => Registration, (reg) => reg.event)
  registrations: Relation<Registration[]>;

  @CreateDateColumn()
  createdAt: Date;
}