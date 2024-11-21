const { clickElement, getText } = require("./lib/commands.js");
const { selectDateTime, cheque, checkSeatIsTaken } = require("./lib/util.js");

let page;

let ticketTomorrow = "a.page-nav__day:nth-child(2)"; //выбор билетов на завтра, 
let ticket4days = "a.page-nav__day:nth-child(4)"; //выбор билетов через 4 дня
let movieTime = "[data-seance-id='198']"; //выбор фильма "Микки маус, начало сеанса: 11:00"
let kuarСode = "Покажите QR-код нашему контроллеру для подтверждения бронирования.";
let ticketHint = "p.ticket__hint";

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php");
  await page.setDefaultNavigationTimeout(70000); //await page.setDefaultTimeout(60000);
});

afterEach(() => {
  page.close();
});

describe("Booking 1 movie ticket", () => {
  //Бронируем один билет на фильм на завтра
  test("We book one ticket for the movie", async () => {
    await selectDateTime(page, ticketTomorrow, movieTime);
    await cheque(page, 2, 5);
    const actual = await getText(page, ticketHint);
    expect(actual).toContain(kuarСode);
  
  });
  
//Бронируем один билет на фильм через 4 дня
  test("We book one movie ticket in 4 days", async () => {
    await selectDateTime(page, ticket4days, movieTime);
    await cheque(page, 1, 5);
    const actual = await getText(page, ticketHint);
    expect(actual).toContain(kuarСode);
   
  });
  
// Проверяем, можно ли забронировать билет, если места заняты
 test("We check whether it is possible to book a ticket if the seats are occupied", async () => {
   await expect(async () => {
     await selectDateTime(page, ticketTomorrow, movieTime);
     await cheque(page, 2, 5);
   }).rejects.toThrowError("Seat(s) is taken");
});

});


  //Проверяем, занято ли место после оформления заказа
  test("Check if the place is taken after ordering ", async () => {
    let row = 3;
    let seat = 5;
    await selectDateTime(page, ticket4days, movieTime);
    await cheque(page, row, seat);
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await selectDateTime(page, ticket4days, movieTime);
    await checkSeatIsTaken(page, row, seat);
    const classExist = await page.$eval(
      `div.buying-scheme__wrapper > div.buying-scheme__row:nth-child(${row}) > span.buying-scheme__chair:nth-child(${seat})`,
      (el) => el.classList.contains("buying-scheme__chair_taken")
    );
    expect(classExist).toEqual(true);
  });






 

 