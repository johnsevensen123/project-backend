var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from 'typeorm';
import { User } from '../users/user.entity.js';
import { Registration } from '../registrations/registration.entity.js';
let Event = class Event {
    id;
    title;
    description;
    startDate;
    endDate;
    location;
    capacity;
    owner;
    registrations;
    createdAt;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Event.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Event.prototype, "title", void 0);
__decorate([
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "description", void 0);
__decorate([
    Column({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Event.prototype, "startDate", void 0);
__decorate([
    Column({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Event.prototype, "endDate", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Event.prototype, "location", void 0);
__decorate([
    Column({ type: 'int' }),
    __metadata("design:type", Number)
], Event.prototype, "capacity", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.events, {
        onDelete: 'CASCADE',
        nullable: false,
    }),
    __metadata("design:type", Object)
], Event.prototype, "owner", void 0);
__decorate([
    OneToMany(() => Registration, (reg) => reg.event),
    __metadata("design:type", Object)
], Event.prototype, "registrations", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Event.prototype, "createdAt", void 0);
Event = __decorate([
    Entity('events')
], Event);
export { Event };
//# sourceMappingURL=event.entity.js.map