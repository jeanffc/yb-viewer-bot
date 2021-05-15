const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

// https://hidemy.name/en/proxy-list/?maxtime=100#list
// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const arr = [1, 2, 3, 4, 5];
const arr = [1];
arr.map(async (value, index, arr) => {
  await bot(value);
});

async function bot(value) {
  try {
    const PROXY_HOST = "127.0.0.1";
    const PROXY_PORT = "9050";
    const PROXY_TYPE = "socks5";
    const PROXY_USERNAME = "username";
    const PROXY_PASSWORD = "password";

    const launchOptions = {
      // headless: false,
      args: [`--proxy-server=${PROXY_TYPE}://${PROXY_HOST}:${PROXY_PORT}`],
    };

    const browser = await puppeteer.launch(launchOptions);
    console.log("browser opened");

    const page = await browser.newPage();
    console.log("page created");

    await page.goto("https://check.torproject.org/");
    const isUsingTor = await page.$eval("body", (el) =>
      el.innerHTML.includes(
        "Congratulations. This browser is configured to use Tor"
      )
    );
    if (!isUsingTor) {
      console.log("Not using Tor. Closing...");
      await browser.close();
      return;
    } else {
      console.log("Is using Tor. Continuing...");
    }

    await page.goto("https://www.youtube.com/watch?v=6uxlwvwn7lo");
    console.log("page opened");

    await page.click("button.ytp-play-button");
    console.log("play clicked");

    const min = 60000;
    const max = 120000; // todo: calculate the max duration
    const time = random(min, max);

    // await delay(time);
    await page.waitForTimeout(time);
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
