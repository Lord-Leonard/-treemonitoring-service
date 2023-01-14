import { Plot } from "@prisma/client";

export class PolygonIntersectsPlotOutput {
  polygonOverlapsPlot: boolean;
  plots: Plot[]
}
