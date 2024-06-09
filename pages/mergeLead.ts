import { BrowserContext, Locator, Page } from "@playwright/test";
import { URLConstants } from "../constants/urlConstants";
import { PlaywrightWrapper } from "../utils/playwright";
import { HomePage } from "./homePage";
import { LeadDetails } from "../utils/TestData/testdata";
import { leafLead } from "./leafLead";

export class mergeLead extends leafLead {

    async ClickMergeLead(Menu: string) {
        await this.click("//a[text()='Merge Leads']", Menu, "Button")
        await this.page.waitForLoadState('load')
    }

    async ClickFromLead(Menu: string) {
        await this.click("table[id='widget_ComboBox_partyIdFrom']+input+a", Menu, "Button")
    }

    async FindFromLeadsWindows(PageTitle: string) {
        const webPage = await this.switchToWindowWithTitle(PageTitle);

        if (webPage) {
            await webPage.click("(//table[contains(@class,'row-table')]/tbody/tr[1]/td)[1]//a", { force: true });
            await this.page.waitForTimeout(2000);
        } else {
            console.log("Could not switch to the 'Find Leads' window.");
        }
    }

    async FindToLeadsWindows(PageTitle: string) {
        const webPage = await this.switchToWindowWithTitle(PageTitle);

        if (webPage) {
            await webPage.click("(//table[contains(@class,'row-table')]/tbody/tr[1]/td[1])[2]//a", { force: true });
            await this.page.waitForTimeout(2000);
        } else {
            console.log("Could not switch to the 'Find Leads' window.");
        }
    }

    async ClickToLead(Menu: string) {
        await this.click("table[id='widget_ComboBox_partyIdTo']+input+a", Menu, "Button")
    }

    // async ClickMerge(Menu: string) {
    //     await this.click("//table/tbody/tr/td/a[text()='Merge']", Menu, "Button")
    //     await this.acceptAlert("Test")
    //     await this.page.waitForTimeout(5000)
    // }

    async ClickMerge(Menu: string) {
        await this.acceptAlert("Test")
        await this.mouseHover(Menu,"//table/tbody/tr/td/a[text()='Merge']","Button")
        await this.page.waitForTimeout(10000)
       
       
    }

}