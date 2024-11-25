const { clickElement, getText } = require("./lib/commands.js");
const puppeteer = require("puppeteer");
const { selectDateTime, cheque, checkSeatIsTaken } = require("./lib/util.js");

let page;

let ticketTomorrow = "a.page-nav__day:nth-child(2)"; //выбор билетов на завтра,
let ticket4days = "a.page-nav__day:nth-child(4)"; //выбор билетов через 4 дня
let movieTime = "[data-seance-id='198']"; //выбор фильма "Микки маус, начало сеанса: 11:00"

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php");
  await page.setDefaultNavigationTimeout(0); //await page.setDefaultTimeout(60000);
});

afterEach(() => {
  page.close();
});

describe("Booking 1 movie ticket", () => {
  //Бронируем один билет на фильм на завтра
  test("We book one ticket for the movie", async () => {
    await selectDateTime(page, ticketTomorrow, movieTime);
    await cheque(page, ".buying-scheme__row(1)", "span:nth-child(10)");
    const actual = await getText(page, "p.ticket__hint");
    expect(actual).toContain(
      "После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал."
    );
  });
});

//Бронируем один билет на фильм через 4 дня
test("We book one movie ticket in 4 days", async () => {
  await selectDateTime(page, ticket4days, movieTime);
  await cheque(page, ".buying-scheme__row(1)", "span:nth-child(10)");
  const actual = await getText(page, "p.ticket__hint");
  expect(actual).toContain(
    "После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал."
  );
});

// Проверяем, можно ли забронировать билет, если места заняты
test("We check whether it is possible to book a ticket if the seats are occupied", async () => {
  await expect(async () => {
    await selectDateTime(page, ticketTomorrow, movieTime);
    await cheque(page, ".buying-scheme__row(1) > span:nth-child(3)");

    expect(
      String(
        await page.$eval("button", (button) => {
          return button.disabled;
        })
      )
    ).toContain("true");
  });
});
