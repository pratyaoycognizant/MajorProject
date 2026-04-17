import { test } from '@playwright/test';
import { POManager } from '../pages/POManager';
import inputData from '../dataset/inputData.json';

test.describe.serial("InsuranceDekho Tests", () => {
    let poManager: POManager;

    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.insurancedekho.com/");
        await page.waitForLoadState('networkidle');
        poManager = new POManager(page);
    });

    test("Health Insurance", async () => {
        const healthInsurancePage = poManager.getHealthInsurancePage();
        await healthInsurancePage.getHealthInsuranceList(
            inputData.name, 
            inputData.number, 
            inputData.age, 
            inputData.pin, 
            inputData.disease
        );
    });
        
    test("Investment Plan", async () => {
        const insurancePage = poManager.getInvestmentPlanPage();
        await insurancePage.fillLeadForm(inputData.name, inputData.number);
        await insurancePage.handlePopupIfRequired(inputData.age);
        await insurancePage.getAndPrintResults();
    });

    test("Car Insurance", async () => {
        const carInsurancePage = poManager.getCarInsurancePage();
        await carInsurancePage.getCarInsuranceDetails(
            inputData.carBrand, 
            inputData.carModel, 
            inputData.fuelType, 
            inputData.carVarient, 
            inputData.carYear, 
            inputData.city
        );
        await carInsurancePage.fillCustomerDetails(inputData.name, inputData.wrongNumber);
    });
});