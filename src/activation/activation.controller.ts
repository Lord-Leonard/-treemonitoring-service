import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ActivationService } from './activation.service';

@Controller('activate')
export class ActivationController {
  constructor(
    private activationService: ActivationService
  ) { }

  @Get('user/:id')
  async activateUser(@Param('id', ParseIntPipe) userActivationId) {
    return this.activationService.activateUser(userActivationId)

  }

}
