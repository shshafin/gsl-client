import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

interface GSLCheckboxProps {
  name: string;
  label: string;
}

const GSLCheckbox = ({ name, label }: GSLCheckboxProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-lg bg-gray-50">
          <FormControl>
            {/* Checkbox component from shadcn/ui */}
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              // The value must be passed as a boolean
              value={field.value ? "true" : "false"}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            {/* Label component from shadcn/ui */}
            <Label
              htmlFor={name}
              className="font-medium text-gray-800 cursor-pointer">
              {label}
            </Label>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default GSLCheckbox;
