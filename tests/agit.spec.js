import { test, expect } from "@playwright/test";
import {
  image_path,
  latency,
  agit_name,
  collection_name,
  nft_name,
  screenshot_path,
  longlatency,
  DAO_name,
  agit_test_page,
  colletion_test_page,
  artwork_test_page,
} from "./constants";
import path from "path";

test.describe.serial("Agit", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(latency);
  });

  test("[AGIT-001] Agit list view", async ({ page }) => {
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[5]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("agit", "go-to-agit-list", "1-go-to-search-bar"),
      fullPage: true,
    });
    await page.getByText("My Agit", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("agit", "go-to-agit-list", "2-agit-list"),
      fullPage: true,
    });
  });

  test("[AGIT-002] Make a proposal", async ({ page }) => {
    await page.goto(agit_test_page); //Test Agit URL
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("agit", "make-a-proposal", "1-go-to-agit"),
      fullPage: true,
    });
    // await page.getByText("My Agit", { exact: true }).click();
    // await page.waitForTimeout(latency);
    // await page.getByText(agit_name, { exact: true }).click();
    // await page.waitForTimeout(latency);
    // await page.screenshot({
    //   path: screenshot_path("agit", "make-a-proposal", "2-select-agit"),
    //   fullPage: true,
    // });
    await page.getByText("DAO", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("agit", "make-a-proposal", "2-go-to-DAO-page"),
      fullPage: true,
    });
    await page.getByText("Create Proposal", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page
      .getByPlaceholder("제목을 입력해주세요.", { exact: true })
      .fill(DAO_name);
    await page.waitForTimeout(latency);
    let date = new Date();
    date.setDate(date.getDate() + 7);
    let year = date.getFullYear();
    year = String(year);
    let yy = year.substring(2, 4);
    let month = new String(date.getMonth() + 1);
    let day = new String(date.getDate());
    if (month.length == 1) {
      month = "0" + month;
    }
    if (day.length == 1) {
      day = "0" + day;
    }
    let str = yy + "." + month + "." + day;
    await page
      .getByPlaceholder("종료 일자를 입력해주세요.(YY.MM.DD)", {
        exact: true,
      })
      .fill(str);
    await page.waitForTimeout(latency);
    await page
      .getByPlaceholder("내용을 입력해주세요.", { exact: true })
      .fill("Test");
    await page.waitForTimeout(latency);
    let fileChooserPromise = page.waitForEvent("filechooser");
    let element = await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[5]/div[1]/div[1]/div/div/div[3]/label'
      )
      .click();
    await page.waitForTimeout(latency);
    let fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(image_path, "bumy.png"));
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("agit", "make-a-proposal", "3-fill-proposal-form"),
      fullPage: true,
    });
    await page.getByText("등록", { exact: true }).click();
    await page.waitForLoadState();
    await page.screenshot({
      path: screenshot_path("agit", "make-a-proposal", "4-proposal-success"),
      fullPage: true,
    });
    await page.goto(agit_test_page);
    // await page
    //   .locator('xpath=//*[@id="main"]/div[1]/div[4]/div/div[2]/div[3]/div')
    //   .click();
    // await page.waitForTimeout(latency);
    // await page
    //   .locator('xpath=//*[@id="main"]/div[1]/div[5]/header/div/div[2]/div')
    //   .click();
    // await page.waitForTimeout(latency);
    // await page.getByText("My Agit", { exact: true }).click();
    // await page.waitForTimeout(latency);
    // await page.getByText(agit_name, { exact: true }).click();
    // await page.waitForTimeout(latency);
    await page.getByText("DAO", { exact: true }).click();
    await page.waitForTimeout(latency);
    const Test_text = page.getByText(DAO_name, { exact: true }).first();
    await expect(Test_text).toBeVisible();
    console.log("DAO_name is visible on the page");
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("agit", "make-a-proposal", "5-proposal-created"),
      fullPage: true,
    });
  });

  test("[AGIT-003] Check a proposal list", async ({ page }) => {
    // await page
    //   .locator('xpath=//*[@id="main"]/div[1]/div[5]/header/div/div[2]/div')
    //   .click();
    // await page.waitForTimeout(latency);
    // await page.getByText("My Agit", { exact: true }).click();
    // await page.waitForTimeout(latency);
    // await page.getByText(agit_name, { exact: true }).click();
    await page.goto(agit_test_page);
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("agit", "check-a-proposal list", "1-go-to-DAO"),
      fullPage: true,
    });
    await page.getByText("DAO", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "check-a-proposal list",
        "2-go-to-proposal-list"
      ),
      fullPage: true,
    });
  });

  test("[AGIT-004] Proposal voting", async ({ page }) => {
    // await page
    //   .locator('xpath=//*[@id="main"]/div[1]/div[5]/header/div/div[2]/div')
    //   .click();
    // await page.waitForTimeout(latency);
    // await page.getByText("My Agit", { exact: true }).click();
    // await page.waitForTimeout(latency);
    // await page.getByText(agit_name, { exact: true }).click();
    // await page.waitForTimeout(latency);
    await page.goto(agit_test_page);
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("agit", "proposal-voting", "1-go-to-agit"),
      fullPage: true,
    });
    await page.getByText("DAO", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("agit", "proposal-voting", "2-go-to-proposal-list"),
      fullPage: true,
    });
    await page.getByText(DAO_name, { exact: true }).last().click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "proposal-voting",
        "3-go-to-proposal-detail"
      ),
      fullPage: true,
    });
    await page.getByText("추천", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("agit", "proposal-voting", "4-click-yes-button"),
      fullPage: true,
    });
    const numberElement = page.locator(
      'xpath=//*[@id="main"]/div[1]/div[5]/div[1]/div[4]/div[1]/p[2]/span'
    );
    const initialValue = await numberElement.textContent();
    await page.getByText("투표하기", { exact: true }).click();
    await page.waitForLoadState();
    await page.getByText("confirm").click();
    await page.waitForLoadState();
    const updatedValue = await numberElement.textContent();
    expect(initialValue.trim()).not.toBe(updatedValue.trim());
    console.log("Voting number successfully changed.");
    await page.screenshot({
      path: screenshot_path("agit", "proposal-voting", "5-vote-success"),
      fullPage: true,
    });
  });

  test("[AGIT-005] Make comment in proposal", async ({ page }) => {
    // await page
    //   .locator('xpath=//*[@id="main"]/div[1]/div[5]/header/div/div[2]/div')
    //   .click();
    // await page.waitForTimeout(latency);
    // await page.getByText("My Agit", { exact: true }).click();
    // await page.waitForTimeout(latency);
    // await page.getByText(agit_name, { exact: true }).click();
    // await page.waitForTimeout(latency);
    await page.goto(agit_test_page);
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("agit", "make-comment-in-proposal", "1-go-to-agit"),
      fullPage: true,
    });
    await page.getByText("DAO", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "make-comment-in-proposal",
        "2-go-to-proposal-list"
      ),
      fullPage: true,
    });
    await page.getByText(DAO_name, { exact: true }).last().click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "make-comment-in-proposal",
        "3-go-to-proposal-detail"
      ),
      fullPage: true,
    });
    await page
      .locator('textarea[placeholder="댓글을 남겨주세요."]')
      .fill("Comment test");
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "make-comment-in-proposal",
        "4-write-comment"
      ),
      fullPage: true,
    });
    await page.press('textarea[placeholder="댓글을 남겨주세요."]', "Enter");
    await page.waitForTimeout(longlatency);
    await page.getByText("confirm").click();
    await page.waitForLoadState();
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "make-comment-in-proposal",
        "5-success-comment"
      ),
      fullPage: true,
    });
    const comment_text = page.getByText("Comment test");
    await expect(comment_text).toBeVisible();
  });

  test("[AGIT-006] Click a like to proposal", async ({ page }) => {
    // await page
    //   .locator('xpath=//*[@id="main"]/div[1]/div[5]/header/div/div[2]/div')
    //   .click();
    // await page.waitForTimeout(latency);
    // await page.getByText("My Agit", { exact: true }).click();
    // await page.waitForTimeout(latency);
    // await page.getByText(agit_name, { exact: true }).click();
    // await page.waitForTimeout(latency);
    await page.goto(agit_test_page);
    await page.screenshot({
      path: screenshot_path("agit", "click-a-like-to-proposal", "1-go-to-agit"),
      fullPage: true,
    });
    await page.getByText("DAO", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "click-a-like-to-proposal",
        "2-go-to-proposal-list"
      ),
      fullPage: true,
    });
    await page.getByText(DAO_name).last().click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "click-a-like-to-proposal",
        "3-go-to-proposal-detail"
      ),
      fullPage: true,
    });
    const image_status = page.locator(
      '//*[@id="main"]/div[1]/div[5]/div[1]/div[5]/div[1]/svg'
    );
    await page.locator("svg.fill-gray-600").click();
    await page.waitForTimeout(longlatency);
    await page.getByText("confirm").click();
    await page.waitForLoadState();
    await page.locator("fill-primary").isVisible();
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "click-a-like-to-proposal",
        "4-success-click-like-button"
      ),
      fullPage: true,
    });
  });

  test("[AGIT-007] Follow a agit", async ({ page }) => {
    // await page
    //   .locator('xpath=//*[@id="main"]/div[1]/div[5]/header/div/div[2]/div')
    //   .click();
    // await page.waitForTimeout(latency);
    // await page.getByText("My Agit", { exact: true }).click();
    // await page.waitForTimeout(latency);
    // await page.screenshot({
    //   path: screenshot_path("agit", "follow-a-agit", "1-go-to-agit-list"),
    //   fullPage: true,
    // });
    // await page.getByText(agit_name, { exact: true }).click();
    // await page.waitForTimeout(latency);
    // await page.screenshot({
    //   path: screenshot_path("agit", "follow-a-agit", "2-go-to-agit"),
    //   fullPage: true,
    // });
    await page.goto(agit_test_page);
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("agit", "follow-a-agit", "1-go-to-agit"),
      fullPage: true,
    });
    await page.getByRole("button", { name: "Follow" }).click();
    await page.waitForTimeout(longlatency);
    await page.getByText("Followed").toBeVisible();
    await page.screenshot({
      path: screenshot_path("agit", "follow-a-agit", "3-click-follow-button"),
      fullPage: true,
    });
  });

  test("[AGIT-008] Proposal comment time stamp check", async ({ page }) => {
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[5]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText("My Agit", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "Proposal-comment-time-stamp-check",
        "1-go-to-agit-list"
      ),
      fullPage: true,
    });
    await page.getByText(agit_name, { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "Proposal-comment-time-stamp-check",
        "2-go-to-agit"
      ),
      fullPage: true,
    });
    await page.getByText("DAO", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "Proposal-comment-time-stamp-check",
        "3-go-to-proposal-list"
      ),
      fullPage: true,
    });
    await page.getByText("DAO 테스트", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "Proposal-comment-time-stamp-check",
        "4-go-to-proposal-detail-page"
      ),
      fullPage: true,
    });
    await page
      .locator('textarea[placeholder="댓글을 남겨주세요."]')
      .fill("test");
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "Proposal-comment-time-stamp-check",
        "5-write-comment"
      ),
      fullPage: true,
    });
    await page.press('textarea[placeholder="댓글을 남겨주세요."]', "Enter");
    await page.waitForTimeout(longlatency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "Proposal-comment-time-stamp-check",
        "6-check-time-stamp"
      ),
      fullPage: true,
    });
  });

  test("[AGIT-009] Proposal voting result check", async ({ page }) => {
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[5]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText("My Agit", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "Proposal-voting-result-check",
        "1-go-to-agit-list"
      ),
      fullPage: true,
    });
    await page.getByText("Test Agit - 1730880533", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "Proposal-voting-result-check",
        "2-go-to-agit"
      ),
      fullPage: true,
    });
    await page.getByText("DAO", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "Proposal-voting-result-check",
        "3-go-to-proposal-list"
      ),
      fullPage: true,
    });
    await page.getByText("DAO 테스트", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "Proposal-voting-result-check",
        "4-go-to-proposal-detail-page"
      ),
      fullPage: true,
    });
    const percentageLocator = page.locator("span.z-[1].text-right", {
      hasText: /([1-9]?[0-9]|100)%/,
    });
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "Proposal-voting-result-check",
        "5-proposal-voting-check"
      ),
      fullPage: true,
    });
  });

  //This test for the dates are written wrong and after fixed rightly, the create function will process rightly.
  test("[AGIT-010] Proposal create function test", async ({ page }) => {
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[5]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "Proposal-create-function-test",
        "1-go-to-search-bar"
      ),
      fullPage: true,
    });
    await page.getByText("My Agit", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.getByText("Test Agit - 1733150290", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "Proposal-create-function-test",
        "2-select-agit"
      ),
      fullPage: true,
    });
    await page.getByText("DAO", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "Proposal-create-function-test",
        "3-go-to-DAO"
      ),
      fullPage: true,
    });
    await page.getByText("Create Proposal", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page
      .getByPlaceholder("제목을 입력해주세요.", { exact: true })
      .fill("Create function test");
    await page.waitForTimeout(latency);
    let date = new Date();
    date.setDate(date.getDate());
    let year = date.getFullYear();
    year = String(year);
    let yy = year.substring(2, 4);
    let month = new String(date.getMonth());
    let day = new String(date.getDate());
    if (month.length == 1) {
      month = "0" + month;
    }
    if (day.length == 1) {
      day = "0" + day;
    }
    let str = yy + "." + month + "." + day;
    await page
      .getByPlaceholder("종료 일자를 입력해주세요.(YY.MM.DD)", {
        exact: true,
      })
      .fill(str);
    await page.waitForTimeout(latency);
    await page
      .getByPlaceholder("내용을 입력해주세요.", { exact: true })
      .fill("Test");
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "Proposal-create-function-test",
        "4-fill-wrong-date-in-a-proposal"
      ),
      fullPage: true,
    });
    await page.getByText("등록", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "Proposal-create-function-test",
        "5-proposal-create-failed"
      ),
      fullPage: true,
    });
    await page.waitForTimeout(latency);
    let date1 = new Date();
    date1.setDate(date.getDate());
    let year1 = date.getFullYear();
    year1 = String(year);
    let yy1 = year.substring(2, 4);
    let month1 = new String(date.getMonth() + 1);
    let day1 = new String(date.getDate() + 7);
    if (month.length == 1) {
      month = "0" + month;
    }
    if (day.length == 1) {
      day = "0" + day;
    }
    let str1 = yy1 + "." + month1 + "." + day1;
    await page
      .getByPlaceholder("종료 일자를 입력해주세요.(YY.MM.DD)", {
        exact: true,
      })
      .clear(str);
    await page.waitForTimeout(latency);
    await page
      .getByPlaceholder("종료 일자를 입력해주세요.(YY.MM.DD)", {
        exact: true,
      })
      .fill(str1);
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "Proposal-create-function-test",
        "6-fill-proposal-date-rightly"
      ),
      fullPage: true,
    });
    await page.getByText("등록", { exact: true }).click();
    await page.waitForTimeout(longlatency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "Proposal-create-function-test",
        "7-proposal-create-success"
      ),
      fullPage: true,
    });
  });

  test("[AGIT-011] date-input-form-test-in-DAO-creation", async ({ page }) => {
    await page.goto(
      "https://dev.dagit.club/ko/agit/59ba4575-9709-45ac-a131-e36cb46e2731"
    );
    await page.waitForLoadState();
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "date-input-form-test-in-DAO-creation",
        "1-go-to-agit-page"
      ),
      fullPage: true,
    });
    await page.getByText("DAO", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "date-input-form-test-in-DAO-creation",
        "2-go-to-DAO-page"
      ),
      fullPage: true,
    });
    await page.getByText("Create Proposal", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[5]/div[1]/div[1]/div/div/div[2]/input[1]'
      )
      .fill("DAO test");
    await page.waitForTimeout(latency);
    let date = new Date();
    date.setDate(date.getDate() + 7);

    let yyyy = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    let str = `${yyyy}.${month}.${day}`;
    await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[5]/div[1]/div[1]/div/div/div[2]/input[2]'
      )
      .fill(str);
    await page.waitForTimeout(latency);
    await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[5]/div[1]/div[1]/div/div/div[2]/textarea'
      )
      .fill("test");
    await page.waitForTimeout(latency);
    let fileChooserPromise = page.waitForEvent("filechooser");
    let element = await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[5]/div[1]/div[1]/div/div/div[3]/label'
      )
      .click();
    await page.waitForTimeout(latency);
    let fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(image_path, "agit_profile.png"));
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "date-input-form-test-in-DAO-creation",
        "3-fill-the-information-with-wrong-format-date-data"
      ),
      fullPage: true,
    });
    await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[5]/div[1]/div[1]/div/div/div[1]/div[2]'
      )
      .click();
    await page.waitForTimeout(latency);
    const element1 = page.locator(
      'xpath=//*[@id="main"]/div[1]/div[5]/div[1]/div[1]/div/div/div[1]/div[2]'
    );
    await expect(element1).toBeVisible();
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "date-input-form-test-in-DAO-creation",
        "6-check-the-proposal-creation-failed"
      ),
      fullPage: true,
    });
  });
});
