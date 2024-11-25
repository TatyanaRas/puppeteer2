const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} = require("cucumber");
const { clickElement, getText } = require("../../lib/commands.js");
const {
  selectDateTime,
  cheque,
  checkSeatIsTaken,
} = require("../../lib/util.js");
setDefaultTimeout(60 * 1000);

//let ticketTomorrow = "a.page-nav__day:nth-child(2)"; //выбор билетов на завтра
//let ticket4days = "a.page-nav__day:nth-child(4)"; //выбор билетов через 4 дня
let movieTime = "[data-seance-id='198']"; //выбор фильма "Микки маус, начало сеанса: 11:00"

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`${string}`, {
    setTimeout: 60000,
  });
});
//выбираем 2 день
When("user select 2-th day and movie", async function () {
  await selectDateTime(this.page, "a.page-nav__day:nth-child(2)", movieTime);
});

When("the user selects 1 rows and 10 seat", async function () {
  await cheque(this.page, ".buying-scheme__row(1)", "span:nth-child(10)");
});

//выбираем 4 день

When("user select 4-th day and movie", async function () {
  await selectDateTime(this.page, "a.page-nav__day:nth-child(4)", movieTime);
});

When("the user selects rows and seat", async function () {
  await checkSeatIsTaken(
    this.page,
    ".buying-scheme__row(1)",
    "span:nth-child(10)"
  );
});

// 2 день забронированные места выбираем
When(
  "sees that 1 row and 3 seat is taken trying select them",
  async function () {
    await checkSeatIsTaken(
      this.page, ".buying-scheme__row(1)", "span:nth-child(3)"
    );
  }
);

// нажимаем забронировать
/*When("user click button", async function () {
  await clickElement(this.page, 'button.acceptin-button');
});*/

// Чек подтверждение
Then("user received confirmation {string}", async function (string) {
  const actual = await getText(this.page, "p.ticket__hint");
  expect(actual).contain(
    "После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал."
  );
});

//Кнопка забронировать не активна
Then("Book button is not active", async function () {
  const buttonStatus = await this.page.$eval(
    ".acceptin-button",
    (el) => el.disabled
  );
  expect(buttonStatus).equal(true);
});
