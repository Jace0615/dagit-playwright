import path from "path";

export const latency = Number(process.env.LATENCY) || 0;
export const longlatency = Number(process.env.LONGLATENCY) || 0;
export const agit_name = `Test Agit - ${process.env.SIGNATURE}`;
export const collection_name = `Test Collection - ${process.env.SIGNATURE}`;
export const nft_name = `Test NFT - ${process.env.SIGNATURE}`;
export const image_path = path.join(__dirname, "../fixtures/images/");
export const DAO_name = `DAO - ${process.env.SIGNATURE}`;
export const agit_test_page = `https://dev.dagit.club/ko/agit/e5d3f76a-69f5-44fb-a993-b53be84fa630`;
export const colletion_test_page = `https://dev.dagit.club/ko/collection/e5d3f76a-69f5-44fb-a993-b53be84fa630/6a10505a-8583-41fe-94a3-f92818452168`;
export const artwork_test_page = `https://dev.dagit.club/ko/agit/e5d3f76a-69f5-44fb-a993-b53be84fa630`;

export const screenshot_path = (spec, scenario, name) =>
  path.join(__dirname, `../screenshots/${spec}-spec/${scenario}/${name}.png`);
