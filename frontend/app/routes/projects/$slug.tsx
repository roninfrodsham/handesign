import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { gql } from 'graphql-request';

import { client } from '../..//server/graphql-client.server';
import { projectsQuery } from "../../server/graphql-queries.server";
import { markdownToHTML } from "../../server/markdownToHTML.server";

import { ImageBlock } from "../../components/image-block";
import { TextBlock } from "../../components/text-block";
import { getData } from "../../utils/misc";

export let meta: MetaFunction = ({ data }) => {
  if (data.SEO) {
    return {
      title: data.SEO.metaTitle,
      description: data.SEO.metaDescription
    };
  }
};

export let loader: LoaderFunction = async ({ params }) => {
  const query = projectsQuery(params.slug);
  let res = await client.request(gql`${query}`);
  return {
    projects: res.projects.data,
    title: res.categories.data[0].attributes.Title,
    description: markdownToHTML(res.categories.data[0].attributes.Description),
    SEO: res.categories.data[0].attributes.SEO,
    latestProjectId: res.categories.data[0].attributes.LatestProject.data.id,
    latestProject: res.categories.data[0].attributes.LatestProject.data.attributes,
  }
};

export default function ProjectCategory() {
  let latestProjects: Array<any> = [];
  let remainder: number = 0;
  let {projects, title, description, latestProjectId} = useLoaderData();
  // get the featuted project
  const featuredProject = projects.find(project => project.id === latestProjectId);
  // filter out the featured project
  const projectsFiltered = projects.filter(project => project.id !== latestProjectId);

  if(projectsFiltered.length > 0) {
    // get the latest projects
    latestProjects = projectsFiltered.splice(0, 2);
    // get the number remaining projects based on rows of three
    const remainder = projectsFiltered.length % 3;
    // get the remaining projects to tag on after the rows of three
    let remainingProjects;
    if(remainder !== 0) {
      remainingProjects = projectsFiltered.splice(-remainder, remainder);
    }
  }
  // set up array to use for the blocks of 3 portraits projects
  let blockProjects: Array<any> = [];

  return (
    <>
      <ImageBlock imageData={[getData(featuredProject.attributes, "Cover", "/project/")]} />
      <TextBlock text={`<h1>${title}</h1>${description}`} />
      { latestProjects.length ? (<ImageBlock imageData={[getData(latestProjects[0].attributes, "Landscape", "/project/"), getData(latestProjects[1].attributes, "Portrait", "/project/")]} /> ) : null }
      {projectsFiltered.length > 0 ? (
        projectsFiltered.map((project: any, index: number) => {
          blockProjects.push(getData(project.attributes, "Portrait", "/project/"));
          if (blockProjects.length === 3) {
            const imageData = blockProjects;
            blockProjects = [];
            return (
              <ImageBlock key={`block-${index}`} imageData={imageData} />
            )
          }
        })
      ) : null}
      {remainder === 1 ? <ImageBlock imageData={[getData(remainingProjects[0].attributes, "Cover", "/project/")]} /> : null}
      {remainder === 2 ? <ImageBlock imageData={[getData(remainingProjects[0].attributes, "Landscape", "/project/"), getData(remainingProjects[1].attributes, "Portrait", "/project/")]} /> : null} 
    </>
  );
}