import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import editor styles
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Dynamically import react-quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface GSLRichTextEditorProps {
  name: string;
  label: string;
  placeholder?: string;
}

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
    [{ color: [] }, { background: [] }],
  ],
};

const GSLRichTextEditor = ({
  name,
  label,
  placeholder,
}: GSLRichTextEditorProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <ReactQuill
              theme="snow"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              modules={modules}
              placeholder={placeholder}
              className="bg-white min-h-75"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default GSLRichTextEditor;
