import { Suspense, useLayoutEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

// components
import { Loader, Alert, PageTitle } from "../components";

import { Fox } from "../models";
import type { FoxAnimation } from "../models";
import useAlert from "../hooks/useAlert";
import { SITE_NAME, EXTRA_LINKS } from "../constants";
import {
  CONTACT_RECAPTCHA_ACTION,
  isValidContactEmail,
  isValidContactMessage,
  isValidContactName,
  type ContactFormFields,
} from "../lib/contact";

const FIELD_VALIDATORS: Record<
  keyof ContactFormFields,
  (value: string) => boolean
> = {
  name: isValidContactName,
  email: isValidContactEmail,
  message: isValidContactMessage,
};

type FoxCanvasProps = {
  currentAnimation: FoxAnimation;
};

const FoxCanvas = ({ currentAnimation }: FoxCanvasProps) => (
  <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-87.5">
    {/* Three.js Canvas Component */}
    <Canvas
      camera={{
        position: [0, 0, 5],
        fov: 75,
        near: 0.1,
        far: 1000,
      }}
    >
      <directionalLight intensity={2.5} position={[0, 0, 1]} />
      <ambientLight intensity={0.5} />
      <Suspense fallback={<Loader />}>
        <Fox
          currentAnimation={currentAnimation}
          position={[0.5, 0.35, 0]}
          rotation={[12.6, -0.6, 0]}
          scale={[0.5, 0.5, 0.5]}
        />
      </Suspense>
    </Canvas>
  </div>
);

// Form implementation with ReCaptcha support
const ApiContactForm = ({
  onAnimationChange,
}: {
  onAnimationChange: (anim: FoxAnimation) => void;
}) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const hasAttemptedSubmit = useRef(false);

  const [form, setForm] = useState<ContactFormFields>({
    name: "",
    email: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { alert, showAlert, hideAlert } = useAlert();

  useLayoutEffect(() => {
    const el = messageRef.current;
    if (!el) return;
    el.style.overflowY = "hidden";
    el.style.height = "auto";
    const nextHeight = el.scrollHeight;
    const maxHeight = Number.parseFloat(getComputedStyle(el).maxHeight);
    if (Number.isFinite(maxHeight) && nextHeight >= maxHeight) {
      el.style.height = `${maxHeight}px`;
      el.style.overflowY = "auto";
      return;
    }
    el.style.height = `${nextHeight}px`;
  }, [form.message]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = e.target.name as keyof ContactFormFields;
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));

    if (!hasAttemptedSubmit.current) return;
    const isInvalid = !FIELD_VALIDATORS[field](value);
    setFieldErrors((prev) =>
      prev[field] === isInvalid ? prev : { ...prev, [field]: isInvalid },
    );
  };

  const handleFocus = () => onAnimationChange("walk");
  const handleBlur = () => {
    if (!isLoading) onAnimationChange("idle");
  };

  const validateForm = () => {
    hasAttemptedSubmit.current = true;
    const nextErrors = {
      name: !isValidContactName(form.name),
      email: !isValidContactEmail(form.email),
      message: !isValidContactMessage(form.message),
    };
    setFieldErrors(nextErrors);
    return !nextErrors.name && !nextErrors.email && !nextErrors.message;
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!executeRecaptcha) {
      showAlert({
        show: true,
        text: "reCAPTCHA is not ready. Please try again.",
        type: "danger",
      });
      return;
    }

    setIsLoading(true);
    onAnimationChange("hit");

    try {
      const recaptchaToken = await executeRecaptcha(CONTACT_RECAPTCHA_ACTION);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          recaptchaToken,
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        showAlert({
          show: true,
          text: data?.error ?? "I didn't receive your message",
          type: "danger",
        });
        return;
      }

      showAlert({
        show: true,
        text: "Message sent successfully!",
        type: "success",
      });
      setForm({ name: "", email: "", message: "" });
      setFieldErrors({ name: false, email: false, message: false });
    } catch {
      showAlert({
        show: true,
        text: "Failed to send message. Please reach out via email directly.",
        type: "danger",
      });
    } finally {
      setTimeout(() => {
        onAnimationChange("idle");
        hideAlert();
      }, 3000);
      setIsLoading(false);
    }
  };

  return (
    <>
      {alert.show && <Alert {...alert} />}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 mt-6">
        <label className="text-black-500 font-semibold" htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            className="input disabled:cursor-not-allowed"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            maxLength={200}
            disabled={isLoading}
          />
          {fieldErrors.name && (
            <span className="text-red-500 text-sm font-normal mt-1 block">
              Please enter a valid name
            </span>
          )}
        </label>

        <label className="text-black-500 font-semibold" htmlFor="email">
          E-mail
          <input
            type="email"
            id="email"
            name="email"
            className="input disabled:cursor-not-allowed"
            placeholder="your.email@example.com"
            value={form.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            maxLength={100}
            disabled={isLoading}
          />
          {fieldErrors.email && (
            <span className="text-red-500 text-sm font-normal mt-1 block">
              Please enter a valid email address
            </span>
          )}
        </label>

        <label className="text-black-500 font-semibold" htmlFor="message">
          Your Message
          <textarea
            ref={messageRef}
            id="message"
            name="message"
            className="textarea disabled:cursor-not-allowed"
            rows={4}
            placeholder="Let me know how I can help you!"
            value={form.message}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            maxLength={500}
            disabled={isLoading}
          />
          {fieldErrors.message && (
            <span className="text-red-500 text-sm font-normal mt-1 block">
              Please enter a message (at least 5 characters)
            </span>
          )}
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="btn"
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {isLoading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </>
  );
};

// Direct client contact form (opens default mail client / mailto)
const DirectMailContactForm = ({
  onAnimationChange,
}: {
  onAnimationChange: (anim: FoxAnimation) => void;
}) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);
  const { alert, showAlert, hideAlert } = useAlert();

  const handleFocus = () => onAnimationChange("walk");
  const handleBlur = () => onAnimationChange("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showAlert({
        show: true,
        text: "Please fill in all fields before sending.",
        type: "danger",
      });
      return;
    }

    onAnimationChange("hit");

    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${form.name}`,
    );
    const body = encodeURIComponent(
      `Hello Aditya,\n\n${form.message}\n\nFrom: ${form.name} (${form.email})`,
    );
    window.location.href = `mailto:${EXTRA_LINKS.email}?subject=${subject}&body=${body}`;

    showAlert({
      show: true,
      text: "Opening your email client...",
      type: "success",
    });

    setTimeout(() => {
      onAnimationChange("idle");
      hideAlert();
    }, 4000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(EXTRA_LINKS.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {alert.show && <Alert {...alert} />}

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 mt-6">
        <label className="text-black-500 font-semibold" htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            className="input"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />
        </label>

        <label className="text-black-500 font-semibold" htmlFor="email">
          E-mail
          <input
            type="email"
            id="email"
            name="email"
            className="input"
            placeholder="your.email@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />
        </label>

        <label className="text-black-500 font-semibold" htmlFor="message">
          Your Message
          <textarea
            id="message"
            name="message"
            className="textarea"
            rows={4}
            placeholder="Share your thoughts, project ideas, or questions!"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />
        </label>

        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <button
            type="submit"
            className="btn w-full sm:w-auto hover:-translate-y-0.5 active:scale-98 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            Send via Email
          </button>
          <button
            type="button"
            onClick={copyEmail}
            className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-100 hover:border-slate-400 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-xs hover:shadow-sm w-full sm:w-auto"
          >
            {copied ? "✓ Copied Email!" : "📋 Copy Email Address"}
          </button>
        </div>
      </form>
    </>
  );
};

// contact page
const Contact = () => {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const [currentAnimation, setCurrentAnimation] =
    useState<FoxAnimation>("idle");

  return (
    <>
      <PageTitle title={`${SITE_NAME} | Contact Me`} />

      <section className="relative flex lg:flex-row flex-col max-container lg:h-screen min-h-screen pb-12">
        <div className="flex-1 min-w-[50%] flex flex-col justify-center">
          <h1 className="head-text">Get in Touch</h1>

          {/* direct contact cards */}
          <div className="mt-4 flex flex-wrap gap-2.5 text-sm">
            <a
              href={`mailto:${EXTRA_LINKS.email}`}
              className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 hover:-translate-y-0.5 hover:shadow-xs active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] border border-blue-200"
            >
              ✉️ {EXTRA_LINKS.email}
            </a>
            <a
              href={EXTRA_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 font-medium hover:bg-slate-100 hover:border-slate-300 hover:-translate-y-0.5 hover:shadow-xs active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] border border-slate-200"
            >
              💼 LinkedIn
            </a>
            <a
              href={EXTRA_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-pink-50 text-pink-700 font-medium hover:bg-pink-100 hover:border-pink-300 hover:-translate-y-0.5 hover:shadow-xs active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] border border-pink-200"
            >
              📸 Instagram
            </a>
            <a
              href={EXTRA_LINKS.source_code}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 font-medium hover:bg-slate-100 hover:border-slate-300 hover:-translate-y-0.5 hover:shadow-xs active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] border border-slate-200"
            >
              🐙 GitHub
            </a>
          </div>

          <p className="mt-4 text-slate-500 text-sm">
            Feel free to send a message or connect directly. I&apos;m always open
            to discussing new opportunities, full-stack projects, or ideas!
          </p>

          {siteKey ? (
            <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
              <ApiContactForm onAnimationChange={setCurrentAnimation} />
            </GoogleReCaptchaProvider>
          ) : (
            <DirectMailContactForm onAnimationChange={setCurrentAnimation} />
          )}
        </div>

        <FoxCanvas currentAnimation={currentAnimation} />
      </section>
    </>
  );
};

export default Contact;
