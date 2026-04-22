# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: insuranceDekho.spec.ts >> InsuranceDekho Tests @main >> Investment Plan
- Location: tests\insuranceDekho.spec.ts:27:9

# Error details

```
Error: locator.waitFor: Target page, context or browser has been closed
Call log:
  - waiting for locator('h2').filter({ hasText: 'Please enter your age and income' }) to be visible

```

# Test source

```ts
  1  | import { Page, Locator } from '@playwright/test';
  2  | 
  3  | export class InsurancedekhoPage {
  4  |     private readonly page: Page;
  5  |     private readonly investmentLink: Locator;
  6  |     private readonly nameLabel: Locator;
  7  |     private readonly nameInput: Locator;
  8  |     private readonly mobileLabel: Locator;
  9  |     private readonly mobileInput: Locator;
  10 |     private readonly submitButton: Locator;
  11 |     private readonly popupHeading: Locator;
  12 |     private readonly ageInput: Locator;
  13 |     private readonly ageOption: Locator;
  14 |     private readonly salaryOption: Locator;
  15 |     private readonly viewPlansButton: Locator;
  16 |     private readonly resultCards: Locator;
  17 | 
  18 |     constructor(page: Page) {
  19 |         this.page = page;
  20 |         this.investmentLink = page.locator("a[title='Investment Plans']");
  21 |         this.nameLabel = page.locator('label', { hasText: "Enter your Full Name" });
  22 |         this.nameInput = page.locator("input[name='name']");
  23 |         this.mobileLabel = page.locator('label', { hasText: "(+91) Mobile Number" });
  24 |         this.mobileInput = page.locator("input[name='mobile']");
  25 |         this.submitButton = page.locator("button[name='submitBtn']");
  26 |         this.popupHeading = page.locator("h2", { hasText: 'Please enter your age and income' });
  27 |         this.ageInput = page.locator("input#DOB");
  28 |         this.ageOption = page.locator("div.gs_ta_results li");
  29 |         this.salaryOption = page.locator("div.noIncomeProofInner div.icomeAreaMain span");
  30 |         this.viewPlansButton = page.locator('button', { hasText: 'View Plans For Free' });
  31 |         this.resultCards = page.locator("div.QuoteCardV2");
  32 |     }
  33 | 
  34 |     // TS-02 | TC-007: Navigate to Investment Plans
  35 |     async navigateToInvestmentPlans() {
  36 |         await this.investmentLink.click();
  37 |     }
  38 | 
  39 |     // TS-02 | TC-008: fill lead form
  40 |     async fillLeadForm(name: string, mobile: string) {
  41 |         await this.page.locator("h2.leadFormTitle").click();
  42 | 
  43 |         await this.nameLabel.waitFor();
  44 |         await this.nameLabel.click();
  45 |         await this.nameInput.waitFor();
  46 |         await this.nameInput.fill(name);
  47 | 
  48 |         await this.mobileLabel.waitFor();
  49 |         await this.mobileLabel.click();
  50 |         await this.mobileInput.waitFor();
  51 |         await this.mobileInput.fill(mobile);
  52 | 
  53 |         await this.submitButton.click();
  54 |     }
  55 | 
  56 |     // TS-02 | TC-009: Handle age and salary popup if visible
  57 |     async handlePopupIfRequired(age: string, salaryRange: string) {
  58 |         await Promise.race([
> 59 |             this.popupHeading.waitFor(),
     |                               ^ Error: locator.waitFor: Target page, context or browser has been closed
  60 |             this.resultCards.first().waitFor()
  61 |         ]);
  62 | 
  63 |         if (await this.popupHeading.isVisible()) {
  64 |             await this.ageInput.click();
  65 |             await this.ageInput.pressSequentially(age, { delay: 100 });
  66 |             await this.ageOption.first().click();
  67 |             await this.salaryOption.filter({ hasText: salaryRange }).click();
  68 |             await this.viewPlansButton.click();
  69 | 
  70 |             await this.resultCards.first().waitFor();
  71 |         }
  72 |     }
  73 | 
  74 |     // TS-02 | TC-010: Wait for results and log all plan names and prices
  75 |     async getAndPrintResults() {
  76 |         await this.resultCards.first().waitFor();
  77 | 
  78 |         const results = await this.resultCards.all();
  79 | 
  80 |         for (const result of results) {
  81 |             const hasParagraph = await result.locator("p").first().isVisible();
  82 |             if (!hasParagraph) continue;
  83 | 
  84 |             const name = await result.locator("p").first().textContent();
  85 |             const price = await result.locator("h4").first().textContent();
  86 |             console.log(`Plan: ${name}, Price: ${price}`);
  87 |         }
  88 |     }
  89 | }
```