import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { Service } from "./user/service";
import { PrismaService } from "./service/prisma.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, Service, PrismaService],
})
export class AppModule {}
