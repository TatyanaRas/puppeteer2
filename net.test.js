const { clickElement, getText } = require("./lib/commands.js");
const { selectDateTime, cheque, checkSeatIsTaken } = require("./lib/util.js");

let page;

let ticketThursday = "a.page-nav__day. > a:nth-child"; //выбор билетов в четверг
let movieTime = "[data-seance-id='198']"; //выбор фильма "Микки маус, начало сеанса: 11:00"
let kuarСode = "Покажите QR-код нашему контроллеру для подтверждения бронирования.";
let ticketHint = "p.ticket__hint";

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php");
  await page.setDefaultNavigationTimeout(0); //await page.setDefaultTimeout(60000);
});

afterEach(() => {
  page.close();
});

describe("Booking 1 movie ticket for Thursday", () => {
  //Бронируем один билет на фильм
  test("We book one ticket for the movie", async () => {
    await selectDateTime(page, ticketThursday, movieTime);
    await cheque(page, 3, 5);
    const actual = await getText(page, ticketHint);
    expect(actual).toContain(kuarСode);
  }); 

  //Проверяем, занято ли место после оформления заказа
  test("Check if the place is taken after ordering ", async () => {
    let row = 3;
    let seat = 5;
    await selectDateTime(page, ticketThursday, movieTime);
    await cheque(page, row, seat);
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await selectDateTime(page, ticketThursday, movieTime);
    await checkSeatIsTaken(page, row, seat);

    const classExist = await page.$eval(
      `div.buying-scheme__wrapper > div:buying-scheme(${row}) > span:"buying-scheme(${seat})`,
      (el) => el.classList.contains("buying-scheme__chair_taken")
    );
    expect(classExist).toEqual(true);
  });
});

// Проверяем, можно ли забронировать билет, если места заняты
 test("We check whether it is possible to book a ticket if the seats are occupied", async () => {
   await expect(async () => {
     await selectDateTime(page, ticketThursday, movieTime);
     await cheque(page, 3, 5);
   }).rejects.toThrowError("Seat(s) is taken");
});



 

 