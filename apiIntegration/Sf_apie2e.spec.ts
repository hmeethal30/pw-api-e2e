import {test} from '../customFixtures/leadFixtures';
import { generateToken } from './authGenerator'
import {generateRandomData } from '../utils/TestData/randomTestdat';
import { getRandomValues } from 'crypto';
let access:any
let uri:any
let leadId:any;
let leadNamefromApi:any;
//let leadNameUi:string

test(`Generate AuthToken`,async ()=>{
     const authtoken= await generateToken();
     access =authtoken.accessToken;
     uri=authtoken.instanceUri;
  })  
 test(`Create a record with salesforce`,async({request})=>{
    const response =await request.post("https://testleaf-da-dev-ed.develop.my.salesforce.com/services/data/v60.0/sobjects/Lead",{
       headers:{
           "Content-Type":"application/json",
           "Authorization":"Bearer "+access
       },
       data:{           
               "LastName": generateRandomData().lastName,
               "Company":  generateRandomData().companyName
           }    
    });
    const responseData=await response.json();
    leadId= responseData.id;
    console.log(leadId)
  
})


test(`Get the lead record`, async ({request}) => {
    //const requestCall = page.request;

    const response = await request.get(`https://testleaf-da-dev-ed.develop.my.salesforce.com/services/data/v60.0/sobjects/Lead/${leadId}`,
        {
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+access
            },

        });

    const res = await response.json();
    leadNamefromApi=res.LastName;
    console.log(leadNamefromApi)
    console.log(response.status());
})

test(`EditLead lead`, async ({sflogin,sfhome,sflead,sfeditlead}) => {     
    test.setTimeout(120000)
    await sfhome.clickAppLancher("AppLauncher");
    await sflead.clickViewAll();
    await sflead.searchLead("Leads");
    await sflead.clickLeads();    
    await sfeditlead.searchLeadName(leadNamefromApi);
    await sfeditlead.clickOnLead(leadNamefromApi);
    await sfeditlead.clickShowMore();
    await sfeditlead.clickEdit();
    await sfeditlead.enterFirstname(generateRandomData())
    await sfeditlead.clicksaveEdit();  
   console.log(await sfeditlead.verifyupdatedLead());
 })

