import { Page, Locator, BrowserContext } from "@playwright/test";
import { PlaywrightWrapper } from "../utils/playwright";
import { URLConstants } from "../constants/urlConstants";

export class crmsfaPage extends PlaywrightWrapper {

    static pageUrl = URLConstants.leaftaps;
    constructor(page: Page,context:BrowserContext) {
        super(page,context);
        this.common();
    }
    public async common() {
        await this.loadApp(crmsfaPage.pageUrl);        
    }

    public async ClickCrmsfa(Menu:string){
        await this.click("a:has-text('CRM/SFA')",Menu,"Button")
        await this.page.waitForEvent('load')
    }
   
    }