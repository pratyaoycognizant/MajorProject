import { Locator, Page } from '@playwright/test';

export class CarInsurancePage {
    private readonly page: Page;
    private readonly carInsuranceLogo: Locator;
    private readonly newCarBtn: Locator;
    private readonly searchCarBrand: Locator;
    private readonly searchCarModel: Locator;
    private readonly fuelType: Locator;
    private readonly varient: Locator;
    private readonly carYear: Locator;
    private readonly searchCity: Locator;
    private readonly rtoCity: Locator;
    private readonly cityOption: Locator;
    private readonly customerName: Locator;
    private readonly mobileNumber: Locator;

    constructor(page: Page) {
        this.page = page;
        this.carInsuranceLogo = page.locator('div [alt="ID Car"]');
        this.newCarBtn = page.locator('.clearfix a[href*="void(0)"]');
        this.searchCarBrand = page.locator('[name="searchInput"]');
        this.searchCarModel = page.locator('[name="searchInput"]');
        this.fuelType = page.locator('.tagAll');
        this.varient = page.locator('#searchItemText');
        this.carYear = page.locator(".searchFilt [type='text']");
        this.searchCity = page.locator('ul .cardV2');
        this.rtoCity = page.locator('#rto_city');
        this.cityOption = page.locator('.gs_ta_results li');
        this.customerName = page.locator('#customerName');
        this.mobileNumber = page.locator('#mobileNumber');
    }

    // TS-03 | TC-011: Navigate to Car Insurance section
    async navigateToCarInsurance() {
        await this.carInsuranceLogo.click();
    }

    // TS-03 | TC-012: Click New Car and search for car brand
    async selectNewCarAndBrand(brand: string) {
        await this.newCarBtn.click();
        await this.searchCarBrand.fill(brand);
        await this.page.locator(`a[title='${brand}']`).click();
    }

    // TS-03 | TC-013: Select car model from search results
    async selectCarModel(model: string) {
        await this.searchCarModel.fill(model);
        await this.page.getByText(model).click();
    }

    // TS-03 | TC-013: Select fuel type and car variant
    async selectFuelAndVariant(fuel: string, varient: string) {
        await this.fuelType.filter({ hasText: fuel }).click();
        await this.varient.fill(varient);
        await this.page.getByText(varient).click();
    }

    // TS-03 | TC-014: Enter car year, select RTO city, fill customer details and verify validation
    async selectYearAndRtoCity(year: string, city: string) {
        await this.carYear.fill(year);
        await this.searchCity.click();
        await this.rtoCity.pressSequentially(city, { delay: 100 });
        await this.cityOption.first().waitFor({ state: 'visible' });
        await this.cityOption.first().click();
    }
    
    // TS-03 | TC-015: Enter fill customer details and verify validation
    async fillCustomerDetails(name: string, mobile: string) {
        await this.customerName.fill(name);
        await this.mobileNumber.fill(mobile);
        const msg = await this.page.locator('.srv-validation-message').nth(0).textContent();
        console.log("-------------------------------------------------------");
        console.log("Error message for invalid mobile number: " + msg);
        console.log("-------------------------------------------------------");
        console.log();
    }
}