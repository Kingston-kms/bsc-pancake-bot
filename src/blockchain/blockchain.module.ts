import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BlockchainService } from './blockchain.service';

@Module({
  imports: [],
  providers: [PrismaService],
})
export class BlockchainModule { }
