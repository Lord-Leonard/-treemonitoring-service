import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Polygon } from "geojson";
import { IsPolygon } from "src/lib/validators/isPolygon";

export class CreatePlotDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsPolygon()
  @IsNotEmpty()
  polygon: Polygon

  @IsString()
  @IsNotEmpty()
  owner: string

  @IsString()
  @IsNotEmpty()
  care_state: string

  @IsBoolean()
  @IsNotEmpty()
  care: boolean

  @IsNumber()
  @IsNotEmpty()
  cost_cut_sqm: number

  @IsNumber()
  @IsNotEmpty()
  cost_mulch_sqm: number

  @IsNumber()
  @IsNotEmpty()
  selected_mulchen: number

  @IsNumber()
  @IsNotEmpty()
  selected_maehen: number

  @IsNumber()
  @IsNotEmpty()
  description_plot: number
}

