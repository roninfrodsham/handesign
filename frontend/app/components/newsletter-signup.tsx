import { useRef, useEffect, useState } from "react";
import { useFetcher } from "@remix-run/react";

function NewsletterSignup() {
  const newsletter = useFetcher();
  const inputRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [ formComplete, setFormComplete ] = useState(false)

  useEffect(() => {
    if(newsletter.type === "done") {
      setFormComplete(true);
    }
    if(newsletter.type === "actionSubmission") {
      console.log("ACTION actionSubmission", newsletter);
    }
  }, [newsletter]);

  return (
    <div className="mtl newsletter">
      <newsletter.Form method="post" action="/newsletter/subscribe" aria-hidden={formComplete === true} ref={formRef}>
        <p className="large">Subscribe to our newsletter</p>
        <input aria-label="Email address" ref={inputRef} type="email" name="email" placeholder="you@example.com" />
        <button type="submit" className="button">Subscribe</button>
      </newsletter.Form>
      <div aria-hidden={formComplete === false}>
        <p className="large" ref={successRef} tabIndex={-1}>
          You're subscribed!
        </p>
        <p>You'll receive updates and product news from Hetherington Newman.</p>
        <button onClick={() => { setFormComplete(false) }}>Reload form</button>
      </div>
    </div>
  );
}

export { NewsletterSignup };