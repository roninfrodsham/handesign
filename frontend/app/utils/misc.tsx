import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { markdownToHTML } from "../server/markdownToHTML.server";

function getData(rawData: any, mode: string, contentType: string) {
  return {
    imageArray: rawData.CoverImage,
    mode: mode,
    pageUrl: `${contentType}${rawData.Slug}`,
    pageTitle: rawData.Title,
  }
}

function createMarkup(markup: string) {
  return {__html: markup};
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function contentZoneMarkup(contentZone: any[]) {
  return contentZone.map(zone => {
    if (zone.__typename === "ComponentSharedTextBlock") {
      return {
        __typename: "ComponentSharedTextBlock",
        Text: markdownToHTML(zone.Text), 
      }
    } else {
      return zone;
    }
  });
}

export {getData, createMarkup, ScrollToTop, contentZoneMarkup};