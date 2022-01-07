import { Module } from '@nestjs/common';
import { BlockchainModule } from './blockchain/blockchain.module';
import { BlockchainService } from './blockchain/blockchain.service';
import { ServerService } from './server/server.service';

@Module({
  imports: [BlockchainModule],
  controllers: [],
  providers: [BlockchainService, ServerService],
})
export class AppModule {}
