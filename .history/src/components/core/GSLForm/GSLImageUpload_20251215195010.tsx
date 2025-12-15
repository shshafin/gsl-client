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
  label?: string;
}

const GSLImageUpload = ({ name, label }: GSLImageUploadProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value, ...field } }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                onChange(file); // Pass the file object to React Hook Form
              }}
              {...field}
              value={value?.fileName} // Prevent error with file input value
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default GSLImageUpload;
