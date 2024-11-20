const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After, setDefaultTimeout, } = require("cucumber");
const { putText, getText } = require("../../lib/commands.js");

const {
  selectDateTime,
  cheque,
  checkSeatIsTaken,
} = require("../../lib/util.js");
const { setDefaultTimeout } = require("cucumber");
const { getText } = require("../../lib/commands.js");
setDefaultTimeout(70000);
////
let ticketThursday = "a.page-nav__day. > a:chair_take"; //выбор билетов в четверг
let movieTime = "[data-seance-id='198']"; //выбор фильма "Микки маус, начало сеанса: 11:00"
let kuarСode = "Покажите QR-код нашему контроллеру для подтверждения бронирования.";
let ticketHint = "p.ticket__hint";

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
  return await this.page.goto(`https://qamid.tmweb.ru/client${string}`, {
    setTimeout: 20000,
  });
});

When("user select {int}-th day and movie", async function (int1) {
  await selectDateTime(
    this.page,
    `a.page-nav > a:chair_take(${int1})`,
    movieTime
  );
});

When(
  "the user selects {int} rows and {int} seat",
  async function (int1, int2) {
    await orderTickets(this.page, int1, int2);
  }
);

When(
  "sees that {int} row and {int} seat is taken trying select them",
  async function (int1, int2) {
    await checkSeatIsTaken(this.page, int1, int2);
    try {
      await cheque(this.page, int1, int2);
    } catch (error) {
      expect(error).to.be.an("error");
      expect(error.message).to.be.equal("Seat(s) is taken");
    }
  }
);

Then("user received confirmation and qr-code", async function () {
  const actual = await getText(this.page, ticketHint);
  expect(actual).contain(kuarСode);
});

Then("Book button is not active", async function () {
  const buttonStatus = await this.page.$eval(
    ".acceptin-button",
    (el) => el.disabled
  );
  expect(buttonStatus).equal(true);
});