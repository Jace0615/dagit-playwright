import path from "path";

export const latency = Number(process.env.LATENCY) || 0;
export const agit_name = `Test Agit - ${process.env.SIGNATURE}`;
export const collection_name = `Test Collection - ${process.env.SIGNATURE}`;
export const nft_name = `Test NFT - ${process.env.SIGNATURE}`;
export const image_path = path.join(__dirname, "../fixtures/images/");
