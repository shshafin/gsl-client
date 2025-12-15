import { useFormContext } from "react-hook-form";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Code,
  Heading1,
  Heading2,
  Quote,
  SeparatorHorizontal,
  Strikethrough,
  Redo,
  Undo,
} from "lucide-react";

// --- Toolbar Component ---
const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const buttons = [
    {
      icon: Bold,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      icon: Italic,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
    },
    {
      icon: Strikethrough,
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
    },
    {
      icon: Code,
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: editor.isActive("code"),
    },
    {
      icon: Heading1,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: Heading2,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: List,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      icon: ListOrdered,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
    },
    {
      icon: Quote,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
    },
    {
      icon: SeparatorHorizontal,
      action: () => editor.chain().focus().setHorizontalRule().run(),
      isActive: false,
    },
    {
      icon: Undo,
      action: () => editor.chain().focus().undo().run(),
      isActive: false,
      disabled: !editor.can().undo(),
    },
    {
      icon: Redo,
      action: () => editor.chain().focus().redo().run(),
      isActive: false,
      disabled: !editor.can().redo(),
    },
  ];

  return (
    <div className="flex flex-wrap items-center p-2 border-b border-gray-300 bg-gray-50 rounded-t-lg">
      {buttons.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <button
            key={index}
            onClick={item.action}
            disabled={item.disabled}
            className={cn(
              "p-2 mx-0.5 rounded transition-colors duration-100",
              item.isActive
                ? "bg-black text-white"
                : "text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            )}
            type="button">
            <IconComponent className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
};

// --- Main Form Component ---
interface GSLTipTapEditorProps {
  name: string;
  label: string;
  placeholder?: string;
}

const GSLRichTextEditor = ({
  name,
  label,
  placeholder,
}: GSLTipTapEditorProps) => {
  const { control, setValue } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const editor = useEditor(
          {
            extensions: [
              StarterKit.configure({
                bulletList: { keepAttributes: true },
                orderedList: { keepAttributes: true },
                listItem: { keepAttributes: true },
              }),
            ],
            content: field.value || "<p></p>", // Initialize with field value or empty paragraph
            onUpdate: ({ editor }) => {
              // Update react-hook-form value on editor change
              field.onChange(editor.getHTML());
            },
            onBlur: () => {
              field.onBlur(); // Mark as touched on blur
            },
            editorProps: {
              attributes: {
                class: "prose max-w-none focus:outline-none p-4 min-h-[300px]",
              },
            },
          },
          [field.value]
        ); // Reinitialize if the field value changes (e.g., when loading data in edit mode)

        // This useEffect ensures the editor's content is updated when the form.reset() runs
        useEffect(() => {
          if (editor && field.value && editor.getHTML() !== field.value) {
            // Check if the HTML content truly needs updating to prevent cursor jump
            editor.commands.setContent(field.value, false);
          }
        }, [field.value, editor]);

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div className="border border-gray-300 rounded-lg shadow-sm">
                <MenuBar editor={editor} />
                <EditorContent
                  editor={editor}
                  className="bg-white"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default GSLRichTextEditor;
