import { test } from "@playwright/test";
import {
  image_path,
  latency,
  agit_name,
  collection_name,
  nft_name,
  screenshot_path,
} from "./constants";
import path from "path";

test.describe("setup data", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(latency);
  });

  test("creating Agit", async ({ page }) => {
    await page.getByText("Create", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.getByText("Build an agit", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.getByPlaceholder("아지트 입력", { exact: true }).fill(agit_name);
    await page.waitForTimeout(latency);
    await page
      .getByPlaceholder("아지트 설명 입력", { exact: true })
      .fill("Test");
    await page.waitForTimeout(latency);
    let fileChooserPromise = page.waitForEvent("filechooser");
    await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[1]/div/div[2]/div/div[1]/div[3]/div[1]/div/label/div/div'
      )
      .click();
    await page.waitForTimeout(latency);
    let fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(image_path, "agit_profile.png"));
    await page.waitForTimeout(latency);
    fileChooserPromise = page.waitForEvent("filechooser");
    await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[1]/div/div[2]/div/div[1]/div[3]/div[2]/div/label/div/div/div/label/div'
      )
      .click();
    await page.waitForTimeout(latency);
    fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(image_path, "agit_banner.png"));
    await page.waitForTimeout(latency);
    await page.getByRole("button", { name: "Create" }).click();
    await page.waitForTimeout(latency);
    await page.getByText("confirm").isVisible();
    await page.waitForTimeout(latency);
    await page.getByText("confirm").click();
    await page.waitForTimeout(latency);
    console.log("Agit created successfully");
  });

  //   test("creating a new collection", async ({ page }) => {
  //     await page.getByText("Create", { exact: true }).click();
  //     await page.waitForTimeout(latency);
  //     await page.getByText("Drop a collection", { exact: true }).click();
  //     await page.waitForTimeout(latency);
  //     await page.selectOption("select", agit_name);
  //     await page.waitForTimeout(latency);
  //     await page
  //       .getByPlaceholder("콜렉션 이름 입력", { exact: true })
  //       .fill(collection_name);
  //     await page.waitForTimeout(latency);
  //     await page
  //       .getByPlaceholder("콜렉션 설명 입력", { exact: true })
  //       .fill("Test");
  //     await page.waitForTimeout(latency);
  //     let fileChooserPromise = page.waitForEvent("filechooser");
  //     await page
  //       .locator(
  //         'xpath=//*[@id="main"]/div[1]/div[1]/div/div[2]/div/div[1]/div[3]/div[1]/div/label/div/div/div/label/div'
  //       )
  //       .click();
  //     await page.waitForTimeout(latency);
  //     let fileChooser = await fileChooserPromise;
  //     await fileChooser.setFiles(path.join(image_path, "collection_profile.png"));
  //     fileChooserPromise = page.waitForEvent("filechooser");
  //     await page
  //       .locator(
  //         'xpath=//*[@id="main"]/div[1]/div[1]/div/div[2]/div/div[1]/div[3]/div[2]/div/label/div/div/div/label/div'
  //       )
  //       .click();
  //     await page.waitForTimeout(latency);
  //     fileChooser = await fileChooserPromise;
  //     await fileChooser.setFiles(path.join(image_path, "collection_banner.png"));
  //     await page.getByRole("button", { name: "Create" }).click();
  //     await page.waitForTimeout(latency);
  //     await page.getByText("confirm").isVisible();
  //     await page.waitForTimeout(latency);
  //     await page.getByText("confirm").click();
  //     await page.waitForTimeout(latency);
  //     console.log("Collection created successfully");
  //   });

  //   test("creating a new NFT", async ({ page }) => {
  //     await page.getByText("Create", { exact: true }).click();
  //     await page.waitForTimeout(latency);
  //     await page.getByText("Mint your artwork", { exact: true }).click();
  //     await page.waitForTimeout(latency);
  //     await page.selectOption("select", "Test collection");
  //     await page.waitForTimeout(latency);
  //     await page
  //       .getByPlaceholder("NFT 이름 입력", { exact: true })
  //       .fill("Test Artwork");
  //     await page.waitForTimeout(latency);
  //     await page
  //       .getByPlaceholder("NFT 설명 입력", { exact: true })
  //       .fill("Test Artwork");
  //     await page.waitForTimeout(latency);
  //     let fileChooserPromise = page.waitForEvent("filechooser");
  //     await page
  //       .locator(
  //         'xpath=//*[@id="main"]/div[1]/div[1]/div/div[2]/div/div[1]/div[3]/div/div/label/div/div/div'
  //       )
  //       .click();
  //     await page.waitForTimeout(latency);
  //     let fileChooser = await fileChooserPromise;
  //     await fileChooser.setFiles(path.join(image_path, "nft.png"));
  //     await page.getByRole("button", { name: "Create" }).click();

  //     // NOTE: wait for transaction and fetcher.
  //     await page.waitForTimeout(5000);
  //   });
});
