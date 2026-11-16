var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, NotFoundException, ConflictException, BadRequestException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registration } from './registration.entity.js';
import { Event } from '../events/event.entity.js';
let RegistrationsService = class RegistrationsService {
    registrationRepository;
    eventRepository;
    constructor(registrationRepository, eventRepository) {
        this.registrationRepository = registrationRepository;
        this.eventRepository = eventRepository;
    }
    async register(eventId, userId) {
        const event = await this.eventRepository.findOne({
            where: { id: eventId },
        });
        if (!event) {
            throw new NotFoundException('Événement introuvable');
        }
        const existingRegistration = await this.registrationRepository.findOne({
            where: {
                user: { id: userId },
                event: { id: eventId },
            },
        });
        if (existingRegistration) {
            throw new ConflictException('Vous êtes déjà inscrit à cet événement');
        }
        const registrationCount = await this.registrationRepository.count({
            where: { event: { id: eventId } },
        });
        if (registrationCount >= event.capacity) {
            throw new BadRequestException('La capacité maximale de cet événement est atteinte');
        }
        const registration = this.registrationRepository.create({
            user: { id: userId },
            event: { id: eventId },
        });
        return this.registrationRepository.save(registration);
    }
    async findAll(userId) {
        return this.registrationRepository.find({
            where: {
                user: { id: userId },
            },
            relations: {
                event: true,
            },
        });
    }
    async cancel(id, userId) {
        const registration = await this.registrationRepository.findOne({
            where: {
                id,
                user: { id: userId },
            },
        });
        if (!registration) {
            throw new NotFoundException('Inscription introuvable');
        }
        await this.registrationRepository.remove(registration);
        return {
            message: 'Inscription annulée avec succès',
        };
    }
};
RegistrationsService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Registration)),
    __param(1, InjectRepository(Event)),
    __metadata("design:paramtypes", [Repository,
        Repository])
], RegistrationsService);
export { RegistrationsService };
//# sourceMappingURL=registrations.service.js.map