import type { MetaFunction, LoaderFunction, ActionFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { gql } from 'graphql-request';
import { client } from '~/server/graphql-client.server';
import { homepageQuery } from "~/server/graphql-queries.server";
import { markdownToHTML } from "~/server/markdownToHTML.server";
import { ImageBlock } from "~/components/image-block";
import { TextBlock } from "~/components/text-block";

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
    </>
  );
}
