// class screenshotpage {
//   constructor(page) {
//     this.page = page;
//     this.usernameInput = 'input[name="username"]';
//     this.passwordInput = 'input[name="password"]';
//     this.loginButton = 'button[type="submit"]';
//   }
//   async login(username, password) {
//     await this.page.fill(this.usernameInput, username);
//     await this.page.fill(this.passwordInput, password);
//     await this.page.click(this.loginButton);
//   }
// }

// module.exports = screenshotpage;

// //

// await page.screenshot({
//   path: screenshot_path("agit", "go-to-agit-list", "1-go-to-search-bar"),
//   fullPage: true,
// });
// await page.getByText("My Agit", { exact: true }).click();
// await page.waitForTimeout(latency);
// await page.screenshot({
//   path: screenshot_path("agit", "go-to-agit-list", "2-agit-list"),
//   fullPage: true,
// });

// export const screenshot_path = (spec, scenario, name) =>
//   path.join(__dirname, `../screenshots/${spec}-spec/${scenario}/${name}.png`);

//Agit page

class agit_test_page {
  constructor(page) {
    this.page = page;
    this.usernameInput = 'input[name="username"]';
    this.passwordInput = 'input[name="password"]';
    this.loginButton = 'button[type="submit"]';
  }
}
