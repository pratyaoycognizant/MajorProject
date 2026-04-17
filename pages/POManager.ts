import { Page } from '@playwright/test';
import { CarInsurancePage } from './carInsurance';
import { HeathInsurancePage } from './heathInsurance';
import { InsurancedekhoPage } from './investmentPlan';


export class POManager{
    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    getCarInsurancePage(){
        return new CarInsurancePage(this.page);
    }
    getHealthInsurancePage(){
        return new HeathInsurancePage(this.page);
    }
    getInvestmentPlanPage(){
        return new InsurancedekhoPage(this.page);
    }
}