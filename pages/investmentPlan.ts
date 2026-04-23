import { Page, Locator } from '@playwright/test';

export class InsurancedekhoPage {
    private readonly page: Page;
    private readonly investmentLink: Locator;
    private readonly nameLabel: Locator;
    private readonly nameInput: Locator;
    private readonly mobileLabel: Locator;
    private readonly mobileInput: Locator;
    private readonly submitButton: Locator;
    private readonly popupHeading: Locator;
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
        this.popupHeading = page.locator("h2", { hasText: 'Please enter your age and income' });
        this.ageInput = page.locator("input#DOB");
        this.ageOption = page.locator("div.gs_ta_results li");
        this.salaryOption = page.locator("div.noIncomeProofInner div.icomeAreaMain span");
        this.viewPlansButton = page.locator('button', { hasText: 'View Plans For Free' });
        this.resultCards = page.locator("div.QuoteCardV2");
    }

    // TS-02 | TC-007: Navigate to Investment Plans
    async navigateToInvestmentPlans() {
        await this.investmentLink.click();
    }

    // TS-02 | TC-008: fill lead form
    async fillLeadForm(name: string, mobile: string) {
        await this.page.locator("h2.leadFormTitle").click();
        await this.page.waitForTimeout(1000);

        await this.nameLabel.waitFor();
        await this.nameLabel.click();
        await this.nameInput.waitFor();
        await this.nameInput.fill(name);

        await this.mobileLabel.waitFor();
        await this.mobileLabel.click();
        await this.mobileInput.waitFor();
        await this.mobileInput.fill(mobile);

        await this.submitButton.click();
    }

    // TS-02 | TC-009: Handle age and salary popup if visible
    async handlePopupIfRequired(age: string, salaryRange: string) {
        await Promise.race([
            this.popupHeading.waitFor(),
            this.resultCards.first().waitFor()
        ]);

        if (await this.popupHeading.isVisible()) {
            await this.ageInput.click();
            await this.ageInput.pressSequentially(age, { delay: 100 });
            await this.ageOption.first().click();
            await this.salaryOption.filter({ hasText: salaryRange }).click();
            await this.viewPlansButton.click();

            await this.resultCards.first().waitFor();
        }
    }

    // TS-02 | TC-010: Wait for results and log all plan names and prices
    async getAndPrintResults() {
        await this.resultCards.first().waitFor();

        const results = await this.resultCards.all();

        for (const result of results) {
            const hasParagraph = await result.locator("p").first().isVisible();
            if (!hasParagraph) continue;

            const name = await result.locator("p").first().textContent();
            const price = await result.locator("h4").first().textContent();
            console.log(`Plan: ${name}, Price: ${price}`);
        }
    }
}