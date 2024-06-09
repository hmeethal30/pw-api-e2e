// import { loginFunctionality } from "../pages/loginpage";
// import { HomePage } from "../pages/homePage";
import  { test} from '../../customFixtures/leadFixtures';
import { createJiraIssue } from '../../utils/jira-integration';
import { generateRandomData } from '../../utils/TestData/randomTestdat';

let leadName:string;
let editedLead:string;
let lname:string;
test.use({ storageState: "sfstoragestate.json" })
test.beforeEach("PreCondition steps ",async({sfhome,sflead})=>{
    await sfhome.clickAppLancher("AppLauncher");
    await sflead.clickViewAll();
    await sflead.searchLead("Leads");
    await sflead.clickLeads();
})
test(`Create lead`, async ({sflead},testInfo) => {   
  test.setTimeout(120000);    
    await sflead.clickNew();
    await sflead.clickSalutation("Mr");   
    lname=await sflead.enterLeadDetails(generateRandomData())
    console.log(lname)
    await sflead.clickSave("Button");
    leadName=await sflead.verifyLead();
    console.log(leadName);
    
   }) 
test(`EditLead lead`, async ({sfeditlead}) => {   
  test.setTimeout(120000);        
    await sfeditlead.searchLeadName(lname)
      await sfeditlead.clickOnLead(lname);
    await sfeditlead.clickShowMore();
    await sfeditlead.clickEdit();
    await sfeditlead.enterFirstname(generateRandomData())
    await sfeditlead.clicksaveEdit();
  editedLead=await sfeditlead.verifyupdatedLead();
  createJiraIssue("Saleforce edit testcase","test to log defect for Edit Lead")
 })
 test(`Delete lead`, async ({sfeditlead,sfdellead}) => {         
  test.setTimeout(120000);    
      await sfeditlead.searchLeadName(lname)
    await sfdellead.clickOndelLead(lname);
    await sfeditlead.clickShowMore();
    await sfdellead.clickDeletebutton();
    await sfdellead.confirmDelete();
   const tm= await sfeditlead.verifyupdatedLead();   
  console.log(tm)
    //createJiraIssue("Saleforce testcase","logging defect for delete Lead") }

 })



