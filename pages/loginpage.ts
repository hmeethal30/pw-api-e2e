import { BrowserContext, Page } from "@playwright/test";
import { URLConstants } from "../constants/urlConstants";
import { PlaywrightWrapper } from "../utils/playwright";
export class loginFunctionality extends PlaywrightWrapper{

    static pageUrl = URLConstants.baseURL;
    constructor(page: Page,context:BrowserContext) {
        super(page,context);
        this.loadApp(loginFunctionality.pageUrl);
    }

    public async doLogin(username: string, password: string) {
        await this.type("#username","Username",username);
        await this.type("#password","password",password);
        await this.click("#Login","Login","Button");
        await this.page.waitForLoadState('domcontentloaded')
      
        }

     
}
