const puppeteer = require("puppeteer");

// https://hidemy.name/en/proxy-list/?maxtime=100#list

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const arr = [1, 2, 3, 4, 5];
// const arr = [1];
arr.map(async (value, index, arr) => {
  await bot(value);
});

async function bot(value) {
  try {
    const PROXY_HOST = "167.172.171.115";
    const PROXY_PORT = "40061";
    const PROXY_TYPE = "https";
    const PROXY_USERNAME = "username";
    const PROXY_PASSWORD = "password";

    const launchOptions = {
      args: [`--proxy-server=${PROXY_TYPE}://${PROXY_HOST}:${PROXY_PORT}`],
    };

    // const browser = await puppeteer.launch(launchOptions);
    const browser = await puppeteer.launch();
    console.log("browser opened");

    const page = await browser.newPage();
    console.log("page created");

    // await page.authenticate({
    //   username: PROXY_USERNAME,
    //   password: PROXY_PASSWORD,
    // });
    // console.log("page authenticated");

    await page.goto("https://youtu.be/O60p7Eb3-tk");
    console.log("page opened");

    await page.click("button.ytp-play-button");
    console.log("play clicked");
    // ytp-time-duration
    // await page.waitForSelector(".ytp-time-duration");
    const min = 60000;
    const max = 120000;
    // const max = await page.evaluate(
    //   () => document.querySelector("span.ytp-time-duration").textContent
    // );
    const time = random(min, max);

    console.log(`watching ${time} seconds`);
    await delay(time);
    console.log(`watched ${time} seconds`);

    await page.screenshot({ path: `screenshot-${value}.png` });
    console.log("screen printed");

    await browser.close();
    console.log("browser closed");
  } catch (error) {
    console.log(error);
  }
}

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
