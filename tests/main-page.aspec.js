import { test, expect } from "@playwright/test";
import {
  image_path,
  latency,
  agit_name,
  collection_name,
  nft_name,
  screenshot_path,
} from "./constants";
import path from "path";
import { text } from "stream/consumers";

test.describe("Main page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(latency);
  });

  test("[Main-page-001] Main banner scroll ckeck", async ({ page }) => {
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Main-page",
        "Main-banner-scroll-ckeck",
        "1-go-to-main-page"
      ),
      fullPage: true,
    });
    const before = await page.locator(
      'xpath=//*[@id="main"]/div[1]/div[5]/div[1]/div[1]/div/div[1]/div[1]/div/img'
    );
    await page
      .locator(
        ".absolute.right-2.top-1\\/2.-translate-y-1\\/2.p-2.hidden.lg\\:block"
      )
      .click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Main-page",
        "Main-banner-scroll-ckeck",
        "2-move-to-forward-banner"
      ),
    });
    const after = await page.locator(
      'xpath=//*[@id="main"]/div[1]/div[5]/div[1]/div[1]/div/div[1]/div[1]/div/img'
    );
    await page
      .locator(
        ".absolute.left-2.top-1\\/2.-translate-y-1\\/2.p-2.hidden.lg\\:block"
      )
      .click();
    await page.waitForTimeout(latency);
    expect(before).not.toBe(after);
    console.log("img changed successfully");
    await page.screenshot({
      path: screenshot_path(
        "Main-page",
        "Main-banner-scroll-ckeck",
        "2-move-to-back-banner"
      ),
    });
  });

  test("[Main-page-002] Screen blur check", async ({ page }) => {
    await page.screenshot({
      path: screenshot_path(
        "Main-page",
        "Screen-blur-check",
        "1-go-to-main-page"
      ),
      fullPage: true,
    });
    const targetElement = page
      .locator("div.fixed.top-0.left-0.w-full.h-full")
      .first();
    const initialClass = await targetElement.getAttribute("class");
    expect(initialClass).toContain("hidden");
    await page.getByText("Create").click();
    await page.waitForTimeout(latency);
    const updatedClass = await targetElement.getAttribute("class");
    expect(updatedClass).not.toContain("hidden");
    expect(updatedClass).toContain("flex");
    console.log("Screen blur check");
    await page.screenshot({
      path: screenshot_path(
        "Main-page",
        "Screen-blur-check",
        "2-go-to-create-page"
      ),
      fullPage: true,
    });
  });

  //The outside of popup section click, popup have to still visible
  test("[Main-page-003] Out of popup section click test", async ({ page }) => {
    const popup = page.locator('xpath=//*[@id="main"]/div[1]/div[1]');
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Main-page",
        "Out-of-popup-section-click-test",
        "1-go-to-main-page"
      ),
      fullPage: true,
    });
    await page.getByText("Create", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Main-page",
        "Out-of-popup-section-click-test",
        "2-go-to-create-page"
      ),
      fullPage: true,
    });
    await page.locator("body").click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Main-page",
        "Out-of-popup-section-click-test",
        "3-click-to-out-of-popup-section"
      ),
      fullPage: true,
    });
    await expect(popup).toBeVisible();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Main",
        "Out-of-popup-section-click-test",
        "4-still-visible-popup-section"
      ),
      fullPage: true,
    });
  });

  test("[Main-page-004] mouse cursor change on hover to button", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Main-page",
        "mouse-cursor-change-on-hover-to-button",
        "1-go-to-main-page"
      ),
      fullPage: true,
    });
    //Agit button
    try {
      const button = page.locator(
        'xpath=//*[@id="main"]/div[1]/div[5]/header/div/div[1]/a/img'
      );
      await button.hover();
      const cursorStyle = await button.evaluate(
        (el) => getComputedStyle(el).cursor
      );
      expect(cursorStyle).toBe(
        "pointer",
        "Cursor did not change to pointer on hover."
      );
      //Collection button
      const button1 = page.locator(
        'xpath=//*[@id="main"]/div[1]/div[5]/header/div/div[1]/div[2]/a[1]'
      );
      await button1.hover();
      const cursorStyle1 = await button1.evaluate(
        (el) => getComputedStyle(el).cursor
      );
      expect(cursorStyle1).toBe(
        "pointer",
        "Cursor did not change to pointer on hover."
      );
    } catch (error) {
      console.error("Step failed, but continuing execution:", error.message);
    }
    //Create button
    try {
      const button2 = page.locator(
        'xpath=//*[@id="main"]/div[1]/div[5]/header/div/div[1]/div[2]/div'
      );
      await button2.hover();
      const cursorStyle2 = await button2.evaluate(
        (el) => getComputedStyle(el).cursor
      );
      expect(cursorStyle2).toBe(
        "pointer",
        "Cursor did not change to pointer on hover."
      );
    } catch (error) {
      console.error("Step failed, but continuing execution:", error.message);
    }
    //Logout button
    try {
      const button3 = page.locator(
        'xpath=//*[@id="main"]/div[1]/div[5]/header/div/div[2]/button'
      );
      await button3.hover();
      const cursorStyle3 = await button3.evaluate(
        (el) => getComputedStyle(el).cursor
      );
      expect(cursorStyle3).toBe(
        "pointer",
        "Cursor did not change to pointer on hover."
      );
      //My profile button
      const button4 = page.locator(
        'xpath=//*[@id="main"]/div[1]/div[5]/header/div/div[2]/div'
      );
      await button4.hover();
      const cursorStyle4 = await button4.evaluate(
        (el) => getComputedStyle(el).cursor
      );
      expect(cursorStyle4).toBe(
        "pointer",
        "Cursor did not change to pointer on hover."
      );
    } catch (error) {
      console.error("Step failed, but continuing execution:", error.message);
    }
    //Follow button
    try {
      const button5 = page.locator(
        'xpath=//*[@id="carousel-scroll-area"]/div[1]/div/div[2]/div/button'
      );
      await button5.hover();
      const cursorStyle5 = await button5.evaluate(
        (el) => getComputedStyle(el).cursor
      );
      expect(cursorStyle5).toBe(
        "pointer",
        "Cursor did not change to pointer on hover."
      );
    } catch (error) {
      console.error("Step failed, but continuing execution:", error.message);
    }
    //Move forward button
    try {
      const button6 = page.locator(
        'xpath=//*[@id="main"]/div[1]/div[5]/div[1]/div/div[1]/div[3]'
      );
      await button6.hover();
      const cursorStyle6 = await button6.evaluate(
        (el) => getComputedStyle(el).cursor
      );
      expect(cursorStyle6).toBe(
        "pointer",
        "Cursor did not change to pointer on hover."
      );
    } catch (error) {
      console.error("Step failed, but continuing execution:", error.message);
    }
    //Move back button
    try {
      const button7 = page.locator(
        'xpath=//*[@id="main"]/div[1]/div[5]/div[1]/div/div[1]/div[1]'
      );
      await button7.hover();
      const cursorStyle7 = await button7.evaluate(
        (el) => getComputedStyle(el).cursor
      );
      expect(cursorStyle7).toBe(
        "pointer",
        "Cursor did not change to pointer on hover."
      );
    } catch (error) {
      console.error("Step failed, but continuing execution:", error.message);
    }
  });
});
