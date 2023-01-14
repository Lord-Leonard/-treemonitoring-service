import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-plot.dto';
import { PlotsService } from './plots.service';

@Controller('plots')
export class PlotsController {
  constructor(
    private plotsServerice: PlotsService
  ) { }

  @Post()
  async createPlot(@Body() plot: CreateUserDto) {
    this.plotsServerice.createPlot(plot)
  }
}
