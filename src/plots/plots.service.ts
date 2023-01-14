import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GeometryService } from 'src/geometry/geometry.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-plot.dto';

@Injectable()
export class PlotsService {
  constructor(
    private prisma: PrismaService,
    private geometryService: GeometryService
  ) { }

  async createPlot(plot: CreateUserDto) {
    // Should be outsourced to a class-validator decorator
    const polygonIntersectsPlotResult = await (await this.geometryService.polygonIntersectsPlot(plot.polygon))

    if (polygonIntersectsPlotResult.polygonOverlapsPlot) {
      throw new HttpException('new plot overlaps existing plots', HttpStatus.CONFLICT)
    }

    //OOS: check if Trees exist on Polygon

    await this.prisma.$executeRaw`
    INSERT INTO "plot" (
      "name",
      "polygon",
      "owner",
      "care_state",
      "care",
      "cost_cut_sqm",
      "cost_mulch_sqm",
      "selected_maehen", 
      "selected_mulchen",
      "description_plot",
    ) VALUES (
      ${plot.name},
      (ST_GeomFromGeoJSON(${JSON.stringify(plot.polygon)})),
      ${plot.owner},
      ${plot.care_state},
      ${plot.care},
      ${plot.cost_cut_sqm},
      ${plot.cost_mulch_sqm},
      ${plot.selected_maehen},
      ${plot.selected_mulchen},
      ${plot.description_plot}
    )`

    // Unschön - eventuell überarbeiten 
    return this.prisma.plot.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 1
    })
  }
}
