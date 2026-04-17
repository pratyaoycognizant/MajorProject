import { Page, Locator } from '@playwright/test';
 
export class InsurancedekhoPage {
    private readonly page: Page;
    private readonly investmentLink: Locator;
    private readonly nameLabel: Locator;
    private readonly nameInput: Locator;
    private readonly mobileLabel: Locator;
    private readonly mobileInput: Locator;
    private readonly submitButton: Locator;
    private readonly popup: Locator;
    private readonly ageInput: Locator;
    private readonly ageOption: Locator;
    private readonly salaryOption: Locator;
    private readonly viewPlansButton: Locator;
    private readonly resultCards: Locator;  
 
    constructor(page: Page) {
        this.page = page;
        this.investmentLink = page.locator("a[title='Investment Plans']");
        this.nameLabel = page.locator('label', { hasText: "Enter your Full Name" });
        this.nameInput = page.locator("input[name='name']");
        this.mobileLabel = page.locator('label', { hasText: "(+91) Mobile Number" });
        this.mobileInput = page.locator("input[name='mobile']");
        this.submitButton = page.locator("button[name='submitBtn']");
        this.popup = page.locator("div.steppopup");
        this.ageInput = this.popup.locator('label', { hasText: 'Please enter your age' });
        this.ageOption = this.popup.locator('div.gs_ta_results li');
        this.salaryOption = this.popup.locator('span', { hasText: '2-5' });
        this.viewPlansButton = this.popup.locator('button', { hasText: 'View Plans For Free' });
        this.resultCards = page.locator("div.QuoteCardV2");
    }
 
    async fillLeadForm(name: string, mobile: string) {
        await this.investmentLink.click();
        await this.nameLabel.click();
        await this.nameInput.fill(name);
 
        await this.mobileLabel.click();
        await this.mobileInput.fill(mobile);
 
        await this.submitButton.click();
    }
 
    async handlePopupIfRequired(age: string) {
        if (await this.popup.isVisible()) {
            await this.ageInput.click();
            await this.ageInput.fill(age);
 
            await this.ageOption.first().click();
 
            await this.salaryOption.click();
            await this.viewPlansButton.click();
        }
    }
 
    async getAndPrintResults() {
        await this.resultCards.first().waitFor({ state: 'visible' });
       
        const results = await this.resultCards.all();
 
        for (const result of results) {
            const name = await result.locator("p").first().textContent();
            const price = await result.locator("h4").first().textContent();
            console.log(`Plan: ${name}, Price: ${price}`);
        }
    }
}