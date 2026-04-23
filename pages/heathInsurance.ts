import { Locator, Page } from '@playwright/test';

export class HeathInsurancePage {
    private readonly page: Page;
    private readonly healthInsuranceLogo: Locator;
    private readonly name: Locator;
    private readonly number: Locator;
    private readonly viewPlan: Locator;
    private readonly selfLocator: Locator;
    private readonly searchBox: Locator;
    private readonly ageLocator: Locator;
    private readonly pinCode: Locator;
    private readonly continueBtn: Locator;
    private readonly disease: Locator;
    private readonly viewPlanBtn: Locator;
    private readonly sortBtn: Locator;
    private readonly lowToHigh: Locator;

    constructor(page: Page) {
        this.page = page;
        this.healthInsuranceLogo = page.locator("//img[@alt='ID Health']");
        this.name = page.locator("//input[@name='name']");
        this.number = page.locator("//input[@name='mobile']");
        this.viewPlan = page.locator("//div[text()='View Plans']");
        this.selfLocator = page.locator("//div[text()='Self']");
        this.searchBox = page.locator(".csv2__input").nth(0);
        this.ageLocator = page.locator(".csv2__option").nth(0);
        this.pinCode = page.locator("#pincode");
        this.continueBtn = page.locator("//button[@title='Continue']");
        this.disease = page.locator(".illcard");
        this.viewPlanBtn = page.locator("//button[@title='View Plans']");
        this.sortBtn = page.locator("//span[text()='Sort By']");
        this.lowToHigh = page.locator("//label[@title='Premium: Low to High']");
    }

    // TS-01 | TC-001: Navigate to Health Insurance section
    async navigateToHealthInsurance() {
        await this.healthInsuranceLogo.click();
    }

    // TS-01 | TC-002: Fill name, mobile number and click View Plans
    async fillLeadForm(name: string, number: string) {
        await this.name.click();
        await this.name.fill(name);
        await this.number.click();
        await this.number.fill(number);
        await this.viewPlan.click();
    }

    // TS-01 | TC-003: Select Self coverage type
    async selectSelfCoverage() {
        await this.selfLocator.click();
    }

    // TS-01 | TC-004: Enter age, pin code and click Continue
    async fillAgeAndPincode(age: string, pin: string) {
        await this.searchBox.pressSequentially(age);
        await this.ageLocator.click();
        await this.pinCode.click();
        await this.pinCode.pressSequentially(pin, { delay: 100 });
        await this.page.waitForTimeout(1000);
        await this.continueBtn.waitFor({ state: 'visible' });
        await this.continueBtn.scrollIntoViewIfNeeded();
        await this.continueBtn.click();
    }

    // TS-01 | TC-005: Select pre-existing disease and click View Plans
    async selectDiseaseAndViewPlans(disease: string) {
        await this.disease.filter({ hasText: disease }).click();
        await this.viewPlanBtn.click();
    }

    // TS-01 | TC-006: Sort plans by Premium Low to High and log top 3
    async sortAndLogTopThreePlans() {
        await this.page.waitForTimeout(1000);
        await this.sortBtn.click();
        await this.lowToHigh.click();

        const plans: (string | null)[] = [];
        const premiums: (string | null)[] = [];

        for (let i = 0; i < 3; i++) {
            plans.push(await this.page.locator(".quoteCardPlanName").nth(i).textContent());
            premiums.push(await this.page.locator(".quoteCardRight p").nth(i).textContent());
        }

        console.log("-------------------------------------------------------");
        console.log("Top 3 Plans sorted by Premium (Low to High):");
        for (let i = 0; i < 3; i++) {
            console.log(`Plan: ${plans[i]}, Premium: ${premiums[i]}`);
        }
        console.log("-------------------------------------------------------");
        console.log();
    }
}