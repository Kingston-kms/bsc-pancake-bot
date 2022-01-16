import { Injectable, Logger } from '@nestjs/common';
import { Contract, ethers } from 'ethers';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron, SchedulerRegistry, Interval } from '@nestjs/schedule';
import { factoryAbi, PANCAKE_ROUTER_ADDRESS, BSC_API_ENDPOINT, routerAbi, PANCAKE_FACTORY_ADDRESS, BUSD_CONTRACT, WBNB_CONTRACT, DAI_CONTRACT, pairAbi, BSC_MAINNER_ENDPOINT } from './blockchain.constants';
import { threadId } from 'worker_threads';


@Injectable()
export class BlockchainService {

    private router: Contract;
    private factory: Contract;
    private provider: any;
    private readonly logger = new Logger(BlockchainService.name);

    private mainnetProvider: any;
    private mainRouter: Contract;
    private mainFactory: Contract;

    constructor(
        private readonly prisma: PrismaService,
        private readonly schedule: SchedulerRegistry
    ) {

    }

    async load() {
        console.log('[BlockchainService] Loading...');
        this.provider = new ethers.providers.JsonRpcProvider(BSC_API_ENDPOINT);
        this.mainnetProvider = new ethers.providers.JsonRpcProvider(BSC_MAINNER_ENDPOINT)
        await this.initContracts();
        await this.updatePrice();
    }

    async initContracts() {
        this.router = new ethers.Contract(
            PANCAKE_ROUTER_ADDRESS,
            routerAbi,
            this.mainnetProvider
        );

        this.factory = new ethers.Contract(
            PANCAKE_FACTORY_ADDRESS,
            factoryAbi,
            this.mainnetProvider
        );

        this.mainRouter = new ethers.Contract(
            '0x10ED43C718714eb63d5aA57B78B54704E256024E',
            routerAbi,
            this.mainnetProvider
        );

    }


    async updatePrice() {

        this.logger.log('Init listener');
        const pairContract = new ethers.Contract('0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16', pairAbi, this.mainnetProvider);
        let blockNumber = 0;
        pairContract.on("Swap", async (sender, amount0In, amount1In, amount0Out, amount1Out, to, event) => {

            const value = ethers.utils.parseUnits('1');
            const amountsIn1 = await this.mainRouter.getAmountsOut(value, ['0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56']);
            await this.prisma.price.create({
                data: {
                    block_number: event.blockNumber,
                    left: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
                    right: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
                    price: amountsIn1[1].toString()
                }
            });

        });

    }

    async worker() {

        const value = ethers.utils.parseUnits('1');
        const amountsIn1 = await this.router.getAmountsOut(value, [WBNB_CONTRACT, BUSD_CONTRACT]);
        this.logger.log(ethers.utils.formatUnits(amountsIn1[0]) + ' WBNB');
        this.logger.log(ethers.utils.formatUnits(amountsIn1[1]) + ' BUSD');

        const amountsIn2 = await this.router.getAmountsOut(value, [WBNB_CONTRACT, DAI_CONTRACT]);
        this.logger.log(ethers.utils.formatUnits(amountsIn2[0]) + ' WBNB');
        this.logger.log(ethers.utils.formatUnits(amountsIn2[1]) + ' DAI');

        await this.prisma.price.create({
            data: {
                block_number: 0,
                left: WBNB_CONTRACT,
                right: BUSD_CONTRACT,
                price: amountsIn1[1].toString()
            }
        });

        await this.prisma.price.create({
            data: {
                block_number: 0,
                left: WBNB_CONTRACT,
                right: DAI_CONTRACT,
                price: amountsIn2[1].toString()
            }
        });

        this.logger.log('End Worker');
        /*
                const priceBUSD = new this.priceModel({
                    pair_left: WBNB_CONTRACT,
                    pair_right: BUSD_CONTRACT,
                    price: amountsIn1[1]
                });
        
                priceBUSD.save();
        
                const priceDAI = new this.priceModel({
                    pair_left: WBNB_CONTRACT,
                    pair_right: DAI_CONTRACT,
                    price: amountsIn2[1]
                });
        
                priceDAI.save();
        */
        /*const count = await this.factory.allPairsLength();
        const pairs = [];
        for(let i = 1; i < count; i++) {
            const p = await this.factory.allPairs(i);
            pairs.push(p);
            console.log(p);
        }
        console.log(pairs);*/

        /*setTimeout(async () => {
            await this.worker();    
        }, 5000);*/
    }
}
