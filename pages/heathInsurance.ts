import {Locator, Page } from '@playwright/test';

export class HeathInsurancePage {
    private readonly page: Page;
    private readonly healthInsuranceLogo: Locator
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

    constructor(page: Page){
        this.page = page;
        this.healthInsuranceLogo = page.locator("//img[@alt='ID Health']");
        this.name = page.locator("//input[@name='name']");
        this.number = page.locator("//input[@name='mobile']");
        this.viewPlan = page.locator("//div[text()='View Plans']");
        this.selfLocator = page.locator("//div[text()='Self']");
        this.searchBox = page.locator(".csv2__input").nth(0);
        this.ageLocator = page.locator(".csv2__option").nth(0);
        this.pinCode = page.locator("#pincode");
        this.continueBtn = page.locator(".button-primary.large");
        this.disease = page.locator(".illcard");
        this.viewPlanBtn = page.locator("//button[@title='View Plans']");
        this.sortBtn = page.locator("//span[text()='Sort By']");
        this.lowToHigh = page.locator("//label[@title='Premium: Low to High']");
    }

    async getHealthInsuranceList(name: string, number: string, age: string, pin: string, disease: string){
        await this.healthInsuranceLogo.click();
        await this.name.click();
        await this.name.fill(name);
        await this.number.click();
        await this.number.fill(number);
        await this.viewPlan.click();
        await this.selfLocator.click();
        await this.searchBox.pressSequentially(age);
        await this.ageLocator.click();
        await this.pinCode.click();
        await this.pinCode.fill(pin);
        await this.continueBtn.waitFor({ state: 'visible' });
        await this.continueBtn.scrollIntoViewIfNeeded();
        await this.continueBtn.click();
        await this.disease.filter({ hasText: disease }).click();
        await this.viewPlanBtn.click();
        await this.sortBtn.click();
        await this.lowToHigh.click();

        let plans = [];
        let premiums = [];

        for(let i=0; i<3; i++){
            plans.push(await this.page.locator(".quoteCardPlanName").nth(i).textContent());
            premiums.push(await this.page.locator(".quoteCardRight p").nth(i).textContent());
        }

        for(let i=0; i<3; i++){
            console.log(`Plan: ${plans[i]}, Premium: ${premiums[i]}`);
        }
    }
}