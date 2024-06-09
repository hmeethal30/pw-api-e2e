import { BrowserContext, Page } from "@playwright/test";
import { URLConstants } from "../constants/urlConstants";
import { PlaywrightWrapper } from "../utils/playwright";
export class leaftapsLogin extends PlaywrightWrapper{

    static pageUrl = URLConstants.leaftaps;
    constructor(page: Page,context:BrowserContext) {
        super(page,context);
        this.loadApp(leaftapsLogin.pageUrl);
    }


    public async tapsLogin(username:string,password:string){
        await this.type("#username","Username",username);
        await this.type("#password","password",password);
        await this.click("//input[@class='decorativeSubmit']","Login","Button");
        await this.page.waitForLoadState('domcontentloaded')
      
    }
}