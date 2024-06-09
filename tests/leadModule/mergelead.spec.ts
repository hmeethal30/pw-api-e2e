import  { test} from '../../customFixtures/leadFixtures';
import { mergeLead } from '../../pages/mergeLead';
import { createJiraIssue } from '../../utils/jira-integration';


test.use({ storageState: "leaftoragestate.json" })
test("Click Crmsfa",async({crmsfa,tapsLead,merge})=>{
await crmsfa.ClickCrmsfa("CRM/SFA")
await tapsLead.clickOnLead("Lead")
await merge.ClickMergeLead("Merge")
await merge.ClickFromLead("From Lead")
await merge.FindFromLeadsWindows("Find Leads")
await merge.ClickToLead("To Lead")
await merge.FindToLeadsWindows("Find Leads")
await merge.ClickMerge("Merge")
})
