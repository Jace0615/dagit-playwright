import { test, expect } from "@playwright/test";
import {
  image_path,
  latency,
  agit_name,
  collection_name,
  nft_name,
  screenshot_path,
  longlatency,
} from "./constants";
import path from "path";

test.describe.serial("Create", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(latency);
  });

  test("[Create-001] create-collection-without-agit-select", async ({
    page,
  }) => {
    await page.getByText("Create", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.getByText("Drop a collection", { exact: true }).click();
    await page.screenshot({
      path: screenshot_path(
        "Create",
        "create-collection-without-agit-select",
        "1-go-to-create-collection-page"
      ),
      fullPage: true,
    });
    await page.getByPlaceholder("콜렉션 이름 입력").fill(collection_name);
    await page.waitForTimeout(latency);
    await page.getByPlaceholder("콜렉션 설명 입력").fill("test");
    await page.waitForTimeout(latency);
    let fileChooserPromise = page.waitForEvent("filechooser");
    await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[1]/div/div[2]/div/div[1]/div[3]/div[1]/div/label/div/div'
      )
      .click();
    await page.waitForTimeout(latency);
    let fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(image_path, "collection_profile.png"));
    fileChooserPromise = page.waitForEvent("filechooser");
    await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[1]/div/div[2]/div/div[1]/div[3]/div[2]/div/label/div/div'
      )
      .click();
    await page.waitForTimeout(latency);
    fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(image_path, "collection_banner.png"));
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Create",
        "create-collection-without-agit-select",
        "2-fill-the-information-without-agit-select"
      ),
      fullPage: true,
    });
    await page.getByRole("button", { name: "Create" }).click();
    await page.waitForTimeout(latency);
    const element = page.getByRole("button", { name: "Create" });
    await expect(element).toBeVisible();
    console.log("Collection not created");
    await page.screenshot({
      path: screenshot_path(
        "Create",
        "create-collection-without-agit-select",
        "3-check-the-collection-does-not-made"
      ),
      fullPage: true,
    });
  });

  test("[Create-002] create-artwork-without-collection-select", async ({
    page,
  }) => {
    await page.getByText("Create", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.getByText("Mint your artwork", { exact: true }).click();
    await page.getByPlaceholder("NFT 이름 입력").fill(nft_name);
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Create",
        "create-artwork-without-collection-select",
        "1-go-to-mint-your-artwork-page"
      ),
      fullPage: true,
    });
    await page.getByPlaceholder("NFT 설명 입력").fill("test");
    await page.waitForTimeout(latency);
    let fileChooserPromise = page.waitForEvent("filechooser");
    await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[1]/div/div[2]/div/div[1]/div[3]/div/div/label/div/div'
      )
      .click();
    await page.waitForTimeout(latency);
    let fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(image_path, "nft.png"));
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Create",
        "create-artwork-without-collection-select",
        "2-fill-the-information-without-collection-select"
      ),
      fullPage: true,
    });
    await page.getByRole("button", { name: "Create" }).click();
    await page.waitForTimeout(latency);
    const element = page.getByRole("button", { name: "Create" });
    await expect(element).toBeVisible();
    console.log("Artwork not created");
    await page.screenshot({
      path: screenshot_path(
        "Create",
        "create-artwork-without-collection-select",
        "3-check-the-artwork-does-not-made"
      ),
      fullPage: true,
    });
  });
});
