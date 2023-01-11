import { Controller, Get, UseGuards } from "@nestjs/common";
import { AdminGuard } from "./admin.guard";

@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
  @Get()
  get(): string {
    return "Admin";
  }
}
