"use strict";

/**
 *  homepage controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

function prepareData({ Title, Slug, Description, CoverImage }) {
  const imagePortrait = {
    original: CoverImage.imagePortrait.data.attributes.url,
    small: CoverImage.imagePortrait.data.attributes.formats.small.url,
    medium: CoverImage.imagePortrait.data.attributes.formats.medium.url,
  };

  const imageLandscape = {
    original: CoverImage.imageLandscape.data.attributes.url,
    small: CoverImage.imageLandscape.data.attributes.formats.small.url,
    medium: CoverImage.imageLandscape.data.attributes.formats.medium.url,
    large: CoverImage.imageLandscape.data.attributes.formats.large.url,
  };

  return {
    Title,
    Slug,
    Description,
    imagePortrait,
    imageLandscape,
  };
}

module.exports = createCoreController(
  "api::homepage.homepage",
  ({ strapi }) => ({
    async find(ctx) {
      ctx.query = {
        ...ctx.query,
        local: "en",
        populate: [
          "ProjectBlock.FeaturedProject.CoverImage.imageLandscape",
          "ProjectBlock.FeaturedProject.CoverImage.imagePortrait",
          "ProjectBlock.LatestProjectOne.CoverImage.imageLandscape",
          "ProjectBlock.LatestProjectOne.CoverImage.imagePortrait",
          "ProjectBlock.LatestProjectTwo.CoverImage.imageLandscape",
          "ProjectBlock.LatestProjectTwo.CoverImage.imagePortrait",
          "QuickLinks.CategoryPage.CoverImage.imageLandscape",
          "QuickLinks.CategoryPage.CoverImage.imagePortrait",
          "QuickLinks.ProjectPage.CoverImage.imageLandscape",
          "QuickLinks.ProjectPage.CoverImage.imagePortrait",
          "QuickLinks.CompanyPage.CoverImage.imageLandscape",
          "QuickLinks.CompanyPage.CoverImage.imagePortrait",
          "SEO",
        ],
      };

      const { data } = await super.find(ctx);

      return {
        Title: data.attributes.Title,
        Description: data.attributes.Description,
        SEO: data.attributes.SEO,
        FeaturnedProject: prepareData(
          data.attributes.ProjectBlock.FeaturedProject.data.attributes
        ),
        LatestProjectOne: prepareData(
          data.attributes.ProjectBlock.LatestProjectOne.data.attributes
        ),
        LatestProjectTwo: prepareData(
          data.attributes.ProjectBlock.LatestProjectTwo.data.attributes
        ),
        CompanyPage: prepareData(
          data.attributes.QuickLinks.CompanyPage.data.attributes
        ),
        ProjectPage: prepareData(
          data.attributes.QuickLinks.ProjectPage.data.attributes
        ),
        CategoryPage: prepareData(
          data.attributes.QuickLinks.CategoryPage.data.attributes
        ),
      };
    },
  })
);
