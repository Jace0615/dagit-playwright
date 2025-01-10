import { test, expect } from "@playwright/test";
import { chromium } from "playwright";
import {
  image_path,
  latency,
  longlatency,
  agit_name,
  collection_name,
  nft_name,
  my_profile,
  screenshot_path,
} from "./constants";
import path from "path";

test.describe("Collection", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(latency);
  });

  test("[Collection-001] Collection list view", async ({ page }) => {
    const initialURL = page.url();
    await page.getByRole("link", { name: "Collection" }).click();
    await page.waitForTimeout(latency);
    const updatedURL = page.url();
    expect(updatedURL).not.toBe(initialURL);
    console.log("page changed", updatedURL);
    await page.screenshot({
      path: screenshot_path(
        "collection",
        "go-to-collection-list",
        "1-go-to-collection-list"
      ),
      fullPage: true,
    });
  });

  test("[Collection-002] Follow a collection", async ({ page }) => {
    await page.goto(my_profile);
    await page.waitForTimeout(latency);
    await page.getByText("My Agit", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.getByText(agit_name, { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "collection",
        "follow-a-collection",
        "1-go-to-agit"
      ),
      fullPage: true,
    });
    await page.getByText(collection_name, { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "collection",
        "follow-a-collection",
        "2-go-to-collection"
      ),
      fullPage: true,
    });
    await page.getByRole("button", { name: "Follow" }).click();
    await page.waitForTimeout(latency);
    await page.getByText("confirm").click();
    await page.waitForTimeout(latency);
    await page.getByText("Followed").isVisible();
    await page.screenshot({
      path: screenshot_path(
        "collection",
        "follow-a-collection",
        "3-follow-button-click-and-changed"
      ),
      fullPage: true,
    });
  });

  test("[Collection-003] Check-item-quantity-matches-the-displayed-text", async ({
    page,
  }) => {
    await page.goto(my_profile);
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "collection",
        "Check-item-quantity-matches-the-displayed-text",
        "1-go-to-my-profile-page"
      ),
      fullPage: true,
    });
    await page.getByText("My Agit", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.getByText(agit_name).click();
    await page.waitForTimeout(latency);
    await page.getByText(collection_name).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "collection",
        "Check-item-quantity-matches-the-displayed-text",
        "2-go-to-collection-page"
      ),
      fullPage: true,
    });

    const childDivs = await page.locator(
      'xpath=//*[@id="main"]/div[1]/div[4]/div/div[3]/div[3]/*'
    );
    const count = await childDivs.count();
    const displayedText = await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[4]/div/div[3]/div[1]/div[1]/div[2]/div[1]/p[2]'
      )
      .innerText();
    const displayedNumber = parseInt(displayedText.replace(/\D/g, ""), 10);

    if (count === displayedNumber) {
      console.log(
        `Test passed: Item count (${count}) matches displayed number (${displayedNumber})`
      );
    } else {
      throw new Error(
        `Test failed: Item count (${count}) does not match displayed number (${displayedNumber})`
      );
    }

    await page.screenshot({
      path: screenshot_path(
        "collection",
        "Check-item-quantity-matches-the-displayed-text",
        "3-check-item-quantity"
      ),
      fullPage: true,
    });
  });

  test("[Collection-004] Check-item-quantity-matches-in-collection-items", async ({
    page,
  }) => {
    await page.goto("https://dev.dagit.club/ko/collection/list");
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "collection",
        "Check-item-quantity-matches-in-collection-items",
        "1-go-to-collection-list-page"
      ),
      fullPage: true,
    });
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page1 = await context.newPage();
    await page1.goto("https://dev.dagit.club/ko/collection/list");
    await page1
      .locator('xpath =//*[@id="main"]/div[1]/div[5]/div[1]/div/div[1]/div/img')
      .click();
    const childDivs = await page1.locator(
      'xpath=//*[@id="main"]/div[1]/div[5]/div[1]/div[2]/div[3]/*'
    );
    await page1.waitForTimeout(latency);
    const count = await childDivs.count();
    const displayedText = await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[5]/div[1]/div/div[1]/p[2]/span'
      )
      .innerText();
    const displayedNumber = parseInt(displayedText.replace(/\D/g, ""), 10);

    if (count === displayedNumber) {
      console.log(
        `Test passed: Item count (${count}) matches displayed number (${displayedNumber})`
      );
    } else {
      throw new Error(
        `Test failed: Item count (${count}) does not match displayed number (${displayedNumber})`
      );
    }
    await page.screenshot({
      path: screenshot_path(
        "collection",
        "Check-item-quantity-matches-the-displayed-text",
        "3-check-item-quantity"
      ),
      fullPage: true,
    });
  });
});

// test("[Collection-005] Mint-NFT-function-in-collection", async ({ page }) => {
//   await page.goto("https://dev.dagit.club/ko/collection/151/131");
//   await page.waitForTimeout(latency);
//   await page.screenshot({
//     path: screenshot_path(
//       "collection",
//       "Mint-NFT-function-in-collection",
//       "1-go-to-collection"
//     ),
//     fullPage: true,
//   });
//   await page.getByRole("button", { name: "Mint NFT" }).click();
//   await page.waitForTimeout(latency);
//   await page
//     .getByPlaceholder("Name yout NFT", { exact: true })
//     .fill(nft_name);
//   await page.waitForTimeout(latency);
//   await page
//     .getByPlaceholder("Enter a description", { exact: true })
//     .fill("Test");
//   await page.waitForTimeout(latency);
//   let fileChooserPromise = page.waitForEvent("filechooser");
//   await page
//     .locator(
//       'xpath=//*[@id="main"]/div[1]/div[5]/div[1]/div[1]/div/div[2]/div[1]/div/div/div/label'
//     )
//     .click();
//   await page.waitForTimeout(latency);
//   let fileChooser = await fileChooserPromise;
//   await fileChooser.setFiles(path.join(image_path, "nft.png"));
//   await page.waitForTimeout(latency);
//   await page.screenshot({
//     path: screenshot_path(
//       "collection",
//       "Mint-NFT-function-in-collection",
//       "3-fill-the-descriptions"
//     ),
//     fullPage: true,
//   });
//   await page.getByRole("button", { name: "Create" }).click();
//   await page.waitForTimeout(latency);
//   const result = page.getByText(nft_name);
//   await expect(result).toBeVisible();
//   await page.screenshot({
//     path: screenshot_path(
//       "collection",
//       "Mint-NFT-function-in-collection",
//       "4-NFT-created-success"
//     ),
//     fullPage: true,
//   });
// });
