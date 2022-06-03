import type { LinksFunction, LoaderFunction, ActionFunction } from "@remix-run/node";
import { Meta, Links, Scripts, LiveReload, useLoaderData, Form, useActionData } from "@remix-run/react";
import { Outlet } from "react-router-dom";
import { gql } from 'graphql-request';
import invariant from "tiny-invariant";
import { client } from '~/server/graphql-client.server';
import { globalQuery } from "~/server/graphql-queries.server";
import { markdownToHTML } from "~/server/markdownToHTML.server";
import stylesUrl from "~/styles/global.css";
import { EnvProvider } from "~/utils/provider";
import { ScrollToTop } from "~/utils/misc";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export let loader: LoaderFunction = async () => {
  let res = await client.request(gql`${globalQuery}`);
  return {
    londonShowroom: markdownToHTML(res.global.data.attributes.LondonShowroom),
    cheshireShowroom: markdownToHTML(res.global.data.attributes.CheshireShowroom),
    pages: res.pages.data,
    categories: res.categories.data,
    API_HOST: process.env.API_HOST,
  };
};

export let action: ActionFunction = async ({request}) => {
  let formData = await request.formData();
  let email = formData.get("email");
  invariant(email, "email is required");
  const mailchimp = require("@mailchimp/mailchimp_marketing");
  mailchimp.setConfig({
    apiKey: process.env.MC_API_KEY,
    server: process.env.MC_SERVER,
  });
  const response = await mailchimp.lists.addListMember(process.env.MC_LIST_ID, {
    email_address: email,
    status: "subscribed",
  });
  console.log(response);

  return {
    ok: true
  };
}

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet"></link>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover"></meta>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export default function App() {
  let data = useLoaderData();
  let actionData = useActionData();

  return (
    <Document>
      <ScrollToTop />
      <EnvProvider API_HOST={data.API_HOST}>
        <Header pages={data.pages} categories={data.categories} />
        <Outlet />
        <div className="mtl">
          <p className="large">Subscribe to our newsletter</p>
          <Form method="post">
            <input type="email" name="email" placeholder="you@example.com" />
            <button type="submit" className="button">Subscribe</button>
            <p>{actionData?.error ? actionData.message : <>&nbsp;</>}</p>
          </Form>
        </div>
        <Footer londonShowroom={data.londonShowroom} cheshireShowroom={data.cheshireShowroom} />
      </EnvProvider>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <h1>App Error</h1>
      <pre>{error.message}</pre>
      <p>An error occured, go the homepage.</p>
    </Document>
  );
}
