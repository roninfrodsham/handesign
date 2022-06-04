import invariant from "tiny-invariant";

export async function action ({ request }) {
  const mailchimp = require("@mailchimp/mailchimp_marketing");
  let formData = await request.formData();
  let email = formData.get("email");
  invariant(email, "Email is required");
  mailchimp.setConfig({
    apiKey: process.env.MC_API_KEY,
    server: process.env.MC_SERVER,
  });
  const response = await mailchimp.lists.addListMember(process.env.MC_LIST_ID, {
    email_address: email,
    status: "subscribed",
  });
  console.log("RESPONSE STATUS", response.status);
  return response;
}