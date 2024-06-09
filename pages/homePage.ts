import { Page, Locator, BrowserContext } from "@playwright/test";
import { PlaywrightWrapper } from "../utils/playwright";
import { URLConstants } from "../constants/urlConstants";

export class HomePage extends PlaywrightWrapper {

    static pageUrl = URLConstants.homeURL;
    constructor(page: Page,context:BrowserContext) {
        super(page,context);
        this.init();
    }
    public async init() {
        await this.loadApp(HomePage.pageUrl);        
    }
    public async clickAppLancher(menuName: string) {
        await this.click(".slds-icon-waffle",menuName,"Button");
  
    }

public async clickLearnMore(){
    await this.click("//span[text()='Learn More']","LearnMore","Button")
}

public async switchWindow(title:string){
    await this.switchToWindowWithTitle(title);
}
   
public async clickConfirm(){
    await this.click("//button[text()='Confirm']","Confirm Redirect","button")
}

}