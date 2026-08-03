"use client";

import { useState, type FormEvent, type ReactNode } from "react";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "textarea" | "select";
  required?: boolean;
  options?: string[];
  rows?: number;
  placeholder?: string;
  full?: boolean;
};

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-slate/70 outline-none transition-colors focus-visible:border-gold-ink";

/**
 * A Web3Forms-backed form.
 *
 * `accessKey` decides which mailbox the submission lands in — each Web3Forms
 * form has its own key and its own configured recipient.
 */
function Web3Form({
  accessKey,
  subject,
  fields,
  submitLabel = "Send message",
  successTitle = "Status: Received",
  successBody,
  compact = false,
}: {
  accessKey: string | undefined;
  subject: string;
  fields: Field[];
  submitLabel?: string;
  successTitle?: string;
  successBody: ReactNode;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    // Trim defensively: values pasted into a hosting dashboard commonly pick up
    // a leading tab or trailing newline, which Web3Forms rejects outright as a
    // malformed UUID. The whitespace is invisible wherever you would inspect it.
    const key = accessKey?.trim();

    if (!key) {
      console.error(
        "[web3forms] No access key available for this form. NEXT_PUBLIC_ variables " +
          "are inlined at BUILD time — setting one after a build requires a redeploy.",
      );
      setStatus("error");
      return;
    }

    const formData = new FormData(form);
    formData.append("access_key", key);
    formData.append("subject", subject);
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
        console.error("[web3forms] Rejected the submission:", result.message);
        setStatus("error");
      }
    } catch (error) {
      console.error("[web3forms] Request failed:", error);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="surface-raised rounded-xl p-8 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-ink">
          {successTitle}
        </p>
        <p className="mt-4 text-lg text-ink">{successBody}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`surface-raised rounded-xl ${compact ? "p-5 sm:p-6" : "p-6 sm:p-8"}`}
    >
      {/* Honeypot — unchecked checkboxes are omitted from FormData by browsers. */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        {fields.map((field) => {
          const id = `${subject.replace(/\W+/g, "-").toLowerCase()}-${field.name}`;
          const wrapper = field.full || compact ? "sm:col-span-2" : "";
          return (
            <div key={field.name} className={wrapper}>
              <label htmlFor={id} className="block text-sm font-medium text-ink">
                {field.label}
                {!field.required && (
                  <span className="ml-1.5 font-normal text-slate">(optional)</span>
                )}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  id={id}
                  name={field.name}
                  required={field.required}
                  rows={field.rows ?? 5}
                  placeholder={field.placeholder}
                  className={inputClass}
                />
              ) : field.type === "select" ? (
                <select
                  id={id}
                  name={field.name}
                  required={field.required}
                  defaultValue=""
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  {field.options?.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={id}
                  name={field.name}
                  type={field.type ?? "text"}
                  required={field.required}
                  placeholder={field.placeholder}
                  className={inputClass}
                />
              )}
            </div>
          );
        })}
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-700">
          Something went wrong sending that. Please try again, or email{" "}
          <a
            href="mailto:contact@invisionsolutions.co.uk"
            className="underline underline-offset-4"
          >
            contact@invisionsolutions.co.uk
          </a>{" "}
          directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-sans text-sm font-medium text-paper transition-opacity hover:opacity-88 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}

export { Web3Form };
