import { test } from '@playwright/test';
import { POManager } from '../pages/POManager';
import inputData from '../dataset/inputData.json';

test.describe.serial("InsuranceDekho Tests @main", () => {
    let poManager: POManager;

    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.insurancedekho.com/");
        await page.waitForLoadState('domcontentloaded');
        poManager = new POManager(page);
    });

    // TS-01 | TC-001 to TC-006
    test("Health Insurance", async () => {
        const healthPage = poManager.getHealthInsurancePage();

        await healthPage.navigateToHealthInsurance();                     // TC-001
        await healthPage.fillLeadForm(inputData.name, inputData.number);  // TC-002
        await healthPage.selectSelfCoverage();                            // TC-003
        await healthPage.fillAgeAndPincode(inputData.age, inputData.pin); // TC-004
        await healthPage.selectDiseaseAndViewPlans(inputData.disease);    // TC-005
        await healthPage.sortAndLogTopThreePlans();                       // TC-006
    });

    // TS-02 | TC-007 to TC-010
    test("Investment Plan", async () => {
        const investmentPage = poManager.getInvestmentPlanPage();

        await investmentPage.navigateToInvestmentPlans();                                  // TC-007
        await investmentPage.fillLeadForm(inputData.name, inputData.number);               // TC-008
        await investmentPage.handlePopupIfRequired(inputData.age, inputData.salaryRandge); // TC-009
        await investmentPage.getAndPrintResults();                                         // TC-0010
    });

    // TS-03 | TC-011 to TC-015
    test("Car Insurance", async () => {
        const carPage = poManager.getCarInsurancePage();

        await carPage.navigateToCarInsurance();                                       // TC-011
        await carPage.selectNewCarAndBrand(inputData.carBrand);                       // TC-012
        await carPage.selectCarModel(inputData.carModel);                             // TC-013
        await carPage.selectFuelAndVariant(inputData.fuelType, inputData.carVarient); // TC-013
        await carPage.selectYearAndRtoCity(inputData.carYear, inputData.city);        // TC-014
        await carPage.fillCustomerDetails(inputData.name, inputData.wrongNumber);     // TC-015
    });
});
