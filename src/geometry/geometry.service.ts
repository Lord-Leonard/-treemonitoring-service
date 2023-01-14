import { Injectable } from '@nestjs/common';
import { Plot } from '@prisma/client';
import { Polygon } from 'geojson';
import { PolygonIntersectsPlotOutput } from 'src/plots/dto/polygon-intersects-plot-outpu';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GeometryService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async polygonIntersectsPlot(polygon: Polygon): Promise<PolygonIntersectsPlotOutput> {
    // language=SQL
    const plots: Plot[] = await this.prisma.$queryRaw`
    SELECT * 
    FROM (
      SELECT * , ST_INTERSECTS(
        plot.polygon,
        ST_GeomFromGeoJSON(${JSON.stringify(polygon)})
      ) as intersects_plot 
      FROM plot 
      WHERE deactivated = false
    ) as plot_check 
    where plot_check.intersects_plot = TRUE`

    if (plots && plots.length > 0) {
      return {
        polygonOverlapsPlot: true,
        plots: plots,
      };
    } else {
      return {
        polygonOverlapsPlot: false,
        plots: undefined,
      };
    }
  }
}
