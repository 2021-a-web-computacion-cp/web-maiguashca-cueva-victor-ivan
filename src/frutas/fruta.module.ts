import { Module } from '@nestjs/common';
import { FrutaService as FrutaService } from './fruta.service';
import { FrutaController } from './fruta.controller';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  providers: [FrutaService, PrismaService],
  exports: [FrutaService],
  controllers: [FrutaController],
})
export class FrutaModule {}
