import { Form } from "@/components/ui/form";
import { ReactNode } from "react";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";

interface GSLFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
  className?: string;
}

const GSLForm = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
}: GSLFormProps<T>) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={className}>
        {children}
      </form>
    </Form>
  );
};

export default GSLForm;
