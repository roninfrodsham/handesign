import { createMarkup } from "../utils/misc";
import { NewsletterSignup } from "./newsletter-signup";

export interface FooterProps {
  londonShowroom: string;
  cheshireShowroom: string;
}

function Footer({londonShowroom, cheshireShowroom }: FooterProps) {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <>
      <NewsletterSignup />
      <div className="mtl">
        <p className="large">Do you have a project to discuss?</p>
        <a href="mailto:info@handesign.co.uk" className="button">Book a consultation</a>
      </div>
      <footer>
        <div className="outer-container">
          <img src="/hn_logo.svg" width="300" height="13" alt="Hetherington Newman" className="mb" />
          <div dangerouslySetInnerHTML={createMarkup(`${londonShowroom}${cheshireShowroom}`)}></div>
          <p>Copyright &copy;{year} Handesign Ltd. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export {Footer}