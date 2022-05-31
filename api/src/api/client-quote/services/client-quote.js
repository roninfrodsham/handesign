'use strict';

/**
 * client-quote service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::client-quote.client-quote');
