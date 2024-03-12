const { default: puppeteer } = require("puppeteer");

// scrape();

async function scrape(query) {

    console.log("Scraping results...")
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://www.google.com/");
    await page.goto("https://www.google.com/search?q=" + query);

    // await page.evaluate(() => document.querySelector("textarea").value = "teste");
    // await page.evaluate(() => document.querySelector("body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.FPdoLc.lJ9FBc > center > input.gNO89b").click());
    // await page.waitForNavigation()

    let results = []
    
    /*
    resultTitles = await page.$$eval("#rso > div > div", elements => elements.map(element => {
        return element.querySelector("h3").innerText
    }));
    */

    try {
        results = await page.$$eval("#rso > div > div", elements => elements.map(element => {
            const el = {
                "title": element.querySelector("h3").innerText,
                "link": element.querySelector("a").href,
                //  "summary": element.querySelector("div").innerText.split("\\n")[0].trim()
            }
            // return element.querySelector("a").href
            return el
        }));

    } catch(error) {
        return { "Error:" : "something went wrong" }
    }

    // console.log(resultTitles)

    /*

    Response shape

    [
        {
            "title": "fdsfds",
            "link": "fdsfds"
        }
    ]
    */

    await page.screenshot({ path: "./img.png", fullPage: true});


    browser.close();
    console.log("Done")
    return results;

}

module.exports = { scrape }