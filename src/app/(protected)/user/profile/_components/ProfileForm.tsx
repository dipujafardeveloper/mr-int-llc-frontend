"use client";

import Image from "next/image";
import { useRef, useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { Camera, Mail, Phone, UserRound } from "lucide-react";
import { useProfileAvatar } from "../../_components/ProfileAvatarProvider";

type ProfileFormValues = {
  fullName: string;
  email: string;
  phone: string;
};

const fieldClassName =
  "h-11 w-full rounded-lg border border-[#E1E5EA] bg-white px-4 pl-11 text-sm text-[#273449] shadow-sm outline-none transition focus:border-[#a45a1a] focus:ring-2 focus:ring-[#a45a1a]/15 sm:h-12";

export default function ProfileForm() {
  const { avatarSrc, setAvatarSrc } = useProfileAvatar();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [avatarError, setAvatarError] = useState("");
  const [saved, setSaved] = useState(false);
  const form = useForm<ProfileFormValues>({
    mode: "onBlur",
    defaultValues: {
      fullName: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1 (555) 123-4567",
    },
  });

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setAvatarError("Choose an image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setAvatarError("Choose an image smaller than 2 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setAvatarSrc(reader.result);
        setAvatarError("");
        setSaved(false);
      }
    };
    reader.onerror = () => setAvatarError("The image could not be loaded.");
    reader.readAsDataURL(file);
  };

  const onSubmit = (values: ProfileFormValues) => {
    setSaved(true);
    return values;
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      className="mx-auto w-full max-w-240 space-y-8"
    >
      <header className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <h1 className="text-2xl font-bold text-[#171D2A] sm:text-[28px]">
            Personal Information
          </h1>
          <p className="mt-1 text-sm text-[#7b8493]">
            Manage your account details.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#E1E5EA] bg-[#F4EDDF] text-lg font-semibold text-[#995618] sm:size-18">
            {avatarSrc ? (
              <Image
                src={avatarSrc}
                alt="Profile avatar"
                fill
                unoptimized
                sizes="72px"
                className="object-cover"
              />
            ) : (
              "SJ"
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#273449]">Profile photo</p>
            <button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              className="mt-1 inline-flex min-h-9 items-center gap-2 rounded-md text-sm font-medium text-[#a45a1a] hover:text-[#81430f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a45a1a]"
            >
              <Camera aria-hidden="true" className="size-4" />
              Change photo
            </button>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="sr-only"
              aria-label="Choose a profile photo"
            />
          </div>
        </div>
      </header>

      {avatarError && (
        <p role="alert" className="text-sm text-red-600">
          {avatarError}
        </p>
      )}

      <section aria-labelledby="profile-information-heading" className="space-y-5">
        <h2
          id="profile-information-heading"
          className="text-sm font-semibold text-[#202a39]"
        >
          Your Information
        </h2>

        <div className="space-y-4 sm:space-y-5">
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium text-[#344054]">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <UserRound aria-hidden="true" className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
              <input
                id="fullName"
                autoComplete="name"
                aria-invalid={Boolean(form.formState.errors.fullName)}
                className={fieldClassName}
                {...form.register("fullName", {
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Enter at least 2 characters",
                  },
                })}
              />
            </div>
            {form.formState.errors.fullName && (
              <p className="text-xs text-red-600">
                {form.formState.errors.fullName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-[#344054]">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail aria-hidden="true" className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(form.formState.errors.email)}
                className={fieldClassName}
                {...form.register("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
            </div>
            {form.formState.errors.email && (
              <p className="text-xs text-red-600">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-[#344054]">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone aria-hidden="true" className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#98A2B3]" />
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                aria-invalid={Boolean(form.formState.errors.phone)}
                className={fieldClassName}
                {...form.register("phone", {
                  required: "Phone number is required",
                })}
              />
            </div>
            {form.formState.errors.phone && (
              <p className="text-xs text-red-600">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {saved && (
        <p role="status" className="text-sm font-medium text-[#348267]">
          Profile changes saved for this session.
        </p>
      )}

      <button
        type="submit"
        className="flex min-h-12 w-full items-center justify-center rounded-full bg-[#a45a1a] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#81430f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a45a1a] sm:min-h-14"
      >
        SAVE CHANGES
      </button>
    </form>
  );
}