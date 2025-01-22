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

test.describe("Search", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(latency);
  });

  test("[Search-001] Collection list view", async ({ page }) => {
    await page.getByRole("link", { name: "Collection" }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Search",
        "collection-list-view",
        "1-go-to-collection-list"
      ),
      fullPage: true,
    });
  });

  test("[Search-002] Search an agit", async ({ page }) => {
    await page.getByPlaceholder("Search").click();
    await page.fill('[placeholder="Search"]', "Test Agit - 1730878927");
    await page.waitForTimeout(latency);
    await page.press('[placeholder="Search"]', "Enter");
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Search",
        "Search-an-agit",
        "1-search-an-agit-name"
      ),
      fullPage: true,
    });
    // location to Agit search bar
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[2]/div/div/div[1]/div[1]')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText("Test Agit - 1730878927").first().click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("Search", "Search-an-agit", "2-view-an-agit-page"),
      fullPage: true,
    });
  });

  test("[Search-003] Search a collection", async ({ page }) => {
    await page.getByPlaceholder("Search").click();
    await page.fill('[placeholder="Search"]', "Test Collection - 1730878927");
    await page.waitForTimeout(latency);
    await page.press('[placeholder="Search"]', "Enter");
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Search",
        "Search-a-collection",
        "1-search-a-collection-name"
      ),
      fullPage: true,
    });
    // location to collection search bar
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[2]/div/div/div[1]/div[2]')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText("Test Collection - 1730878927").first().click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Search",
        "Search-a-collection",
        "2-view-a-collection-page"
      ),
      fullPage: true,
    });
  });

  test("[Search-004] Search a NFT", async ({ page }) => {
    await page.getByPlaceholder("Search").click();
    await page.fill('[placeholder="Search"]', "Test NFT - 1730878927");
    await page.waitForTimeout(latency);
    await page.press('[placeholder="Search"]', "Enter");
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("Search", "Search-a-NFT", "1-search-a-NFT-name"),
      fullPage: true,
    });
    // location to NFT search bar
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[2]/div/div/div[1]/div[3]')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText("Test NFT - 1730878927").first().click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("Search", "Search-a-NFT", "2-view-a-NFT-page"),
      fullPage: true,
    });
  });

  test("[Search-005] Can't access the profile page", async ({ page }) => {
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[5]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Search",
        "Can't-access-the-profile-page",
        "1-click-on-profile-icon"
      ),
      fullPage: true,
    });
    await expect(page.locator("body")).toContainText("Connect wallet");
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Search",
        "Can't-access-the-profile-page",
        "2-view-google-login-popup"
      ),
      fullPage: true,
    });
  });

  test("[Search-006] Invisible Create button of main page", async ({
    page,
  }) => {
    await expect(
      page.locator(
        'xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[1]/div[2]/div'
      )
    ).not.toBeVisible();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Search",
        "Invisible-Create-button-of-main-page",
        "1-invisible-create-button"
      ),
      fullPage: true,
    });
  });

  test("[Search-007] View collection list of Agit", async ({ page }) => {
    await page.getByPlaceholder("Search").click();
    await page.fill('[placeholder="Search"]', "Test Agit - 1730878927");
    await page.waitForTimeout(latency);
    await page.press('[placeholder="Search"]', "Enter");
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Search",
        "View-collection-list-of-Agit",
        "1-search-an-agit-name"
      ),
      fullPage: true,
    });
    // location to Agit search bar
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[2]/div/div/div[1]/div[1]')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText("Test Agit - 1730878927").first().click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Search",
        "View-collection-list-of-Agit",
        "2-view-agit-page"
      ),
      fullPage: true,
    });
  });

  test("[Search-008] View DAO list of Agit", async ({ page }) => {
    await page.getByPlaceholder("Search").click();
    await page.fill('[placeholder="Search"]', "Test Agit - 1730878927");
    await page.waitForTimeout(latency);
    await page.press('[placeholder="Search"]', "Enter");
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Search",
        "View-DAO-list-of-Agit",
        "1-search-an-agit-name"
      ),
      fullPage: true,
    });
    // location to Agit search bar
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[2]/div/div/div[1]/div[1]')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText("Test Agit - 1730878927").first().click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Search",
        "View-DAO-list-of-Agit",
        "2-view-agit-page"
      ),
      fullPage: true,
    });
    await page.getByText("DAO").click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Search",
        "View-DAO-list-of-Agit",
        "3-view-DAO-page"
      ),
      fullPage: true,
    });
  });

  test("[Search-009] Invisible proposal create button of DAO page", async ({
    page,
  }) => {
    await page.getByPlaceholder("Search").click();
    await page.fill('[placeholder="Search"]', "Test Agit - 1730878927");
    await page.waitForTimeout(latency);
    await page.press('[placeholder="Search"]', "Enter");
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Search",
        "Invisible-proposal-create-button-of-DAO-page",
        "1-search-an-agit-name"
      ),
      fullPage: true,
    });
    // location to Agit search bar
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[2]/div/div/div[1]/div[1]')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText("incheon universe agit").first().click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Search",
        "Invisible-proposal-create-button-of-DAO-page",
        "2-view-agit-page"
      ),
      fullPage: true,
    });
    await page.getByText("DAO").click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Search",
        "Invisible-proposal-create-button-of-DAO-page",
        "3-view-DAO-page"
      ),
      fullPage: true,
    });
    await expect(page.getByText("Create Proposal")).not.toBeVisible();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Search",
        "Invisible-proposal-create-button-of-DAO-page",
        "4-invisible-proposal-create-button"
      ),
      fullPage: true,
    });
  });
});
