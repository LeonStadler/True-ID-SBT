import { type Chain } from "viem";

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || "https://rpc-amoy.polygon.technology/";
const BLOCK_EXPLORER_URL = process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL || "https://amoy.polygonscan.com/";
const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID || 80002);

export const polygonAmoy = {
  id: CHAIN_ID,
  name: "Polygon Amoy Testnet",
  network: "maticamoy",
  nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  rpcUrls: {
    default: { http: [RPC_URL] },
    public: { http: [RPC_URL] },
  },
  blockExplorers: {
    default: { name: "Polygonscan", url: BLOCK_EXPLORER_URL },
  },
  contracts: {},
} as const satisfies Chain;
