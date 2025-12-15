import { useCallback, useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useDropzone, FileRejection } from "react-dropzone";
import { UploadCloud, X } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";

interface GSLImageUploadProps {
  name: string;
  label: string;
}

const GSLImageUpload = ({ name, label }: GSLImageUploadProps) => {
  const { control, setValue, watch } = useFormContext();
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // Watch current files in the form state
  const currentFiles = watch(name) || [];

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) return;

      // 1. APPEND new files to existing ones (Don't replace!)
      const updatedFiles = [...currentFiles, ...acceptedFiles];

      // 2. Update Form
      setValue(name, updatedFiles, { shouldValidate: true });

      // 3. Generate Previews for NEW files and add to existing previews
      const newUrls = acceptedFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newUrls]);
    },
    [currentFiles, setValue, name]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 5,
    multiple: true,
  });

  const removeFile = (index: number) => {
    // Remove from Form State
    const newFiles = currentFiles.filter((_: any, i: number) => i !== index);
    setValue(name, newFiles);

    // Remove from Preview State
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // Cleanup URLs on unmount to avoid memory leaks
  useEffect(() => {
    return () => previewUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [previewUrls]);

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
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}>
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-2 text-gray-500">
                  <UploadCloud className="h-10 w-10 text-gray-400" />
                  <p className="text-sm font-medium">
                    Drag & drop or click to add images
                  </p>
                  <p className="text-xs text-gray-400">Max 5 images total</p>
                </div>
              </div>

              {/* Previews Grid */}
              {previewUrls.length > 0 && (
                <div className="grid grid-cols-5 gap-4">
                  {previewUrls.map((url, index) => (
                    <div
                      key={index}
                      className="relative group aspect-square rounded-md overflow-hidden border">
                      <Image
                        src={url}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
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

export default GSLImageUpload;
