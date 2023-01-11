import { Controller, Get } from '@nestjs/common';
import { PingService } from './ping.service';

@Controller('ping')
export class PingController {
  constructor(
    private readonly pingservice: PingService
  ) { }

  @Get()
  ping(): string {
    return this.pingservice.ping();
  }
}
