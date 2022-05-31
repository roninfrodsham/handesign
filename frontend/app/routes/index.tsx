import type { MetaFunction, LoaderFunction, ActionFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { gql } from 'graphql-request';
import invariant from "tiny-invariant";

import { client } from '~/server/graphql-client.server';
import { homepageQuery } from "~/server/graphql-queries.server";
import { markdownToHTML } from "~/server/markdownToHTML.server";

import { ImageBlock } from "~/components/image-block";
import { TextBlock } from "~/components/text-block";

export let action: ActionFunction = async ({request}) => {
  let formData = await request.formData();
  let email = formData.get("email");
  invariant(email, "email is required");
  const endPoint = "https://handesign.us11.list-manage.com/subscribe/post?u=7869a7c5462cc9b797ede22b8&amp;id=3cccdc3e9b";
  let res = await fetch(endPoint);
  return res;
}

export let meta: MetaFunction = ({ data }) => {
  if(data.SEO) {
    return {
      title: data.SEO.metaTitle,
      description: data.SEO.metaDescription
    };
  }
};

export let loader: LoaderFunction = async () => {
  let res = await client.request(gql`${homepageQuery}`);
  
  return {
    homePage: res.homepage.data.attributes,
    title: res.homepage.data.attributes.Title,
    description: markdownToHTML(res.homepage.data.attributes.Description),
    featuredProject: res.homepage.data.attributes.ProjectBlock.FeaturedProject.data.attributes,
    latestProjectOne: res.homepage.data.attributes.ProjectBlock.LatestProjectOne.data.attributes,
    latestProjectTwo: res.homepage.data.attributes.ProjectBlock.LatestProjectTwo.data.attributes,
    categoryPage: res.homepage.data.attributes.QuickLinks.CategoryPage.data.attributes,
    projectPage: res.homepage.data.attributes.QuickLinks.ProjectPage.data.attributes,
    companyPage: res.homepage.data.attributes.QuickLinks.CompanyPage.data.attributes,
    SEO: res.homepage.data.attributes.SEO,
  }
};

function getData(rawData: any, mode: string, contentType: string) {
  return {
    imageArray: rawData.CoverImage,
    mode: mode,
    pageUrl: `${contentType}${rawData.Slug}`,
    pageTitle: rawData.Title,
  }
}

export default function Index() {
  let { description, featuredProject, latestProjectOne, latestProjectTwo, categoryPage, projectPage, companyPage } = useLoaderData();

  return (
    <>
      <ImageBlock imageData={[getData(featuredProject, "Cover", "/project/")]} />
      <ImageBlock imageData={[getData(latestProjectOne, "Landscape", "/project/"), getData(latestProjectTwo, "Portrait", "/project/")]} />
      <TextBlock text={description} />
      <ImageBlock imageData={[getData(projectPage, "Portrait", "/project/"), getData(categoryPage, "Portrait", "/projects/"), getData(companyPage, "Portrait", "/company/")]} />
      <div className="mtl">
        <p className="large">Subscribe to our newsletter</p>
        <Form method="post">
          <input type="email" name="email" placeholder="you@example.com" />
          <button type="submit" className="button">Subscribe</button>   
        </Form>
      </div>
    </>
  );
}
