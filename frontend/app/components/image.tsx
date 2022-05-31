import { useContext } from "react";
import { Link } from "react-router-dom";
import type { ListItem } from '~/types';
import { ConditionalWrapper } from "./conditional-wrapper";
import { EnvContext } from '../utils/provider';

export interface ImageProps {
  imageData: ListItem
}

function Image({imageData}: ImageProps) {
  let env: any = useContext(EnvContext);

  return (
    <div className={`image-${imageData.mode}-container`}>
      <div className={`${imageData.mode}-wrapper`}>
        <div className={`image ${imageData.mode}`}>
          <ConditionalWrapper condition={imageData.pageUrl} wrapper={children => <Link to={imageData.pageUrl} className="image-wrapper">{children}</Link>}>
            {imageData.mode == "Cover" && (
              <picture>
                  <source media="(max-width: 767px)" srcSet={`${env.apiHost}${imageData.imageArray.imagePortrait.data.attributes.url}`} />
                  <source media="(min-width: 768px)" srcSet={`${env.apiHost}${imageData.imageArray.imageLandscape.data.attributes.url}`} />
                  <img src={`${env.apiHost}${imageData.imageArray.imageLandscape.data.attributes.url}`} alt={imageData.pageTitle} loading="lazy" />
              </picture>
            )}
            {imageData.mode == "Fullwidth" && (
              <picture>
                <source media="(max-width: 767px)" srcSet={`${env.apiHost}${imageData.imageArray.imageLandscape.data.attributes.formats.medium.url}`} />
                <source media="(min-width: 768px)" srcSet={`${env.apiHost}${imageData.imageArray.imageLandscape.data.attributes.url}`} />
                <img src={`${env.apiHost}${imageData.imageArray.imageLandscape.data.attributes.url}`} loading="lazy" alt={imageData.pageTitle} />
              </picture>
            )}
            {imageData.mode == "Landscape" && (
              <picture>
                <source media="(max-width: 767px)" srcSet={`${env.apiHost}${imageData.imageArray.imageLandscape.data.attributes.formats.medium.url}`} />
                <source media="(min-width: 768px)" srcSet={`${env.apiHost}${imageData.imageArray.imageLandscape.data.attributes.formats.large.url}`} />
                <img src={`${env.apiHost}${imageData.imageArray.imageLandscape.data.attributes.formats.large.url}`} loading="lazy" alt={imageData.altText} />
              </picture>
            )}
            {imageData.mode == "Portrait" && <img src={`${env.apiHost}${imageData.imageArray.imagePortrait.data.attributes.url}`} loading="lazy" alt={imageData.altText} />}
            {imageData.pageUrl && <div className="centre"><p className="extra-large">{imageData.pageTitle}</p><p className="medium">Read More</p></div>}
          </ConditionalWrapper>
        </div>
      </div>
    </div>
  );
}

export { Image }