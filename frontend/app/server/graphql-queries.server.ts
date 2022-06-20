const globalQuery: string = `
  query {
    global {
      data {
        attributes {
          LondonShowroom,
          CheshireShowroom
        }
      }
    }
    pages {
      data {
        attributes {
          Title,
          Slug
        }
      }
    }
    categories {
      data {
        attributes {
          Title,
          Slug
        }
      }
    }
  }
`;

const homepageQuery: string = `
  query {
    homepage {
      data {
        attributes {
          Title,
          Description,
          ProjectBlock {
            ...on ComponentSharedProjectBlock {
              FeaturedProject {
                data {
                  attributes {
                    Title,
                    Slug,
                    CoverImage {
                      ...on ComponentSharedCoverImage {
                        id,
                        imagePortrait {
                          data  {
                            attributes {
                              url,
                              formats
                            }
                          }
                        }
                        imageLandscape {
                          data {
                            attributes {
                              url,
                              formats
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              LatestProjectOne {
                data {
                  attributes {
                    Title,
                    Slug,
                    CoverImage {
                      ...on ComponentSharedCoverImage {
                        id,
                        imagePortrait {
                          data  {
                            attributes {
                              url,
                              formats
                            }
                          }
                        }
                        imageLandscape {
                          data {
                            attributes {
                              url,
                              formats
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              LatestProjectTwo {
                data {
                  attributes {
                    Title,
                    Slug,
                    CoverImage {
                      ...on ComponentSharedCoverImage {
                        id,
                        imagePortrait {
                          data  {
                            attributes {
                              url,
                              formats
                            }
                          }
                        }
                        imageLandscape {
                          data {
                            attributes {
                              url,
                              formats
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          QuickLinks {
            ...on ComponentSharedQuickLinks {
              CategoryPage {
                data {
                  attributes {
                    Title,
                    Slug,
                    CoverImage {
                      ...on ComponentSharedCoverImage {
                        id,
                        imagePortrait {
                          data  {
                            attributes {
                              url,
                              formats
                            }
                          }
                        }
                        imageLandscape {
                          data {
                            attributes {
                              url,
                              formats
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              ProjectPage {
                data {
                  attributes {
                    Title,
                    Slug,
                    CoverImage {
                      ...on ComponentSharedCoverImage {
                        id,
                        imagePortrait {
                          data  {
                            attributes {
                              url,
                              formats
                            }
                          }
                        }
                        imageLandscape {
                          data {
                            attributes {
                              url,
                              formats
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              CompanyPage {
                data {
                  attributes {
                    Title,
                    Slug,
                    CoverImage {
                      ...on ComponentSharedCoverImage {
                        id,
                        imagePortrait {
                          data  {
                            attributes {
                              url,
                              formats
                            }
                          }
                        }
                        imageLandscape {
                          data {
                            attributes {
                              url,
                              formats
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          SEO {
            ...on ComponentSharedSeo {
              metaTitle,
              metaDescription
            }
          }
        }
      }
    }
  }
`;

function projectsQuery(category: string): string {
  return `
    query {
      projects (filters: { Category: {Slug: {eq: "${category}"}} }, publicationState: LIVE, sort: "id:desc", pagination: { limit: 100 }) {
        data {
          id,
          attributes {
            Title,
            Slug,
            CoverImage {
              ...on ComponentSharedCoverImage {
                id,
                imagePortrait {
                  data  {
                    attributes {
                      url,
                      formats
                    }
                  }
                }
                imageLandscape {
                  data {
                    attributes {
                      url,
                      formats
                    }
                  }
                }
              }
            }
          }
        }
      }
      categories (filters: { Slug: {eq: "${category}"} }, , publicationState: LIVE, pagination: {limit: 1}) {
        data {
          attributes {
            Title,
            Description,
            SEO {
              ...on ComponentSharedSeo {
                metaTitle,
                metaDescription
              }
            }
            LatestProject {
              data {
                id,
                attributes {
                  Title,
                  Slug,
                  CoverImage {
                    ...on ComponentSharedCoverImage {
                      id,
                      imagePortrait {
                        data  {
                          attributes {
                            url,
                            formats
                          }
                        }
                      }
                      imageLandscape {
                        data {
                          attributes {
                            url,
                            formats
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `
};

function collectionPageQuery (collection: string, slug: string): string {
  return `
    query {
      ${collection}(filters: { Slug: {eq: "${slug}"} }, publicationState: LIVE) {
        data {
          id,
          attributes {
            Title,
            Slug,
            Description,
            CoverImage {
              ...on ComponentSharedCoverImage {
                id,
                imagePortrait {
                  data  {
                    attributes {
                      url,
                      formats
                    }
                  }
                }
                imageLandscape {
                  data {
                    attributes {
                      url,
                      formats
                    }
                  }
                }
              }
            },
            ContentZone {
              __typename
              ...on ComponentSharedOneImageBlock {
                imageLandscape {
                  data {
                    attributes {
                      url,
                      formats
                    }
                  }
                }
              }
              ...on ComponentSharedTwoImageBlock {
                imageLandscape {
                  data {
                    attributes {
                      url,
                      formats,
                    }
                  }
                },
                imagePortrait {
                  data {
                    attributes {
                      url,
                      formats,
                    }
                  }
                },
                landscapeLeft
              }
              ...on ComponentSharedThreeImageBlock {
                imagePortraitOne {
                  data {
                    attributes {
                      url,
                      formats,
                    }
                  }
                },
                imagePortraitTwo {
                  data {
                    attributes {
                      url,
                      formats,
                    }
                  }
                },
                imagePortraitThree {
                  data {
                    attributes {
                      url,
                      formats,
                    }
                  }
                }
              }
              ...on ComponentSharedQuoteBlock {
                quote {
                  data {
                    attributes {
                      Name,
                      Quote
                    }
                  }
                }
              }
              ...on ComponentSharedTextBlock {
                Text
              }
            },
            SEO {
              ...on ComponentSharedSeo {
                metaTitle,
                metaDescription
              }
            }
          }
        }
      }
    }
  `
};

export { globalQuery, homepageQuery, projectsQuery, collectionPageQuery };