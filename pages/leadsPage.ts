import { BrowserContext, Locator, Page } from "@playwright/test";
import { URLConstants } from "../constants/urlConstants";
import { PlaywrightWrapper } from "../utils/playwright";
import { HomePage } from "./homePage";
import { LeadDetails } from "../utils/TestData/testdata";

export class LeadsPage extends HomePage {

    toastMessage:string;
    viewAll:Locator
     constructor(page: Page,context:BrowserContext) {
       super(page,context);
       this.viewAll=this.page.getByText("ViewAlll")
    }
    public async clickViewAll() {
        await this.click(`${this.viewAll}`,"viewALL","Button");
    }

    public async searchLead(value:string){
        await this.type("//input[@placeholder='Search apps or items...']","searchField",value);
    }

    public async clickLeads(){
        await this.click("//mark[text()='Leads']","Leads","Button");
    }
    
    public async clickNew(){
        await this.click("//div[@title='New']","New","Button");
      //  await this.page.waitForLoadState('domcontentloaded')
    }
    public async clickSalutation(value:string){
        await this.click('button[name="salutation"]',"Salutation",value);
        await this.click("//span[@title='Mr.']","Salutation",value);
    }
    public async enterLeadDetails(leadData:LeadDetails):Promise<string>{
              await this.type("input[placeholder='Last Name']","LastName",leadData.lastName);
              await this.type("input[name='Company']","Company",leadData.companyName);
        return leadData.lastName;
    }
    public async clickSave(value:string){
        await this.click("button[name='SaveEdit']","Save",value)
    }
    public async verifyLead():Promise<string>{
      this. toastMessage= await this.getInnerText("span.toastMessage a")
      await this.page.waitForTimeout(3000);
           return this. toastMessage;
            
    }


    
}