import { Global, Injectable } from '@nestjs/common';
import { BlockchainService } from 'src/blockchain/blockchain.service';

@Injectable()
export class ServerService {
    constructor(private readonly blockchainService: BlockchainService) {

    }

    async start() {
        await this.load();
    }

    async load() {
        await this.blockchainService.load();
    }
}
