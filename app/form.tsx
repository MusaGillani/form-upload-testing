"use client";
import { ChangeEvent, useRef, useState } from "react";
import { object, type Input, array, string } from "valibot";

const FormSchema = object({
  images: array(object({ file: string(), previewUrl: string() })),
});

type FormValues = Input<typeof FormSchema>;

const totalImages = 12;
const emptyElements = Array(totalImages).fill("Image Preview");

const Form = () => {
  const [selectedImages, setSelectedImages] = useState<FormValues["images"]>(
    []
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.splice(index, 1));
  };

  const uploadImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const state: FormValues["images"] = [];
    if (files?.length !== 0 && files) {
      for (const file of files) {
        state.push({
          file: file.name,
          previewUrl: URL.createObjectURL(file),
        });
      }
    }
    setSelectedImages((prev) => [...prev, ...state]);
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => {
          handleImageChange(e);
        }}
      />
      <button
        onClick={uploadImage}
        className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
        disabled={totalImages === selectedImages.length}
        aria-disabled={totalImages === selectedImages.length}
      >
        upload images
      </button>
      <p>Selected Images Preview</p>
      <p>
        Total Images uploaded : {selectedImages.length} / {totalImages}
      </p>
      <div className="grid grid-cols-4 gap-4">
        {selectedImages.map((image, index) => (
          <div key={index} className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.previewUrl}
              alt={`preview-${index}`}
              className=" max-w-[200px] max-h-[200px] w-[200px] h-[200px] rounded-lg"
            />
            <button
              className=" text-white bg-red-700 hover:bg-red-800  dark:bg-red-600 dark:hover:bg-red-700 absolute -top-3 -right-3 px-2 rounded-full"
              onClick={() => removeImage(index)}
            >
              -
            </button>
          </div>
        ))}
        {emptyElements.map((value, index) => {
          console.log(selectedImages.length);
          if (index < totalImages - selectedImages.length) {
            return (
              <div
                key={index}
                className="w-[200px] h-[200px] flex justify-center items-center border-2 rounded-lg bg-gray-500"
              >
                {value}
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default Form;
