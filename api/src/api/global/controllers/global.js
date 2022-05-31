"use strict";

/**
 *  global controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::global.global");

// const marked = require("marked");

// module.exports = createCoreController("api::global.global", ({ strapi }) => ({
//   async find(ctx) {
//     ctx.query = { ...ctx.query, local: "en" };

//     const { data } = await super.find(ctx);
//     const categories = await strapi.entityService.findMany(
//       "api::category.category",
//       { publicationState: "live", fields: ["Title", "Slug"] }
//     );
//     const pages = await strapi.entityService.findMany("api::page.page", {
//       publicationState: "live",
//       fields: ["Title", "Slug"],
//     });

//     return {
//       categories: categories,
//       pages: pages,
//       londonShowroom: marked.parse(data.attributes.LondonShowroom, {
//         breaks: true,
//       }),
//       cheshireShowroom: marked.parse(data.attributes.CheshireShowroom, {
//         breaks: true,
//       }),
//     };
//   },
// }));
