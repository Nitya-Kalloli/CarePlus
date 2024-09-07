'use client'; // Indicates this is a client-side component.
import React from 'react';
import { Input } from "@/components/ui/input";
import Image from 'next/image'; // Ensure Image is imported from next/image
import { E164Number } from "libphonenumber-js/core";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Control } from 'react-hook-form';
import { FormFieldType } from '../forms/PatientForm';

// export enum FormFieldType {
//   INPUT = "input",
//   TEXTAREA = "textarea",
//   PHONE_INPUT = "phoneInput",
//   CHECKBOX = "checkbox",
//   DATE_PICKER = "datePicker",
//   SELECT = "select",
//   SKELETON = "skeleton",
// }

interface CustomProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  fieldType: FormFieldType;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, iconSrc, iconAlt, placeholder } = props; // Fixed typo for `placeholder`

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || "icon"} // Use iconAlt from props
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder} // Corrected the typo for placeholder
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );

    // You can add more cases for other field types (TEXTAREA, PHONE_INPUT, etc.)
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );
    default:
      return null; // Return null in the default case if fieldType doesn't match
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name} // Ensures 'name' prop is passed to FormField
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel> // Properly rendered FormLabel
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
