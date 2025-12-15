import { ChangeEvent } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

interface GSLImageUploadProps {
  name: string;
  label: string;
}

const GSLImageUpload = ({ name, label }: GSLImageUploadProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value, ...field } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="file"
              accept="image/*"
              multiple // 👈 Allow multiple files
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const files = e.target.files;
                if (files) {
                  // Convert FileList to Array and send to React Hook Form
                  onChange(Array.from(files));
                }
              }}
              {...field}
              value={undefined} // File input cannot be controlled value
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default GSLImageUpload;
