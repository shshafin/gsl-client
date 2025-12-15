/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useDropzone, FileRejection } from "react-dropzone";
import { UploadCloud, X, Image as ImageIcon } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";

interface GSLSingleImageUploadProps {
  name: string;
  label: string;
}

const GSLSingleImageUpload = ({ name, label }: GSLSingleImageUploadProps) => {
  const { control, setValue, watch } = useFormContext();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const file = watch(name);

  // Handle Initial Value (String URL from Edit Page) or File object
  useEffect(() => {
    if (typeof file === "string") {
      setPreviewUrl(file);
    } else if (file instanceof File) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  }, [file]);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0 || acceptedFiles.length === 0) return;

      const selectedFile = acceptedFiles[0]; // Take only the first file
      setValue(name, selectedFile, { shouldValidate: true });
    },
    [setValue, name]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1, // 🔒 Strict Limit
    multiple: false,
  });

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setValue(name, null);
    setPreviewUrl(null);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="space-y-4">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors relative h-64 flex flex-col items-center justify-center overflow-hidden ${
                  isDragActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}>
                <input {...getInputProps()} />

                {previewUrl ? (
                  <>
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-contain p-2"
                    />
                    <button
                      type="button"
                      onClick={removeFile}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow-md z-10 hover:bg-red-600 transition-colors">
                      <X className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-500">
                    <div className="bg-gray-100 p-3 rounded-full">
                      <UploadCloud className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Click to upload photo
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        SVG, PNG, JPG or GIF (max. 800x800px)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default GSLSingleImageUpload;
