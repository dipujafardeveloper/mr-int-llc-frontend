"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Controller,
  useWatch,
  type Control,
  type FieldErrors,
  type UseFormRegister,
  type UseFormSetValue,
} from "react-hook-form";
import { Input } from "@/components/ui/input";

export type ShippingAddressFormValues = {
  country: string;
  state: string;
  city: string;
  streetAddress: string;
  zipCode: string;
};

type StateOption = {
  name: string;
  cities: { name: string }[];
};

type CountryOption = {
  name: string;
  states: StateOption[];
};

type CountryStateCitySelectorProps = {
  control: Control<ShippingAddressFormValues>;
  register: UseFormRegister<ShippingAddressFormValues>;
  setValue: UseFormSetValue<ShippingAddressFormValues>;
  errors: FieldErrors<ShippingAddressFormValues>;
};

const fieldClassName =
  "h-9 w-full rounded-lg border border-[#E1E5EA] bg-white px-3 text-xs text-[#273449] shadow-sm outline-none transition focus:border-[#a45a1a] focus:ring-2 focus:ring-[#a45a1a]/15 sm:h-10 py-5";

export default function CountryStateCitySelector({
  control,
  register,
  setValue,
  errors,
}: CountryStateCitySelectorProps) {
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [loadError, setLoadError] = useState(false);
  const selectedCountry = useWatch({ control, name: "country" });
  const countryStates =
    countries.find((country) => country.name === selectedCountry)?.states ?? [];

  useEffect(() => {
    let isMounted = true;

    fetch("/data/countries-states-cities.json")
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load address options");
        return response.json() as Promise<CountryOption[]>;
      })
      .then((data) => {
        if (isMounted) setCountries(data);
      })
      .catch(() => {
        if (isMounted) setLoadError(true);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const renderError = (name: keyof ShippingAddressFormValues) => {
    const message = errors[name]?.message;
    return message ? (
      <p className="text-xs text-red-600">{message}</p>
    ) : null;
  };

  return (
    <div className="space-y-3.5">
      {loadError && (
        <p role="alert" className="text-xs text-red-600">
          Country and state options could not be loaded. Refresh and try again.
        </p>
      )}

      <div className="space-y-3.5">
        <div className="space-y-1.5">
          <label htmlFor="country" className="block text-xs font-medium text-[#273449]">
            Country <span className="text-red-500">*</span>
          </label>
          <Controller
            name="country"
            control={control}
            rules={{ required: "Country is required" }}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(countryName) => {
                  field.onChange(countryName);
                  setValue("state", "", { shouldValidate: true });
                  setValue("city", "", { shouldValidate: true });
                }}
              >
                <SelectTrigger
                  id="country"
                  aria-invalid={Boolean(errors.country)}
                  className={fieldClassName}
                >
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="max-h-64">
                  {countries.map((country) => (
                    <SelectItem key={country.name} value={country.name}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {renderError("country")}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="state" className="block text-xs font-medium text-[#273449]">
            State / Province <span className="text-red-500">*</span>
          </label>
          <Controller
            name="state"
            control={control}
            rules={{ required: "State / Province is required" }}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(stateName) => {
                  field.onChange(stateName);
                  setValue("city", "", { shouldValidate: true });
                }}
              >
                <SelectTrigger
                  id="state"
                  disabled={!selectedCountry}
                  aria-invalid={Boolean(errors.state)}
                  className={fieldClassName}
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="max-h-64">
                  {countryStates.map((state) => (
                    <SelectItem key={state.name} value={state.name}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {renderError("state")}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="city" className="block text-xs font-medium text-[#273449]">
            City <span className="text-red-500">*</span>
          </label>
          <Input
            id="city"
            type="text"
            autoComplete="address-level2"
            aria-invalid={Boolean(errors.city)}
            className={fieldClassName}
            {...register("city")}
          />
          {renderError("city")}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="streetAddress" className="block text-xs font-medium text-[#273449]">
            Street Address <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            id="streetAddress"
            autoComplete="address-line1"
            aria-invalid={Boolean(errors.streetAddress)}
            className={fieldClassName}
            {...register("streetAddress")}
          />
          {renderError("streetAddress")}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="zipCode" className="block text-xs font-medium text-[#273449]">
            ZIP / Postal Code <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            id="zipCode"
            autoComplete="postal-code"
            aria-invalid={Boolean(errors.zipCode)}
            className={fieldClassName}
            {...register("zipCode")}
          />
          {renderError("zipCode")}
        </div>
      </div>
    </div>
  );
}
