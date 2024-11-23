const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After, setDefaultTimeout } = require("cucumber");
const { putText, getText } = require("../../lib/commands.js");
const {
  selectDateTime,
  cheque,
  checkSeatIsTaken,
} = require("../../lib/util.js");
setDefaultTimeout(60 * 1000);

let ticketTomorrow = "a.page-nav__day:nth-child(2)"; //выбор билетов на завтра
let ticket4days = "a.page-nav__day:nth-child(4)"; //выбор билетов через 4 дня
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
When("user select {int}-th day and movie", async function () {
  await selectDateTime(
    this.page,
    "a.page-nav__day:nth-child(2)",
       movieTime
  );
});

When( "the user selects 1 rows and 10  seat", async function () {
  await cheque(
    this.page,
    ".buying-scheme__row(1) > span:nth-child(10)",
    
  )
});
//выбираем 4 день

When("user select {int}-th day and movie", async function () {
  await selectDateTime(this.page, "a.page-nav__day:nth-child(4)", movieTime);
});

When("the user selects 1 rows and 10 seat", async function () {
  await cheque(this.page, ".buying-scheme__row(1) > span:nth-child(10)");
});

// 2 день забронированные места выбираем


When("user select {int}-th day and movie", async function () {
  await selectDateTime(this.page, "a.page-nav__day:nth-child(2)", movieTime);
});

When("the user selects {int} rows and  {int} seat", async function () {
  await cheque(this.page, ".buying-scheme__row(1) > span:nth-child(9)");
});

When(
  "sees that {int} row and {int} seat is taken trying select them",
  async function () {
    await checkSeatIsTaken(
      this.page,
      ".buying-scheme__row(1) > span:nth-child(9)"
    );
  })

   /* try {
      await cheque(
        this.page,
        ".buying-scheme__row:nth-child(1) > span:nth-child(9)"
      );
    } catch (error) {
      expect(error).to.be.an("error");
      expect(error.message).to.be.equal("Seat(s) is taken");
    }
  }
);*/

// Чек подтверждение
Then("user received confirmation", async function () {
  const actual = await getText(this.page, 'p.ticket__hint');
  expect(actual).contain(
    "После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал."
  );
});
//Кнопка забронировать не активна
/*Then("Book button is not active", async function () {
  const buttonStatus = await this.page.$eval(
    ".acceptin-button",
    (el) => el.disabled
  );
  expect(buttonStatus).equal(true);
});*/

Then("Book button is not active", async function (string) {
  const actual = String(
    await this.page.$eval("button", (button) => {
      return button.disabled;
    })
  );
  const expected = await string;
  expect(actual).contains(expected);
});