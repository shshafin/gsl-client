import { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDropzone, FileRejection } from "react-dropzone";
import { UploadCloud, FileText, X } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface GSLFileUploadProps {
  name: string;
  label: string;
}

const GSLFileUpload = ({ name, label }: GSLFileUploadProps) => {
  const { control, setValue, watch } = useFormContext();
  const [fileName, setFileName] = useState<string | null>(null);

  const file = watch(name);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0 || acceptedFiles.length === 0) return;
      const selectedFile = acceptedFiles[0];
      setFileName(selectedFile.name);
      setValue(name, selectedFile, { shouldValidate: true });
    },
    [setValue, name]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] }, // Only PDFs
    maxFiles: 1,
    multiple: false,
  });

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setValue(name, null);
    setFileName(null);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors relative h-40 flex flex-col items-center justify-center ${
                isDragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              } ${fileName ? "bg-green-50 border-green-300" : "bg-white"}`}>
              <input {...getInputProps()} />

              {fileName || file ? (
                <div className="flex flex-col items-center gap-2 animate-in fade-in zoom-in duration-300">
                  <div className="bg-green-100 p-3 rounded-full text-green-600">
                    <FileText className="h-8 w-8" />
                  </div>
                  <div className="text-sm font-medium text-green-800 break-all px-4">
                    {fileName || "File Selected"}
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-500">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <UploadCloud className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Click or Drag to upload PDF
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Maximum file size 10MB
                    </p>
                  </div>
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default GSLFileUpload;
