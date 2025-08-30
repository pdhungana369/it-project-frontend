import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface IProps {
  label: string;
  setFieldValue: any;
  fieldName: string;
  initialValues?: string;
  className?: string;
  height?: number;
}

const EditorCustom: React.FC<IProps> = ({
  label,
  setFieldValue,
  fieldName,
  initialValues,
  className,
  height,
}) => {
  const heightEditor = height ? height : 300;
  return (
    <div className={className}>
      <label className="block text-xs font-semibold text-secondary">
        {label}
        <div className="bg-pure-white mt-1 rounded-lg shadow ring-1 ring-secondary ring-opacity-30">
          <Editor
            apiKey="avu8e5j8x21i1sbo0eti7ee1f2n4uisw4huhjnqya14fto4s"
            value={initialValues}
            init={{
              height: heightEditor,
              menubar: true,
              plugins: [
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'anchor',
                'searchreplace',
                'fullscreen',
                'insertdatetime',
                'table',
                'preview',
                'wordcount',
              ],
              toolbar:
                'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
            onEditorChange={(value) =>
              setFieldValue(fieldName, value ? value : initialValues)
            }
          />
        </div>
      </label>
    </div>
  );
};

export default React.memo(EditorCustom);
