//export const contractAddress = "0xC99B275dF2DDAad1CbB277eB76aD9EE6252B7899"; old contract
const envAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
if (!envAddress) {
    throw new Error("Missing required env NEXT_PUBLIC_CONTRACT_ADDRESS");
}
export const contractAddress = envAddress as `0x${string}`;
