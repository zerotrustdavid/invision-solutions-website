"use client";

import { useState, type FormEvent } from "react";

const ENGAGEMENT_TYPES = [
  "Fixed-scope assessment",
  "Project-based build",
  "Retained advisory",
  "Not sure yet",
];

type Status = "idle" | "submitting" | "success" | "error";

function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    // Trim defensively: env values pasted into a dashboard commonly pick up a
    // leading tab or trailing newline, and Web3Forms rejects the key outright
    // as a malformed UUID. The surrounding whitespace is invisible everywhere
    // it would normally be inspected, so strip it rather than trust the input.
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY?.trim();

    // NEXT_PUBLIC_ vars are inlined at build time, so an unset variable in the
    // deploy environment produces a silent, indistinguishable failure at runtime.
    // Name it explicitly rather than letting it look like a network problem.
    if (!accessKey) {
      console.error(
        "[contact form] NEXT_PUBLIC_WEB3FORMS_KEY is not set. It must exist in " +
          "the environment at BUILD time — setting it after a build requires a redeploy.",
      );
      setStatus("error");
      return;
    }

    const formData = new FormData(form);
    formData.append("access_key", accessKey);
    formData.append("subject", "New enquiry — Invision Solutions website");
    formData.append("from_name", "Invision Solutions Website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        console.error("[contact form] Web3Forms rejected the submission:", result.message);
        setStatus("error");
      }
    } catch (error) {
      console.error("[contact form] Request to Web3Forms failed:", error);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="glass-panel rounded-lg p-8 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-gold">
          Status: Received
        </p>
        <p className="mt-4 text-lg text-platinum">
          Thanks — your message has been sent. David will get back to you
          directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel rounded-lg p-6 sm:p-8">
      {/* honeypot */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm text-slate">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-2 w-full rounded-md border border-platinum/10 bg-void px-4 py-3 text-sm text-platinum outline-none focus-visible:border-signal-gold"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm text-slate">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-md border border-platinum/10 bg-void px-4 py-3 text-sm text-platinum outline-none focus-visible:border-signal-gold"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm text-slate">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className="mt-2 w-full rounded-md border border-platinum/10 bg-void px-4 py-3 text-sm text-platinum outline-none focus-visible:border-signal-gold"
          />
        </div>
        <div>
          <label htmlFor="engagement_type" className="block text-sm text-slate">
            Engagement type
          </label>
          <select
            id="engagement_type"
            name="engagement_type"
            required
            defaultValue=""
            className="mt-2 w-full rounded-md border border-platinum/10 bg-void px-4 py-3 text-sm text-platinum outline-none focus-visible:border-signal-gold"
          >
            <option value="" disabled>
              Select one
            </option>
            {ENGAGEMENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="block text-sm text-slate">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="mt-2 w-full rounded-md border border-platinum/10 bg-void px-4 py-3 text-sm text-platinum outline-none focus-visible:border-signal-gold"
          />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-400">
          Something went wrong sending that — please try again, or email
          david@invisionsolutions.co.uk directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-8 inline-flex items-center gap-2 rounded-md bg-signal-gold px-6 py-3 font-sans text-sm font-medium text-void transition-colors hover:bg-signal-gold/90 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-gold"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

export { ContactForm };
