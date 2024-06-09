import { BrowserContext, Page } from "@playwright/test";
import { LeadsPage } from "./leadsPage";
import { LeadDetails } from "../utils/TestData/testdata";

export class EditLeadPage extends LeadsPage{

       constructor(page: Page,context:BrowserContext) {
        super(page,context);
        
     }
     
    public async searchLeadName(leadName:string){ 
    await this.fillwithDelay("input[placeholder='Search this list...']",leadName)
   }

   public async clickOnLead(leadName:string){
        await this.click(`a[title=${leadName}]`,"Exisiting Lead", "link")
   }
   public async clickShowMore(){
    await this.click(`(//span[text()='Show more actions'])[2]`,"ShowMore", "button")
   }
   public async clickEdit(){
    await this.click("//span[text()='Edit']","Edit","button")
   }

   public async enterFirstname(leadData:LeadDetails){
     await this.type("[placeholder='First Name']","Firstname field",leadData.firstName)
   }

   public async clicksaveEdit(){
     await this.clickwithDelay("[name='SaveEdit']");
   }

   public async verifyupdatedLead():Promise<string>{
     return await this.getInnerText(`[id^='toastDescription']`);
   }

   
} 