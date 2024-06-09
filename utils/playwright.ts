import { hr } from "@faker-js/faker";
import { Page, test, expect, BrowserContext } from "@playwright/test";
import { TIMEOUT } from "dns";
import { hasRestParameter, isMinusToken } from "typescript";


declare module '@playwright/test'{
    interface Page{
        delayedFill:(selector:string, value:string) => Promise<void>;
        clickAndDelay:(selector:string) => Promise<void>;
    }

}

export abstract class PlaywrightWrapper {

    readonly page: Page;
    readonly context: BrowserContext
    index: number
    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
    }
    /*
    This function types on the given element textbox after clearing the existing text
    @page: The page object to be passed
    @locator: The element locator
    @name: Name of the element
    @data: Data to be typed
    */
    async type(locator: string, name: string, data: string) {
        await test.step(`Textbox ${name} filled with data: ${data}`, async () => {
            //  await this.page.locator(locator).clear();
            await this.page.locator(locator).fill(data);

        });
    }
    /*
    This function types on the given element textbox and press <ENTER> after clearing the existing text
    @page: The page object to be passed
    @locator: The element locator
    @name: Name of the element
    @data: Data to be typed
    */
    async typeAndEnter(locator: string, name: string, data: string) {
        await test.step(`Textbox ${name} filled with data: ${data}`, async () => {

            await this.page.locator(locator).clear();
            await this.page.locator(locator).fill(data);
            await this.page.keyboard.press("Enter");

        });
    }
    /*
    This function clicks on the given element textbox
    @page: The page object to be passed
    @locator: The element locator
    @name: Name of the element
    */
    async click(locator: string, name: string, type: string) {
        await test.step(`The ${type} ${name} clicked`, async () => {
            await this.page.locator(locator).click({force:true});
        });
    }
    async storeState(path: string) {
        await this.page.context().storageState({ path: path })
    }
    async loadApp(url: string) {
        try {
            await test.step(`The URL ${url} loaded`, async () => {
                await this.page.goto(url, { timeout: 60000 }); // Increased timeout
            });
        } catch (error) {
            console.error('Error loading the page:', error);
        }
    }
    async getInnerText(locator: string): Promise<string> {
        return await this.page.locator(locator).innerText();
    }
    async getText(locator: string): Promise<string> {
        return await this.page.locator(locator).inputValue();

    }
    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    async multipleWindowsCount(): Promise<number> {
        const windowslength = this.page.context().pages().length;
        return windowslength;
    }

    async fillwithDelay(locator:string ,inputValues:string){
        await this.page.delayedFill(locator,inputValues)
    }
   
    async clickwithDelay(locator:string){
        await this.page.clickAndDelay(locator);
    }
    async switchToWindowWithTitle(windowTitle: string) {
        const [multiPage] = await Promise.all([
            this.context.waitForEvent('page'),
        ]);
        const pages = multiPage.context().pages(); 
        
        console.log(`Number of pages opened: ${pages.length}`);
        
        for (const page of pages) {
            const url = page.url();
            console.log(`URL of the page is : ${url}`);
            
            const title = await page.title();
            console.log(`Title of the page: ${title}`);

            if (title === windowTitle) {
                console.log(`Switching to the page with title: ${windowTitle}`);
                await page.bringToFront();
                return page;
            }
        } 
        console.log(`No page found with title: ${windowTitle}`);
        return null;
    }

    async acceptAlert(Data:string) {
       this.page.on("dialog", async (dialog) => {
            dialog.message()
            await dialog.accept(Data);
            console.log('Dialog Message:', dialog.message());
        });
    }
    //i:number;
    async clickinFrame(frameLocator: string, locator: string, name: string, type: string, index: number) {
        await test.step(`The ${type} ${name} clicked`, async () => {
            const frameCount = 1;
            await this.page.locator(frameLocator).count();
            if (frameCount > 0) {
                await this.page.frameLocator(frameLocator).locator(locator).nth(index).click();
            } else {
                await this.page.locator(locator).click();
            }
        })
    }
    async typeinFrame(flocator: string, locator: string, name: string, data: string) {
        await test.step(`Textbox ${name} filled with data: ${data}`, async () => {
            const frameCount = 1;
            if (frameCount > 0) {
                await this.page.frameLocator(flocator).locator(locator).clear();
                await this.page.frameLocator(flocator).locator(locator).fill(data);
                await this.page.keyboard.press("Enter");
            } else {
                await this.page.locator(locator).clear();
                await this.page.locator(locator).fill(data);
                await this.page.keyboard.press("Enter");
            }
        });
    }

    async mouseHover(Menu:string, locator: string, name:string) {
        await test.step(`The ${Menu} ${name} clicked`, async () => {
        await this.page.hover(locator);
        await this.page.click(locator);

        })
    }
}
