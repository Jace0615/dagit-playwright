import { test, expect } from "@playwright/test";
import { chromium } from "playwright";
import {
  image_path,
  latency,
  longlatency,
  agit_name,
  collection_name,
  nft_name,
  screenshot_path,
} from "./constants";
import path from "path";

test.describe.serial("NFT", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(latency);
  });

  test("[NFT-001] View original NFT contents", async ({ page }) => {
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "veiw original NFT contents",
        "1-my-profile"
      ),
      fullPage: true,
    });
    await page.getByText("Test NFT - 1732186193").click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "veiw original NFT contents",
        "2-nft-detail"
      ),
      fullPage: true,
    });
    await page.getByRole("button", { name: "View Original" }).click();
    await page.waitForTimeout(longlatency);
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "veiw original NFT contents",
        "3-after-view-original-nft"
      ),
      fullPage: true,
    });
  });

  test("[NFT-002] Sell NFT", async ({ page }) => {
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("nft", "sell-nft", "1-my-profile"),
      fullPage: true,
    });
    await page.getByText("Test NFT - 1730878927").click();
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

  test("[NFT-003] Buy NFT", async () => {
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
    await page.fill('[placeholder="Search"]', "Test NFT - 1730878927");
    await page.waitForTimeout(latency);
    await page.press('[placeholder="Search"]', "Enter");
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("nft", "Buy-NFT", "1-search-results"),
      fullPage: true,
    });
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[2]/div/div/div[1]/div[3]')
      .click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("nft", "Buy-NFT", "2-go-to-nft"),
      fullPage: true,
    });
    await page.getByText("Test NFT - 1730878927").first().click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("nft", "Buy-NFT", "3-go-to-nft-detail"),
      fullPage: true,
    });
    await page.getByRole("button", { name: "Buy now" }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("nft", "Buy-NFT", "4-buy-nft"),
      fullPage: true,
    });
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("nft", "Buy-NFT", "5-go-to-my-profile"),
      fullPage: true,
    });
    await page.reload();
    await page.getByText("Test NFT - 1730878927").click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("nft", "Buy-NFT", "6-go-to-nft-detail"),
      fullPage: true,
    });
  });

  test("[NFT-004] View original NFT by a new owner", async () => {
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
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "View-original-NFT-by-a-new-owner",
        "1-go-to-my-profile"
      ),
      fullPage: true,
    });
    await page.getByText("Test NFT - 1730878927").click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "View-original-NFT-by-a-new-owner",
        "2-go-to-nft-detail"
      ),
      fullPage: true,
    });
    await page.getByRole("button", { name: "View Original" }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "View-original-NFT-by-a-new-owner",
        "3-click-view-original"
      ),
      fullPage: true,
    });
  });

  test("[NFT-005] Failed to view original NFT by a previous owner", async ({
    page,
  }) => {
    await page.getByPlaceholder("Search").click();
    await page.fill('[placeholder="Search"]', "Test NFT - 1730878927");
    await page.waitForTimeout(latency);
    await page.press('[placeholder="Search"]', "Enter");
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "Failed-to-view-original-NFT-by-a-previous-owner",
        "1-search-nft"
      ),
      fullPage: true,
    });
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[2]/div/div/div[1]/div[3]')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText("Test NFT - 1730878927").first().click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "Failed-to-view-original-NFT-by-a-previous-owner",
        "2-go-to-nft-detail"
      ),
      fullPage: true,
    });
    const locator = page.locator(
      'xpath=//*[@id="main"]/div[1]/div[4]/div/div[2]/button'
    );
    await expect(locator).toBeDisabled();
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "Failed-to-view-original-NFT-by-a-previous-owner",
        "3-check-view-original-button"
      ),
      fullPage: true,
    });
  });

  // When search function is working rightly, adjust "[NFT replace] tests"
  test("[NFT replace] Sell NFT", async () => {
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
    await page.fill('[placeholder="Search"]', "Test NFT - 1730878927");
    await page.waitForTimeout(latency);
    await page.press('[placeholder="Search"]', "Enter");
    await page.waitForTimeout(latency);
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[2]/div/div/div[1]/div[3]')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText("Test NFT - 1730878927").first().click();
    await page.waitForTimeout(latency);
    await page.getByRole("button", { name: "Sell Nft" }).click();
    await page.waitForTimeout(latency);
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.reload();
    await page.getByText("Test NFT - 1730878927").click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("nft", "Buy-NFT", "6-go-to-nft-detail"),
      fullPage: true,
    });
  });
  test("[NFT replace] Buy NFT", async ({ page }) => {
    await page.goto("/");
    await page.getByPlaceholder("Search").click();
    await page.fill('[placeholder="Search"]', "Test NFT - 1730878927");
    await page.waitForTimeout(latency);
    await page.press('[placeholder="Search"]', "Enter");
    await page.waitForTimeout(latency);
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[2]/div/div/div[1]/div[3]')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText("Test NFT - 1730878927").first().click();
    await page.waitForTimeout(latency);
    await page.getByRole("button", { name: "Buy now" }).click();
    await page.waitForTimeout(latency);
  });

  test("[NFT-006] Check the NFT image section size", async ({ page }) => {
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "Check-the-NFT-image-section-size",
        "1-my-profile"
      ),
      fullPage: true,
    });
    await page.getByText("Test NFT - 1732186193").click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "Check-the-NFT-image-section-size",
        "2-nft-detail"
      ),
      fullPage: true,
    });
    await page.getByRole("button", { name: "Details" }).click();
    await page.waitForTimeout(longlatency);
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "Check-the-NFT-image-section-size",
        "3-view-Detail-button-page"
      ),
      fullPage: true,
    });
    await page.getByRole("button", { name: "Activity" }).click();
    await page.waitForTimeout(longlatency);
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "Check-the-NFT-image-section-size",
        "3-view-Activity-button-page"
      ),
      fullPage: true,
    });
  });

  //'NFT-007' test codes will be adjust, when search function is fixed

  test("[NFT-007] Check NFT status after trades", async ({ page }) => {
    const buttonLocator1 = page.getByRole("button", { name: "Buy now" });
    await page.goto("https://dev.dagit.club/ko/nft/69/0");
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "Check-NFT-status-after-trades",
        "1-NFT-detail-page(Sell)"
      ),
      fullPage: true,
    });
    await page.getByRole("button", { name: "Sell Nft" }).click();
    await page.waitForTimeout(latency);
    await expect(buttonLocator1).toBeVisible();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "Check-NFT-status-after-trades",
        "2-chcek-the-NFT-status(visible-Buy-now-button)"
      ),
      fullPage: true,
    });
    const browser = await chromium.launch();
    const context2 = await browser.newContext({
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
    const buttonLocator2 = page.getByRole("button", { name: "Sell Nft" });
    const page1 = await context2.newPage();
    await page1.goto("https://dev.dagit.club/ko/nft/69/0");
    await page1.waitForTimeout(latency);
    await page1.screenshot({
      path: screenshot_path(
        "nft",
        "Check-NFT-status-after-trades",
        "3-NFT-detail-page(Buy)"
      ),
      fullPage: true,
    });
    await page1.getByRole("button", { name: "Buy now" }).click();
    await page1.waitForTimeout(latency);
    await expect(buttonLocator2).toBeVisible();
    await page1.waitForTimeout(latency);
    await page1.screenshot({
      path: screenshot_path(
        "nft",
        "Check-NFT-status-after-trades",
        "4-chcek-the-NFT-status(visible-Sell-NFT-button)"
      ),
      fullPage: true,
    });
  });

  // When search function is working rightly, adjust "[NFT replace] tests"
  test("[NFT replace2] Sell NFT", async () => {
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
    await page.fill('[placeholder="Search"]', "Test NFT - 1730878927");
    await page.waitForTimeout(latency);
    await page.press('[placeholder="Search"]', "Enter");
    await page.waitForTimeout(latency);
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[2]/div/div/div[1]/div[3]')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText("Test NFT - 1730878927").first().click();
    await page.waitForTimeout(latency);
    await page.getByRole("button", { name: "Sell Nft" }).click();
    await page.waitForTimeout(latency);
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.reload();
    await page.getByText("Test NFT - 1730878927").click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("nft", "Buy-NFT", "6-go-to-nft-detail"),
      fullPage: true,
    });
  });
  test("[NFT replace2] Buy NFT", async ({ page }) => {
    await page.goto("/");
    await page.getByPlaceholder("Search").click();
    await page.fill('[placeholder="Search"]', "Test NFT - 1730878927");
    await page.waitForTimeout(latency);
    await page.press('[placeholder="Search"]', "Enter");
    await page.waitForTimeout(latency);
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[2]/div/div/div[1]/div[3]')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText("Test NFT - 1730878927").first().click();
    await page.waitForTimeout(latency);
    await page.getByRole("button", { name: "Buy now" }).click();
    await page.waitForTimeout(latency);
  });

  test("[NFT-008] Image-section-size-check-between-Detail&Activity-menu ", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForTimeout(latency);
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[5]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText("Test NFT - 1730878927").first().click();
    await page.waitForTimeout(latency);
    const style = page.locator('[style="height: 700px"]');
    const originalStyle = await style.evaluate((element) => {
      return element.style.height;
    });
    console.log(`Original style: ${originalStyle}`);
    await page.getByRole("button", { name: "Activity" }).click();
    const updatedStyle = await style.evaluate((element) => {
      return element.style.height;
    });
    console.log(`Updated style: ${updatedStyle}`);
    expect(updatedStyle).toBe(originalStyle);
  });
});
