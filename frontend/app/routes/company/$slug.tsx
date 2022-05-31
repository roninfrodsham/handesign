import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { gql } from 'graphql-request';

import { client } from '../..//server/graphql-client.server';
import { collectionPageQuery } from "../../server/graphql-queries.server";
import { markdownToHTML } from "../../server/markdownToHTML.server";
import { contentZoneMarkup } from "../../utils/misc";

import { TextImageBlock } from "../../components/text-image-block";
import { ContentZone } from "../../components/content-zone";

export let loader: LoaderFunction = async ({ params }) => {
  const query = collectionPageQuery("pages", params.slug);
  let res = await client.request(gql`${query}`);

  return {
    title: res.pages.data[0].attributes.Title,
    description: markdownToHTML((res.pages.data[0].attributes.Description) ? res.pages.data[0].attributes.Description : ""),
    coverImage: res.pages.data[0].attributes.CoverImage,
    contentZone: contentZoneMarkup(res.pages.data[0].attributes.ContentZone),
  }
};

export default function Company() {
  const { title, description, coverImage, contentZone } = useLoaderData();
  const textImageBlock = {
    title: title,
    description: description,
    imageData: {
      imageArray: coverImage,
      mode: "Landscape",
    }
  };

  return (
    <>
      <TextImageBlock blockData={textImageBlock} />
      {contentZone.length > 0 ? <ContentZone contentZone={contentZone} /> : null}
    </>
  );
}