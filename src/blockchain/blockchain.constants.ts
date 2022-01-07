export const PANCAKE_ROUTER_ADDRESS = '0xD99D1c33F9fC3444f8101754aBC46c52416550D1'
export const PANCAKE_FACTORY_ADDRESS = '0x6725F303b657a9451d8BA641348b6761A6CC7a17'
export const BSC_API_ENDPOINT = 'https://data-seed-prebsc-1-s1.binance.org:8545'

export const routerAbi = [
    'function getAmountsOut(uint amountIn, address[] memory path) public view returns(uint[] memory amounts)'
];

export const factoryAbi = [
    'function allPairs(uint) external view returns (address pair)',
    'function allPairsLength() external view returns (uint)'
]
