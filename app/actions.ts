"use server";

import { db, files } from "@/db";
import { FormValues } from "./form";

type NewImages = typeof files.$inferInsert;

export async function sendImages(selectedImages: FormValues) {
  // console.log(selectedImages);
  const newImages: NewImages[] = selectedImages.map(({ file, fileName }) => ({
    fileName,
    file,
  }));

  await db.insert(files).values(newImages);
}
