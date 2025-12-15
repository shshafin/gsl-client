import { useFormContext } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface GSLTinyMCEEditorProps {
  name: string;
  label: string;
  placeholder?: string;
  height?: number;
}

const GSLTinyMCEEditor = ({
  name,
  label,
  placeholder,
  height = 500,
}: GSLTinyMCEEditorProps) => {
  const { control } = useFormContext();

  const TINYMCE_API_KEY = "vlkobpdp63zpoaji43uqd19qcnw5guzr1yoob1dly5n1tzip";

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <div className="rounded-md overflow-hidden border border-gray-300">
              <Editor
                apiKey={TINYMCE_API_KEY}
                init={{
                  height,
                  menubar: true,
                  placeholder, // ✅ CORRECT PLACE
                  plugins: [
                    "advlist autolink lists link image charmap preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste help wordcount",
                    "textcolor colorpicker textpattern nonbreaking hr",
                    "codesample emoticons fontselect fontsizeselect",
                  ],
                  toolbar:
                    "undo redo | styleselect | fontselect fontsizeselect | forecolor backcolor | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | code preview",
                  setup: (editor: any) => {
                    editor.on("init", () => {
                      editor.setContent(field.value || "");
                    });
                  },
                }}
                value={field.value || ""}
                onEditorChange={(content) => field.onChange(content)}
                onBlur={field.onBlur}
              />
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default GSLTinyMCEEditor;
