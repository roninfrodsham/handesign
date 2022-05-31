import { ImageBlock } from "./image-block";
import { QuoteBlock } from "./quote-block";
import { TextBlock } from "./text-block";

export interface ContentZoneProps {
  contentZone: any;
}

function ContentZone({ contentZone }: ContentZoneProps) {
  return (
    <>
      {contentZone.length > 0 ? (
        contentZone.map((zone, index) => {
          switch (zone.__typename) {
            case "ComponentSharedOneImageBlock": return <ImageBlock imageData={[{imageArray: zone, mode: "Fullwidth"}]} key={`${contentZone.length}-${index}`} />;
            case "ComponentSharedTwoImageBlock": return <ImageBlock imageData={[{imageArray: zone, mode: "Landscape"}, {imageArray: zone, mode: "Portrait"}]} key={`${contentZone.length}-${index}`} />;
            case "ComponentSharedThreeImageBlock": return <ImageBlock imageData={[{imageArray: {imagePortrait: zone.imagePortraitOne}, mode: "Portrait"}, {imageArray: {imagePortrait: zone.imagePortraitTwo}, mode: "Portrait"}, {imageArray: {imagePortrait: zone.imagePortraitThree}, mode: "Portrait"}]} key={`${contentZone.length}-${index}`} />;
            case "ComponentSharedTextBlock": return <TextBlock text={zone.Text} key={`${contentZone.length}-${index}`} />;
            case "ComponentSharedQuoteBlock": return <QuoteBlock quote={zone.quote.data.attributes.Quote} name={zone.quote.data.attributes.Name} key={`${contentZone.length}-${index}`} />;
          }
        })
      ) : null}
    </>
  );
}

export { ContentZone }