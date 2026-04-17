import {Locator, Page} from '@playwright/test'

export class CarInsurancePage{
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
    private readonly customerName: Locator;
    private readonly mobileNumber: Locator;

    constructor(page: Page){
        this.page = page;
        this.carInsuranceLogo = page.locator('div [alt="ID Car"]');
        this.newCarBtn = page.locator('.clearfix a[href*="void(0)"]');
        this.searchCarBrand = page.locator('[name="searchInput"]');
        this.searchCarModel = page.locator('[name="searchInput"]');
        this.fuelType = page.locator('.tagAll');
        this.varient = page.locator('#searchItemText');
        this.carYear = page.locator(".searchFilt [type='text']");
        this.searchCity = page.locator(' ul .cardV2');
        this.rtoCity = page.locator('#rto_city');
        this.customerName = page.locator('#customerName');
        this.mobileNumber = page.locator('#mobileNumber');
    }

    async getCarInsuranceDetails(brand: string, model: string, fuel: string, varient: string, year: string, city: string){
        await this.carInsuranceLogo.click();
        await this.newCarBtn.click();
        await this.searchCarBrand.fill(brand);
        await this.page.locator(`a[title='${brand}']`).click();
        await this.searchCarModel.fill(model);
        await this.page.getByText(model).click();
        await this.fuelType.filter({hasText: fuel}).click()
        await this.varient.fill(varient);
        await this.page.getByText(varient).click();
        await this.carYear.fill(year);
        await this.searchCity.click();
        await this.rtoCity.pressSequentially(city);
        await this.rtoCity.click();
        await this.page.locator('.gs_ta_results').waitFor({state:'visible'})
        await this.page.locator('[data-value="WB03"]').click();
    }
    async fillCustomerDetails(name: string, mobile: string){
        await this.customerName.fill(name);
        await this.mobileNumber.fill(mobile);
        const msg = await this.page.locator('.srv-validation-message').nth(0).textContent();
        console.log("Error message for invalid mobile number: " + msg);
    }
}

 