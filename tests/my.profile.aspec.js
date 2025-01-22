import { test, expect } from "@playwright/test";
import {
  image_path,
  latency,
  agit_name,
  collection_name,
  nft_name,
  screenshot_path,
  my_profile,
} from "./constants";
import path from "path";

test.describe("My profile", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(latency);
  });

  test("[My profile-001] Edit a profile", async ({ page }) => {
    await page.goto(my_profile);
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "My profile",
        "edit-a-profile",
        "1-go-to-my-profile"
      ),
      fullPage: true,
    });
    await page.getByText("Edit Profile", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "My profile",
        "edit-a-profile",
        "2-go-to-edit-profile"
      ),
      fullPage: true,
    });
    let fileChooserPromise = page.waitForEvent("filechooser");
    let element = await page
      .locator('xpath=//*[@id="main"]/div[1]/div[5]/div[2]/div/div[2]/label')
      .click();
    await page.waitForTimeout(latency);
    let fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(image_path, "agit_profile.png"));
    await page.waitForTimeout(latency);
    await page
      .getByPlaceholder("Enter a name", {
        exact: true,
      })
      .fill("Test name");
    await page.waitForTimeout(latency);
    await page
      .getByPlaceholder("Enter a description", {
        exact: true,
      })
      .fill("d.AGIT Test");
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "My profile",
        "edit-a-profile",
        "3-fill-in-profile-info"
      ),
      fullPage: true,
    });
    await page.getByText("완료", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("My profile", "edit a profile", "4-check-complete"),
      fullPage: true,
    });
  });

  test("[My profile-002] Check a Creative credit", async ({ page }) => {
    await page.goto(my_profile);
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "My profile",
        "check-a-creative-credit",
        "1-check-creative-credit"
      ),
      fullPage: true,
    });
  });

  test("[My profile-003] Check a creative credit earnings", async ({
    page,
  }) => {
    await page.goto(my_profile);
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "My profile",
        "check-a-creative-credit",
        "1-go-to-my-profile"
      ),
      fullPage: true,
    });
    await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[5]/div[3]/div[1]/div[2]/div[2]/button[2]'
      )
      .click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "My profile",
        "check-a-creative-credit",
        "2-go-to-cc-history"
      ),
      fullPage: true,
    });
    await page.getByText("Earnings", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "My profile",
        "check-a-creative-credit",
        "3-check-earnings-history"
      ),
      fullPage: true,
    });
  });

  test("[My profile-004] Check a creative credit activity", async ({
    page,
  }) => {
    await page.goto(my_profile);
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "My profile",
        "check-a-creative-credit-activity",
        "1-go-to-my-profile"
      ),
      fullPage: true,
    });
    await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[5]/div[3]/div[1]/div[2]/div[2]/button[2]'
      )
      .click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "My profile",
        "check-a-creative-credit-activity",
        "2-go-to-cc-history"
      ),
      fullPage: true,
    });
    await page.getByText("Activity", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "My profile",
        "check-a-creative-credit-activity",
        "3-go-to-cc-activity"
      ),
      fullPage: true,
    });
  });

  test("[My profile-005] Created nft list view", async ({ page }) => {
    await page.goto(my_profile);
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "My profile",
        "shows-a-created-nft-list",
        "1-go-to-my-profile"
      ),
      fullPage: true,
    });
  });

  test("[My profile-006] Created agit list view", async ({ page }) => {
    await page.goto(my_profile);
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "My profile",
        "go-to-created-agit-list",
        "1-go-to-my-profile"
      ),
      fullPage: true,
    });
    await page.getByText("My Agit", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "My profile",
        "go-to-created-agit-list",
        "2-go-to-my-agit"
      ),
      fullPage: true,
    });
  });
  test("[My profile-007] Check if CC matches actual data", async ({ page }) => {
    await page.goto(my_profile);
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "My profile",
        "Check-if-CC-matches-actual-data",
        "1-go-to-my-profile"
      ),
      fullPage: true,
    });
    const targetElement = await page.locator(
      "div.flex.gap-2.text-black.w-full.justify-center.items-center"
    );
    await page.waitForTimeout(latency);
    const textContent = await targetElement.innerText();
    const CC = parseInt(textContent.replace(/\D/g, ""), 10);
    console.log(`Extracted Number: ${CC}`);
    await page.screenshot({
      path: screenshot_path(
        "My profile",
        "Check-if-CC-matches-actual-data",
        "2-Check-the-CC"
      ),
      fullPage: true,
    });
    await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[5]/div[3]/div[1]/div[2]/div[2]/button[2]'
      )
      .click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "My profile",
        "Check-if-CC-matches-actual-data",
        "3-Check-the-history-of-CC"
      ),
      fullPage: true,
    });
    await page.waitForTimeout(latency);
    const childDivs = page.locator(
      "div.py-2.lg\\:py-4.flex.flex-col.border-b-\\[1px\\] p.text-\\[\\#707070\\].font-semibold.text-lg"
    );
    const divCount = await childDivs.count();
    console.log(`Number of child divs: ${divCount}`);
    let total = 0;
    for (let i = 0; i < divCount; i++) {
      const textContent = await childDivs.nth(i).innerText();
      const numbers = textContent.match(/[-+]?\d+/g);
      if (numbers) {
        for (const num of numbers) {
          total += parseInt(num, 10);
        }
      }
    }
    console.log(`Total Sum of Numbers: ${total}`);
    expect(total).toBe(CC);
    await page.screenshot({
      path: screenshot_path(
        "My profile",
        "Check-if-CC-matches-actual-data",
        "4-CC-matches"
      ),
      fullPage: true,
    });
  });
});
