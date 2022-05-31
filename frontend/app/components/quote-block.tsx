export interface QuoteBlockProps {
  name: string;
  quote: string;
}

function QuoteBlock({name, quote}: QuoteBlockProps) {

  return (
    <div className="text-block">
      <div className="container">
        <p>"{quote}"<br />{name}</p>
      </div>
    </div>
  );
}

export { QuoteBlock }