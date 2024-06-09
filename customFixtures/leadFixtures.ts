import {test as baseTest} from '@playwright/test'
import { loginFunctionality } from '../pages/loginpage';
import { HomePage } from "../pages/homePage";
import { LeadsPage } from '../pages/leadsPage';
import { EditLeadPage } from '../pages/editLeadPage';
import { DeleteLeadPage } from '../pages/deleteLead';
import { leaftapsLogin } from "../pages/leaftapsLogin";
import { crmsfaPage } from '../pages/crmsfaPage';
import { leafLead } from '../pages/leafLead';
import { mergeLead } from '../pages/mergeLead';

type LeadsFixture={
    sflogin:loginFunctionality;
    sfhome:HomePage;
    sflead:LeadsPage;
    sfeditlead:EditLeadPage
    sfdellead:DeleteLeadPage

    leafLogin: leaftapsLogin;
    crmsfa: crmsfaPage
    tapsLead:leafLead
    merge:mergeLead
}
export const test=baseTest.extend<LeadsFixture>({
    sflogin:async({page,context},use)=>{
            const lp=new loginFunctionality(page,context);
            await lp.doLogin("vidyar@testleaf.com","Sforce@123");
            await use(lp);
            console.log("Login is verified")
            await lp.storeState("./sfstoragestate.json")
          
    },  
     sfhome:async({context,page},use)=>{
        const hp=new HomePage(page,context)
        await use(hp);
     },
     sflead:async({context,page},use)=>{
        const ldpagep=new LeadsPage(page,context)
        await use(ldpagep);
     },
     sfeditlead:async({context,page},use)=>{
      const elpage=new EditLeadPage(page,context)
      await use(elpage);
   },
   sfdellead:async({context,page},use)=>{
      const dlpage=new DeleteLeadPage(page,context)
      await use(dlpage);
   },
   leafLogin:async({context,page},use)=>{
      const leaflog=new leaftapsLogin(page,context)
      await leaflog.tapsLogin("DemoSalesManager","crmsfa")
      await use(leaflog);
      console.log("Successfully Logged")
      await leaflog.storeState("./leaftoragestate.json")
   },
   crmsfa:async({page,context},use)=>{
      const csfa=new crmsfaPage(page,context)
      await use(csfa)
   },
   tapsLead:async({page,context},use)=>{
      const mLead=new leafLead(page,context)
      await use(mLead)
   },
   merge:async({page,context},use)=>{
       const merLead= new mergeLead(page,context)
       await use(merLead)
   }
})

export {expect} from '@playwright/test'

