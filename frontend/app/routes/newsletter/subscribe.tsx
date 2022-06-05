const mailchimp = require("@mailchimp/mailchimp_marketing");

export async function action ({ request }) {
  let formData = await request.formData();
  let email = formData.get("email");
  mailchimp.setConfig({
    apiKey: process.env.MC_API_KEY,
    server: process.env.MC_SERVER,
  });
  const response = await mailchimp.lists.addListMember(process.env.MC_LIST_ID, {
    email_address: email,
    status: "subscribed",
  });
  return response;
}