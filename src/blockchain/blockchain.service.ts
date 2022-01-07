import { Global, Injectable } from '@nestjs/common';
import { Contract, ethers } from 'ethers';
import { factoryAbi, PANCAKE_ROUTER_ADDRESS, BSC_API_ENDPOINT, routerAbi, PANCAKE_FACTORY_ADDRESS, BUSD_CONTRACT, WBNB_CONTRACT, DAI_CONTRACT } from './blockchain.constants';

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
        const value = ethers.utils.parseUnits('1');
        const amountsIn1 = await this.router.getAmountsOut(value, [WBNB_CONTRACT, BUSD_CONTRACT]);
        console.log(ethers.utils.formatUnits(amountsIn1[0]) + ' WBNB');
        console.log(ethers.utils.formatUnits(amountsIn1[1]) + ' BUSD');

        const amountsIn2 = await this.router.getAmountsOut(value, [WBNB_CONTRACT, DAI_CONTRACT]);
        console.log(ethers.utils.formatUnits(amountsIn2[0]) + ' WBNB');
        console.log(ethers.utils.formatUnits(amountsIn2[1]) + ' DAI');

        /*const count = await this.factory.allPairsLength();
        const pairs = [];
        for(let i = 1; i < count; i++) {
            const p = await this.factory.allPairs(i);
            pairs.push(p);
            console.log(p);
        }
        console.log(pairs);*/

        setTimeout(async () => {
            await this.worker();    
        }, 5000);
    }
}
