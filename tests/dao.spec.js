import { test, expect } from "@playwright/test";
import {
  image_path,
  latency,
  agit_name,
  collection_name,
  nft_name,
} from "./constants";
import path from "path";


test.describe("testing", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(latency);
  });

  // test.describe("Create a proposal", () => {
    test("make a proposal", async ({ page }) => {
      await page
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
      await page.getByText("My Agit", { exact: true }).click();
      await page.waitForTimeout(latency);
      await page
        .locator('xpath=//*[@id="main"]/div[1]/div[4]/div[3]/div[3]/div[1]')
        .click();
      await page.waitForTimeout(latency);
    await page.getByText("DAO", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.getByText("Create Proposal", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page
      .getByPlaceholder("제목을 입력해주세요.", { exact: true })
      .fill("DAO 테스트");
    await page.waitForTimeout(latency);
    await page
      .getByPlaceholder("종료 일자를 입력해주세요.(YY.MM.DD)", {
        exact: true,
      })
      .fill("24.11.11");
    await page.waitForTimeout(latency);
    await page
      .getByPlaceholder("내용을 입력해주세요.", { exact: true })
      .fill("테스트");
    await page.waitForTimeout(latency);
    let fileChooserPromise = page.waitForEvent("filechooser");
    let element = await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[4]/div/div[1]/div/div/div[3]/label'
      )
      .click();
    await page.waitForTimeout(latency);
    let fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(image_path, "agit_profile.png"));
    await page.waitForTimeout(latency);
    await page.getByText("등록", { exact: true }).click();
    await page.waitForTimeout(latency);
  });

  test("check a proposal list", async ({ page }) => {
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText("My Agit", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.getByText("test", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.getByText("DAO", { exact: true }).click();
    await page.waitForTimeout(latency);
  });

test("vote to proposal", async ({ page }) => {
  await page
    .locator('xpath=//*[@id="main"]/div[1]/div[4]/div/div[4]/div')
    .click();
  await page.waitForTimeout(latency);
  await page.getByText("추천", { exact: true }).click();
  await page.waitForTimeout(latency);
});

test("make comment to proposal", async ({ page }) => {
  await page
    .locator('xpath=//*[@id="main"]/div[1]/div[4]/div/div[4]/div')
    .click();
  await page.waitForTimeout(latency);
  await page
  .getByPlaceholder("댓글을 남겨주세요.", { exact: true })
  .press('input[name="Proposal 테스트"]', 'Enter');
await page.waitForTimeout(latency);
});

test("make comment in proposal", async ({ page }) => {
  await page
    .locator('xpath=//*[@id="main"]/div[1]/div[4]/div/div[4]/div')
    .click();
  await page.waitForTimeout(latency);
  await page
  .getByPlaceholder("댓글을 남겨주세요.", { exact: true })
  .press('input[name="Proposal 테스트"]', 'Enter');
await page.waitForTimeout(latency);
});

test("click a like to proposal", async ({ page }) => {
  await page
    .locator('xpath=//*[@id="main"]/div[1]/div[4]/div/div[4]/div')
    .click();
  await page.waitForTimeout(latency);
  await page
    .locator('xpath=//*[@id="main"]/div[1]/div[4]/div/div[5]/div[1]/svg/path')
    .click();
await page.waitForTimeout(latency);
});
});