import { Global, Injectable } from '@nestjs/common';
import { Contract, ethers } from 'ethers';
import { factoryAbi, PANCAKE_ROUTER_ADDRESS, BSC_API_ENDPOINT, routerAbi, PANCAKE_FACTORY_ADDRESS } from './blockchain.constants';

@Injectable()
export class BlockchainService {

    private router: Contract;
    private factory: Contract;
    private provider: any;

    constructor() {
    }

    async load() {
        console.log('[BlockchainService] Loading...');
        this.provider = new ethers.providers.JsonRpcProvider(BSC_API_ENDPOINT);
        await this.initContracts();
        await this.worker();
    }

    async initContracts() {
        this.router = new ethers.Contract(
            PANCAKE_ROUTER_ADDRESS,
            routerAbi,
            this.provider
        );

        this.factory = new ethers.Contract(
            PANCAKE_FACTORY_ADDRESS,
            factoryAbi,
            this.provider
        );
    }

    async worker() {
        const count = await this.factory.allPairsLength();
        const pairs = [];
        for(let i = 1; i < count; i++) {
            const p = await this.factory.allPairs(i);
            pairs.push(p);
            console.log(p);
        }
    }
}
