import { test, expect } from "@playwright/test";
import { chromium } from "playwright";
import {
  image_path,
  latency,
  agit_name,
  collection_name,
  nft_name,
  screenshot_path,
} from "./constants";
import path from "path";

test.describe("NFT test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(latency);
  });

  test("View original NFT contents", async ({ page }) => {
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText(nft_name, { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.getByRole("button", { name: "View Original" }).click();
    await page.waitForTimeout(latency);
  });

  test("Sell NFT", async ({ page }) => {
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("nft", "sell-nft", "1-my-profile"),
      fullPage: true,
    });
    await page.getByText(nft_name, { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("nft", "sell-nft", "2-nft-detail"),
      fullPage: true,
    });

    await page.getByRole("button", { name: "Sell Nft" }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("nft", "sell-nft", "3-after-sell-nft"),
      fullPage: true,
    });
  });

  test("Buy NFT", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
      storageState: {
        origins: [
          {
            origin: process.env.BASE_URL || "",
            localStorage: [
              {
                name: "identity",
                value: `"${process.env.IDENTITY2}"` || "",
              },
            ],
          },
        ],
      },
    });

    const page = await context.newPage();
    await page.goto("/");
    await page.getByPlaceholder("Search").click();
    await page.fill('[placeholder="Search"]', nft_name);
    await page.waitForTimeout(latency);
    await page.press('[placeholder="Search"]', "Enter");
    await page.waitForTimeout(latency);
    await page.locator('[data-node-hydration="24"]').click();
    await page.waitForTimeout(latency);
    await page.getByText(nft_name).first().click();
    await page.waitForTimeout(latency);
    await page.getByRole("button", { name: "Buy now" }).click();
    await page.waitForTimeout(latency);
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText(nft_name, { exact: true }).click();
    await page.waitForTimeout(latency);
  });

  test("View original NFT by a new owner", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
      storageState: {
        origins: [
          {
            origin: process.env.BASE_URL || "",
            localStorage: [
              {
                name: "identity",
                value: `"${process.env.IDENTITY2}"` || "",
              },
            ],
          },
        ],
      },
    });

    const page = await context.newPage();
    await page.goto("/");
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText("test 11221", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.getByRole("button", { name: "View Original" }).click();
    await page.waitForTimeout(latency);
  });

  test("Failed to view original NFT by a previouse owner", async ({ page }) => {
    await page.getByPlaceholder("Search").click();
    await page.fill('[placeholder="Search"]', nft_name);
    await page.waitForTimeout(latency);
    await page.press('[placeholder="Search"]', "Enter");
    await page.waitForTimeout(latency);
    await page.locator('[data-node-hydration="24"]').click();
    await page.waitForTimeout(latency);
    await page.getByText(nft_name).first().click();
    await page.waitForTimeout(latency);
    await page.getByRole("button", { name: "View Original" }).click();
    await page.waitForTimeout(latency);
  });
});
