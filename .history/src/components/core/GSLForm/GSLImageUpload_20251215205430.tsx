import { useCallback, useState } from "react";
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

interface GSLImageUploadProps {
  name: string;
  label: string;
}

const GSLImageUpload = ({ name, label }: GSLImageUploadProps) => {
  const { control, setValue, watch } = useFormContext();
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // Watch current value to handle reset or initial state
  const files = watch(name);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      // 1. Handle Max Files Error
      if (fileRejections.length > 0) {
        // You can add toast here if you want
        return;
      }

      // 2. Set Files to Form
      setValue(name, acceptedFiles, { shouldValidate: true });

      // 3. Generate Previews
      const urls = acceptedFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
    },
    [setValue, name]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: { "image/*": [] },
      maxFiles: 5, // 🔒 Strict Limit
      multiple: true,
    });

  const removeFile = (index: number) => {
    const currentFiles = files as File[];
    const newFiles = currentFiles.filter((_, i) => i !== index);
    const newPreviews = previewUrls.filter((_, i) => i !== index);

    setValue(name, newFiles);
    setPreviewUrls(newPreviews);
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
              {/* Drop Zone */}
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
                    {isDragActive
                      ? "Drop images here"
                      : "Drag & drop or click to upload"}
                  </p>
                  <p className="text-xs text-gray-400">
                    Max 5 images (JPG, PNG)
                  </p>
                </div>
              </div>

              {/* Error Message for Limit */}
              {fileRejections.length > 0 && (
                <p className="text-sm text-red-500 font-medium">
                  ⚠️ You can only upload up to 5 images.
                </p>
              )}

              {/* Image Previews */}
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
