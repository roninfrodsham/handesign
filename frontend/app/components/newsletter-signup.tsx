import { useRef } from "react";
import { Link, useFetcher } from "@remix-run/react";

function NewsletterSignup() {
  const newsletter = useFetcher();

  const inputRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLInputElement>(null);

  return (
    <div className="mtl newsletter">
      <newsletter.Form method="post" action="/newsletter/subscribe" aria-hidden="false">
        <p className="large">Subscribe to our newsletter</p>
        <input aria-label="Email address" ref={inputRef} type="email" name="email" placeholder="you@example.com" />
        <button type="submit" className="button">Subscribe</button>
      </newsletter.Form>
      <div aria-hidden="true">
        <p className="large" ref={successRef} tabIndex={-1}>
          You're subscribed!
        </p>
        <p>You'll receive updates and product news from Hetherington Newman.</p>
        <Link to=".">Reload form</Link>
      </div>
    </div>
  );
}

export { NewsletterSignup };