import { BrowserContext, Page ,Locator} from "@playwright/test";
import { EditLeadPage } from "./editLeadPage";



export class DeleteLeadPage extends EditLeadPage{

   
constructor(page:Page,context:BrowserContext){
    super(page,context)
}

 public async searchtoDeleteLead(leadName:string){ 
   await this.type("[placeholder='Search this list...']","Search",leadName)
  }

  public async clickOndelLead(leadName:string){
    await this.click(`a[title*=${leadName}]`,"Exisiting Lead", "link")
}

 public async clickDeletebutton(){
    await this.click("//span[text()='Delete']","Delete","button");
 }
 
 public async confirmDelete(){
   await this.click("button[title='Delete']","Confirm Delete","button");
}

 public async clickCancelbutton(){
    await this.click("//span[text()='Cancel']","Cancel","button");
 }


}