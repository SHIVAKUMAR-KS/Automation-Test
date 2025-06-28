const puppeteer = require('puppeteer'); // Use puppeteer (not puppeteer-core)
const testData = require('./test.js');  // Load data from test.js

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Load your local HTML file (update if hosted elsewhere)
  await page.goto(`file://${__dirname}/index.html`);

  for (const data of testData) {
    const blockSelector = `.profile-block[data-profile="${data.profile}"]`;

    // 1. Type the PIN
    const pinSelector = `${blockSelector} .pinInput`;
    await page.waitForSelector(pinSelector);
    await page.click(pinSelector, { clickCount: 3 });
    await page.type(pinSelector, data.pin);

    // 2. Handle toggle switch (click the visible label, not the hidden input)
    const toggleInputSelector = `${blockSelector} .toggleControl`;
    const toggleLabelSelector = `${blockSelector} .switch`;
    await page.waitForSelector(toggleInputSelector);

    const isChecked = await page.$eval(toggleInputSelector, el => el.checked);
    if (isChecked !== data.enabled) {
      await page.click(toggleLabelSelector); // Click the visual switch
      await new Promise(resolve => setTimeout(resolve, 300)); // Native JS delay
    }

    // 3. Select dropdown if enabled
    if (data.enabled && data.restrictionLevel) {
      const dropdownSelector = `${blockSelector} .profileDropdown`;
      await page.waitForSelector(dropdownSelector);
      await page.select(dropdownSelector, data.restrictionLevel);
    }
  }

  // 4. Click the Save button
  await page.click('#saveBtn');
  await new Promise(resolve => setTimeout(resolve, 4000)); // Let the alert appear

  await browser.close();
})();
