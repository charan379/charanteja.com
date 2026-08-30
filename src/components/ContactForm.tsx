import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
  MonitorCog,
  Phone,
  Send,
  User,
} from "lucide-react";
import { GlassInput } from "./glass-input";
import { GlassTextarea } from "./glass-textarea";
import {
  GlassSelect,
  GlassSelectContent,
  GlassSelectItem,
  GlassSelectTrigger,
  GlassSelectValue,
} from "./glass-select";
import { GlassRadioGroup, GlassRadioGroupItem } from "./glass-radio";
import { GlassCheckbox } from "./glass-checkbox";
import { GlassButton } from "./glass-button";
import { appConfig } from "@/config/app-config";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  mobile: z
    .string()
    .trim()
    .refine(
      (val) => !val || /^[0-9+\-\s()]{7,20}$/.test(val),
      "Please enter a valid phone number (7-20 digits)",
    ),
  service: z.enum([
    "fullstack",
    "frontend",
    "consulting",
    "freelance",
    "other",
  ]),
  timeline: z.enum(["asap", "1-3months", "flexible"]),
  terms: z.boolean(),
  message: z
    .string()
    .trim()
    .min(1, "Please enter your message")
    .min(5, "Message must be at least 5 characters")
    .max(2000, "Message must be less than 2000 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

const getErrorMessage = (err: unknown): string => {
  if (!err) return "";
  if (typeof err === "string") return err;
  if (typeof err === "object") {
    const errorObj = err as Record<string, any>;
    if (typeof errorObj.message === "string") return errorObj.message;
    if (Array.isArray(errorObj.issues) && errorObj.issues[0]?.message) {
      return errorObj.issues[0].message;
    }
  }
  return "";
};

interface ContactFormProps {
  className?: string;
  onSuccess?: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  className,
  onSuccess,
}) => {
  const formId = appConfig.contact.formspreeFormId || "";

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      service: "fullstack",
      timeline: "flexible",
      terms: true,
      message: "",
    },
    onSubmit: async ({ value }) => {
      setErrorMessage(null);

      // Validate entire payload against Zod schema
      const parseResult = contactFormSchema.safeParse(value);
      if (!parseResult.success) {
        setErrorMessage(
          parseResult.error.issues[0]?.message ||
            "Please fix form validation errors.",
        );
        return;
      }

      const validData = parseResult.data;

      if (!formId) {
        setErrorMessage(
          "Form submission is not configured (VITE_FORMSPREE_FORM_ID is missing). Please reach out directly via email.",
        );
        return;
      }

      try {
        const response = await fetch(`https://formspree.io/f/${formId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: validData.name,
            email: validData.email,
            mobile: validData.mobile || undefined,
            service: validData.service,
            timeline: validData.timeline,
            terms: validData.terms,
            consent: validData.terms
              ? "Agreed (Allow email & phone response)"
              : "Declined",
            message: validData.message,
            submittedAt: new Date().toISOString(),
          }),
        });

        const result = await response.json();

        if (response.ok) {
          setIsSuccess(true);
          form.reset();
          if (onSuccess) onSuccess();
        } else {
          const msg =
            result?.errors?.map((err: any) => err.message).join(", ") ||
            result?.error ||
            "Failed to submit message. Please try again or reach out via email.";
          setErrorMessage(msg);
        }
      } catch (err: any) {
        setErrorMessage(
          err?.message ||
            "Network error. Please check your connection and try again.",
        );
      }
    },
  });

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-emerald-500/30 bg-transparent backdrop-blur-xs gap-4"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/50 text-emerald-400 border border-emerald-500/50 shadow-[0_0_24px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-xl font-bold text-white">
                Message Sent Successfully!
              </h3>
              <p className="text-xs text-white/70 max-w-md">
                Thank you for reaching out! Your message has been delivered, and
                I'll get back to you as soon as possible.
              </p>
            </div>
            <GlassButton
              variant="outline"
              size="sm"
              onClick={() => setIsSuccess(false)}
              className="mt-2 text-xs cursor-pointer"
            >
              Send Another Message
            </GlassButton>
          </motion.div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="flex flex-col gap-4"
          >
            {/* Error Banner */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-200 backdrop-blur-md"
              >
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
                <span className="leading-relaxed">{errorMessage}</span>
              </motion.div>
            )}

            {/* Two Column Row: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Name Field */}
              <form.Field
                name="name"
                validators={{
                  onChange: ({ value }) => {
                    const res = contactFormSchema.shape.name.safeParse(value);
                    return res.success
                      ? undefined
                      : res.error.issues[0]?.message;
                  },
                }}
              >
                {(field) => {
                  const errorMsg = field.state.meta.isTouched
                    ? getErrorMessage(field.state.meta.errors[0])
                    : "";
                  return (
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor={field.name}
                        className="flex items-center gap-1.5 text-xs font-medium text-white/80"
                      >
                        <User className="h-3.5 w-3.5 text-cyan-400" />
                        Your Name <span className="text-cyan-400">*</span>
                      </label>
                      <GlassInput
                        glowOnFocus={false}
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="e.g. Charan Teja"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={errorMsg ? "border-red-400/50" : ""}
                      />
                      {errorMsg ? (
                        <span className="text-[11px] text-red-400">
                          {errorMsg}
                        </span>
                      ) : null}
                    </div>
                  );
                }}
              </form.Field>

              {/* Email Field */}
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) => {
                    const res = contactFormSchema.shape.email.safeParse(value);
                    return res.success
                      ? undefined
                      : res.error.issues[0]?.message;
                  },
                }}
              >
                {(field) => {
                  const errorMsg = field.state.meta.isTouched
                    ? getErrorMessage(field.state.meta.errors[0])
                    : "";
                  return (
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor={field.name}
                        className="flex items-center gap-1.5 text-xs font-medium text-white/80"
                      >
                        <Mail className="h-3.5 w-3.5 text-cyan-400" />
                        Email Address <span className="text-cyan-400">*</span>
                      </label>
                      <GlassInput
                        glowOnFocus={false}
                        id={field.name}
                        name={field.name}
                        type="email"
                        placeholder="charan@example.com"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={errorMsg ? "border-red-400/50" : ""}
                      />
                      {errorMsg ? (
                        <span className="text-[11px] text-red-400">
                          {errorMsg}
                        </span>
                      ) : null}
                    </div>
                  );
                }}
              </form.Field>
            </div>

            {/* Phone & Service Select Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Phone Field */}
              <form.Field
                name="mobile"
                validators={{
                  onChange: ({ value }) => {
                    if (!value || !value.trim()) return undefined;
                    const res = contactFormSchema.shape.mobile.safeParse(value);
                    return res.success
                      ? undefined
                      : res.error.issues[0]?.message;
                  },
                }}
              >
                {(field) => {
                  const errorMsg = field.state.meta.isTouched
                    ? getErrorMessage(field.state.meta.errors[0])
                    : "";
                  return (
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor={field.name}
                        className="flex items-center gap-1.5 text-xs font-medium text-white/80"
                      >
                        <Phone className="h-3.5 w-3.5 text-cyan-400" />
                        Mobile / Phone{" "}
                        <span className="text-white/40 text-[10px]">
                          (Optional)
                        </span>
                      </label>
                      <GlassInput
                        glowOnFocus={false}
                        id={field.name}
                        name={field.name}
                        type="tel"
                        placeholder="+91 XXX XXXXXXXX"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={errorMsg ? "border-red-400/50" : ""}
                      />
                      {errorMsg ? (
                        <span className="text-[11px] text-red-400">
                          {errorMsg}
                        </span>
                      ) : null}
                    </div>
                  );
                }}
              </form.Field>

              {/* Inquiry Type / Service Selection */}
              <form.Field name="service">
                {(field) => (
                  <div className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-medium text-white/80">
                      <MonitorCog className="h-3.5 w-3.5 text-cyan-400" />
                      Subject / Service
                    </label>
                    <GlassSelect
                      value={field.state.value}
                      onValueChange={(val) =>
                        field.handleChange(val as ContactFormData["service"])
                      }
                    >
                      <GlassSelectTrigger id="contact-service">
                        <GlassSelectValue placeholder="Select topic" />
                      </GlassSelectTrigger>
                      <GlassSelectContent>
                        <GlassSelectItem value="fullstack">
                          Full-Stack Web Development
                        </GlassSelectItem>
                        <GlassSelectItem value="frontend">
                          Frontend Architecture & React
                        </GlassSelectItem>
                        <GlassSelectItem value="consulting">
                          Technical Consulting / Lead
                        </GlassSelectItem>
                        <GlassSelectItem value="freelance">
                          Freelance Project / Contract
                        </GlassSelectItem>
                        <GlassSelectItem value="other">
                          General Collaboration
                        </GlassSelectItem>
                      </GlassSelectContent>
                    </GlassSelect>
                  </div>
                )}
              </form.Field>
            </div>

            {/* Project Timeline Radio Group */}
            <form.Field name="timeline">
              {(field) => (
                <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-md">
                  <span className="text-xs font-medium text-white/80">
                    Target Timeline:
                  </span>
                  <GlassRadioGroup
                    value={field.state.value}
                    onValueChange={(val) =>
                      field.handleChange(val as ContactFormData["timeline"])
                    }
                    className="grid grid-cols-3 gap-2"
                  >
                    <GlassRadioGroupItem
                      value="asap"
                      id="timeline-asap"
                      label="Immediate"
                    />
                    <GlassRadioGroupItem
                      value="1-3months"
                      id="timeline-medium"
                      label="1 - 3 Months"
                    />
                    <GlassRadioGroupItem
                      value="flexible"
                      id="timeline-flexible"
                      label="Flexible"
                    />
                  </GlassRadioGroup>
                </div>
              )}
            </form.Field>

            {/* Message Field */}
            <form.Field
              name="message"
              validators={{
                onChange: ({ value }) => {
                  const res = contactFormSchema.shape.message.safeParse(value);
                  return res.success ? undefined : res.error.issues[0]?.message;
                },
              }}
            >
              {(field) => {
                const errorMsg = field.state.meta.isTouched
                  ? getErrorMessage(field.state.meta.errors[0])
                  : "";
                return (
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor={field.name}
                      className="flex items-center gap-1.5 text-xs font-medium text-white/80"
                    >
                      <MessageSquare className="h-3.5 w-3.5 text-cyan-400" />
                      Your Message <span className="text-cyan-400">*</span>
                    </label>
                    <GlassTextarea
                      glowOnFocus={false}
                      id={field.name}
                      name={field.name}
                      placeholder="Tell me about your project, goals, or questions..."
                      rows={4}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={
                        errorMsg ? "border-red-400/50 min-h-24" : "min-h-24"
                      }
                    />
                    {errorMsg ? (
                      <span className="text-[11px] text-red-400">
                        {errorMsg}
                      </span>
                    ) : null}
                  </div>
                );
              }}
            </form.Field>

            {/* Checkbox agreement */}
            <form.Field name="terms">
              {(field) => (
                <div className="pt-1">
                  <GlassCheckbox
                    id="contact-consent"
                    checked={field.state.value}
                    onCheckedChange={(checked) =>
                      field.handleChange(Boolean(checked))
                    }
                    label="Allow email & phone response regarding this inquiry."
                  />
                </div>
              )}
            </form.Field>

            {/* Submit Action */}
            <form.Subscribe
              selector={(state) => ({
                canSubmit: state.canSubmit,
                isSubmitting: state.isSubmitting,
              })}
            >
              {({ canSubmit, isSubmitting }) => (
                <div className="pt-2">
                  <GlassButton
                    type="submit"
                    variant="default"
                    disabled={!canSubmit || isSubmitting}
                    className="w-full flex items-center justify-center gap-2 text-sm font-semibold cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-cyan-300" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </GlassButton>
                </div>
              )}
            </form.Subscribe>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
