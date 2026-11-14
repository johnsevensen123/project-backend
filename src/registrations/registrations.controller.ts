import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UseGuards,
  Req,
  ParseUUIDPipe,
} from '@nestjs/common';
import type { Request } from 'express';

import { RegistrationsService } from './registrations.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('registrations')
@ApiBearerAuth()
@Controller('registrations')
@UseGuards(JwtAuthGuard)
export class RegistrationsController {
  constructor(
    private readonly registrationsService: RegistrationsService,
  ) {}

  @Post(':eventId')
  register(
    @Param('eventId', ParseUUIDPipe) eventId: string,
    @Req() request: Request & { user: { sub: string } },
  ) {
    return this.registrationsService.register(
      eventId,
      request.user.sub,
    );
  }

  @Get()
  findAll(
    @Req() request: Request & { user: { sub: string } },
  ) {
    return this.registrationsService.findAll(request.user.sub);
  }

  @Delete(':id')
  cancel(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() request: Request & { user: { sub: string } },
  ) {
    return this.registrationsService.cancel(
      id,
      request.user.sub,
    );
  }
}