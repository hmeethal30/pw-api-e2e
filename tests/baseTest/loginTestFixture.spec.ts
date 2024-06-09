import { test, expect } from '../../customFixtures/leadFixtures';
//import { loginFunctionality } from "../pages/loginpage";

test(`Login to SF`, async ({ sflogin, sfhome }) => {
  test.setTimeout(120000)
  const title = await sflogin.getTitle();
  console.log(title)


})

