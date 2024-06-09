import { BrowserContext, Locator, Page } from "@playwright/test";
import { crmsfaPage } from "./crmsfaPage";



export class leafLead extends crmsfaPage {

    toastMessage:string;
    viewAll:Locator
     constructor(page: Page,context:BrowserContext) {
       super(page,context);
      
    }

    async clickOnLead(Menu:string){
        await this.click("a:text-is('Leads')",Menu,"Button")
        await this.page.waitForLoadState('load')
    }
}