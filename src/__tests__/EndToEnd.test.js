import puppeteer, { executablePath } from "puppeteer";


describe("show/hide event details", () => {
    let browser;
    let page;
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250,
            timeout: 0
        });
        page = await browser.newPage();
        await page.goto("http://localhost:3000");
        await page.waitForSelector(".event");
    });

    afterAll(() => {
        browser.close();
    });

    // Test "An event element is collapsed by default"
    test("An event element is collapsed by default", async () => {
        const eventDetails = await page.$(".event .details");
        expect(eventDetails).toBeNull();
    });

    // Test "User can expand an event to see its details"
    test("User can expand an event to see its details", async () => {
        await page.click(".event .details-btn");

        const eventDetails = await page.$(".event .details");
        expect(eventDetails).toBeDefined();
    });

    // Test "User can collapse an event to hide details"
    test("User can collapse an event to hide details", async () => {
        await page.click(".event .details-btn");
        const eventDetails = await page.$(".event .details");
        expect(eventDetails).toBeNull();
    });
});
