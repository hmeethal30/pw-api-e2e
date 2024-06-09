import { test, expect } from '../../customFixtures/leadFixtures';
//import { loginFunctionality } from "../pages/loginpage";

test(`Login to SF`, async ({leafLogin }) => {
  test.setTimeout(120000)
  const title = await leafLogin.getTitle();
  console.log(title)


})

