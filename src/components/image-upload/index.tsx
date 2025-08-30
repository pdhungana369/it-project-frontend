import React, { useState } from 'react';
import { BsDownload } from 'react-icons/bs';
import { IoIosClose } from 'react-icons/io';

interface IProps {
  field: string;
  setFieldValue: (field: string, value: any) => void;
  label?: string;
  className?: string;
  previewImageUrl: string;
  readOnly?: boolean;
}

const ImageUploadField: React.FC<IProps> = ({
  label,
  className,
  setFieldValue,
  field,
  previewImageUrl,
  readOnly,
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(
    previewImageUrl
  );
  const fileRef = React.useRef<HTMLInputElement | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewImage(objectUrl);
      setFieldValue(field, selectedFile);
    } else {
      alert('Please select a valid image file.');
    }
  };

  const handleImageRemove = () => {
    if (!readOnly) {
      setPreviewImage(null);
      setFieldValue(field, null);
    }
  };

  return (
    <div className={className}>
      <p className={`mb-2 text-xs font-bold text-secondary`}>{label}</p>
      {!previewImageUrl ? (
        <>
          <div
            className="flex cursor-pointer items-center justify-center space-x-3 rounded-xl border border-dashed border-primary p-5"
            onClick={() => (readOnly ? {} : fileRef.current?.click())}
            aria-hidden="true"
          >
            <BsDownload color="#4062FF" />
            <span className="text-xs">Upload Image</span>
          </div>
          <input
            ref={fileRef}
            hidden
            type="file"
            accept="image/*"
            onChange={handleChange}
            readOnly={readOnly}
          />
        </>
      ) : (
        <div className="relative">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Preview"
              className="mx-auto h-44 w-1/2 object-cover"
            />
          ) : (
            <img
              src={previewImageUrl}
              alt="Preview"
              className="mx-auto h-44 w-1/2 object-cover"
            />
          )}
          <IoIosClose
            className="absolute -top-3 right-[23%] rounded-full bg-primary"
            size={20}
            color="#FFFFFF"
            onClick={handleImageRemove}
            aria-label="Remove image"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploadField;
