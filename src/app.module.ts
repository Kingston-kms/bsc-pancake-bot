import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BlockchainService } from './blockchain/blockchain.service';
import { ServerService } from './server/server.service';
import { PrismaService } from './prisma/prisma.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot()
  ],
  controllers: [],
  providers: [
    BlockchainService,
    ServerService,
    PrismaService
  ],
})

export class AppModule { }
