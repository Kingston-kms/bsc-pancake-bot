export const PANCAKE_ROUTER_ADDRESS = '0xD99D1c33F9fC3444f8101754aBC46c52416550D1'
export const PANCAKE_FACTORY_ADDRESS = '0x6725F303b657a9451d8BA641348b6761A6CC7a17'
export const BSC_API_ENDPOINT = 'https://data-seed-prebsc-1-s1.binance.org:8545'
export const DAI_CONTRACT = '0x8a9424745056eb399fd19a0ec26a14316684e274'
export const BUSD_CONTRACT = '0x78867bbeef44f2326bf8ddd1941a4439382ef2a7'
export const WBNB_CONTRACT = '0xae13d989dac2f0debff460ac112a837c89baa7cd'

export const routerAbi = [
    'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
    'function getAmountsIn(uint amountOut, address[] memory path) public view returns (uint[] memory amounts)'
];

export const factoryAbi = [
    'function allPairs(uint) external view returns (address pair)',
    'function allPairsLength() external view returns (uint)'
]
