import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { gql } from 'graphql-request';

import { client } from '../..//server/graphql-client.server';
import { collectionPageQuery } from "../../server/graphql-queries.server";
import { markdownToHTML } from "../../server/markdownToHTML.server";
import { contentZoneMarkup } from "../../utils/misc";

import { ImageBlock } from "../../components/image-block";
import { TextBlock } from "../../components/text-block";
import { ContentZone } from "../../components/content-zone";

export let meta: MetaFunction = ({ data }) => {
  if (data?.SEO) {
    return {
      title: data.SEO.metaTitle,
      description: data.SEO.metaDescription
    };
  }
};

export let loader: LoaderFunction = async ({ params }) => {
  const query = collectionPageQuery("projects", params.slug);
  let res = await client.request(gql`${query}`);
  
  if (!res.projects.data.length) {
    throw new Response("Not Found", {
      status: 404,
      statusText: "Project Not Found"
    });
  }

  return {
    title: res.projects.data[0].attributes.Title,
    description: markdownToHTML((res.projects.data[0].attributes.Description) ? res.projects.data[0].attributes.Description : ""),
    SEO: (res.projects.data[0].attributes.SEO) ? res.projects.data[0].attributes.SEO : null,
    coverImage: res.projects.data[0].attributes.CoverImage,
    contentZone: contentZoneMarkup(res.projects.data[0].attributes.ContentZone),
  }
};

export default function Project() {
  let {title, description, coverImage, contentZone} = useLoaderData();
  
  return (
    <>
      <ImageBlock imageData={[{imageArray: coverImage, mode: "Cover", pageTitle: title, heading: false}]} />
      <TextBlock text={`<h1>${title}</h1>${description}`} />
      {contentZone.length > 0 ? <ContentZone contentZone={contentZone} /> : null}
    </>
  )
}