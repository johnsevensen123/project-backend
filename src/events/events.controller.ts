import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  ParseUUIDPipe,
} from '@nestjs/common';
import type { Request } from 'express';

import { EventsService } from './events.service.js';
import { CreateEventDto } from './dto/create-event.dto.js';
import { UpdateEventDto } from './dto/update-event.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('events')
@ApiBearerAuth()
@Controller('events')
@UseGuards(JwtAuthGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(
    @Body() createEventDto: CreateEventDto,
    @Req() request: Request & { user: { sub: string } },
  ) {
    return this.eventsService.create(createEventDto, request.user.sub);
  }

  @Get()
  findAll(@Req() request: Request & { user: { sub: string } }) {
    return this.eventsService.findAll(request.user.sub);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() request: Request & { user: { sub: string } },
  ) {
    return this.eventsService.findOne(id, request.user.sub);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEventDto: UpdateEventDto,
    @Req() request: Request & { user: { sub: string } },
  ) {
    return this.eventsService.update(id, updateEventDto, request.user.sub);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() request: Request & { user: { sub: string } },
  ) {
    return this.eventsService.remove(id, request.user.sub);
  }
}