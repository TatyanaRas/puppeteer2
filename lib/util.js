
const { clickElement, getText } = require("./commands.js");

module.exports = {
  selectDateTime: async function (page, day, time) {
    await clickElement(page, day);
    await clickElement(page, time);
  },

  cheque: async function (page, row, ...seats) {
    await page.waitForSelector(".buying-scheme__wrapper");
    try {
      for (let i = 0; i < seats.length; i++) {
        await clickElement(
          page,
          `div.buying-scheme__wrapper > div.buying-scheme__row:nth-child(1) > span.buying-scheme__chair:nth-child(10)`,
          `div.buying-scheme__wrapper > div.buying-scheme__row:nth-child(1) > span.buying-scheme__chair:nth-child(10)`
        );
        await page.waitForSelector(
          `div.buying-scheme__wrapper > div.buying-scheme__row:nth-child(1) > span.buying-scheme__chair:nth-child(10).buying-scheme__chair_selected`,
          `div.buying-scheme__wrapper > div.buying-scheme__row:nth-child(1) > span.buying-scheme__chair:nth-child(10).buying-scheme__chair_selected`
        );
      }
            
    } catch (error) {
      throw new Error(`Seat(s) is taken`);
    }
    await clickElement(page, ".acceptin-button");
    await page.waitForSelector(".ticket__check-title");

  },


  checkSeatIsTaken: async function (page, row, ...seats) {
    await page.waitForSelector(".buying-scheme__wrapper");
    try {
      for (let i = 0; i < seats.length; i++) {
        await page.waitForSelector(
          `div.buying-scheme__wrapper > div.buying-scheme__row:nth-child(1) > span.buying-scheme__chair:nth-child(10).buying-scheme__chair_taken`,
          `div.buying-scheme__wrapper > div.buying-scheme__row:nth-child(1) > span.buying-scheme__chair:nth-child(10).buying-scheme__chair_taken`
        );
      }
    } catch (error) {
      throw new Error("Seat(s) is free");
    }
  },
};