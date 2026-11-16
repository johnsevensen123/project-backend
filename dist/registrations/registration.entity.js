var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, } from 'typeorm';
import { User } from '../users/user.entity.js';
import { Event } from '../events/event.entity.js';
let Registration = class Registration {
    id;
    user;
    event;
    createdAt;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Registration.prototype, "id", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.registrations, {
        onDelete: 'CASCADE',
        nullable: false,
    }),
    __metadata("design:type", Object)
], Registration.prototype, "user", void 0);
__decorate([
    ManyToOne(() => Event, (event) => event.registrations, {
        onDelete: 'CASCADE',
        nullable: false,
    }),
    __metadata("design:type", Object)
], Registration.prototype, "event", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Registration.prototype, "createdAt", void 0);
Registration = __decorate([
    Entity('registrations'),
    Unique(['user', 'event'])
], Registration);
export { Registration };
//# sourceMappingURL=registration.entity.js.map