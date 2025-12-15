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

  // 🛠️ API KEY FIX: Replace the placeholder with your actual key
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
                apiKey={TINYMCE_API_KEY} // 👈 Your key is used here
                // Initialize the editor with field data
                init={{
                  height: height,
                  menubar: true,
                  // 🚀 This is the extensive list of powerful plugins
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                    "textcolor colorpicker textpattern nonbreaking template hr",
                    "codesample contextmenu emoticons fontselect fontsizeselect",
                  ],
                  // 🎨 This is the extensive toolbar for rich features
                  toolbar:
                    "undo redo | styleselect | fontselect fontsizeselect | forecolor backcolor | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | code preview",

                  // Setup initial content from RHF and handle changes
                  setup: (editor: any) => {
                    editor.on("init", () => {
                      editor.setContent(field.value || "");
                    });
                  },
                }}
                initialValue={field.value || ""}
                value={field.value || ""} // Use 'value' to control content
                onEditorChange={(content) => {
                  field.onChange(content); // Update RHF state with HTML content
                }}
                onBlur={field.onBlur} // Mark field as touched on blur
                placeholder={placeholder}
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
