import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlotDto } from './dto/create-plot.dto';
import { PlotsService } from './plots.service';

@Controller('plots')
export class PlotsController {
  constructor(
    private plotsServerice: PlotsService
  ) { }

  @Post()
  async createPlot(@Body() plot: CreatePlotDto) {
    await this.plotsServerice.createPlot(plot)
  }
}
