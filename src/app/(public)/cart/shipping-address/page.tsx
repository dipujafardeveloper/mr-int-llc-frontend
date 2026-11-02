"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Container from "@/components/container/Container";
import CountryStateCitySelector, {
  type ShippingAddressFormValues,
} from "@/components/ui/country-state-city-selector";

export default function ShippingAddressPage() {
  const [savedAddress, setSavedAddress] =
    useState<ShippingAddressFormValues | null>(null);
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<ShippingAddressFormValues>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      country: "United States",
      state: "",
      city: "Austin",
      streetAddress: "123 Main Street",
      zipCode: "78701",
    },
  });

  const onSubmit = (values: ShippingAddressFormValues) => {
    setSavedAddress(values);
  };

  return (
    <Container className="page-padding">
      <main className="mx-auto w-full">
        <header className="mb-6">
          <h1 className="text-xl font-bold text-[#132c45] sm:text-2xl">
            Owner Information
          </h1>
          <p className="mt-1 text-sm text-[#7b8493]">
            Your contact and mailing details.
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <section aria-labelledby="address-heading" className="space-y-4">
            <h2 id="address-heading" className="text-sm font-bold text-[#202a39]">
              Address
            </h2>
            <CountryStateCitySelector
              control={control}
              register={register}
              setValue={setValue}
              errors={errors}
            />
          </section>

          {savedAddress && (
            <p role="status" className="text-sm font-medium text-[#348267]">
              Address saved for this session.
            </p>
          )}

          <button
            type="submit"
            className="flex h-11 w-full items-center justify-center rounded-full bg-[#a45a1a] px-5 text-xs font-bold uppercase text-white transition-colors hover:bg-[#8e4c15] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a45a1a]"
          >
            Continue
          </button>
        </form>
      </main>
    </Container>
  );
}
