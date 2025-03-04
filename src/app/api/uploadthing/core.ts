import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  categoryImage: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    async ({ file }) => {
      // This code RUNS ON YOUR SERVER after upload

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: "evairo" };
    },
  ),
  brandImage: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    async ({ file }) => {
      // This code RUNS ON YOUR SERVER after upload

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: "evairo" };
    },
  ),
  warehouseImage: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    async ({ file }) => {
      // This code RUNS ON YOUR SERVER after upload

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: "evairo" };
    },
  ),
  supplierImage: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    async ({ file }) => {
      // This code RUNS ON YOUR SERVER after upload

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: "evairo" };
    },
  ),
  // productImage: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
  //   async ({ file }) => {
  //     // This code RUNS ON YOUR SERVER after upload

  //     console.log("file url", file.url);

  //     // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
  //     return { uploadedBy: "evairo" };
  //   },
  // ),
  productImages: f({
    image: { maxFileSize: "4MB", maxFileCount: 3 },
  }).onUploadComplete(async ({ file }) => {
    // This code RUNS ON YOUR SERVER after upload

    console.log("file url", file.url);

    // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
    return { uploadedBy: "evairo" };
  }),

  userImage: f({
    image: { maxFileSize: "1MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    // This code RUNS ON YOUR SERVER after upload

    console.log("file url", file.url);

    // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
    return { uploadedBy: "evairo" };
  }),

  advertImage: f({
    image: { maxFileSize: "1MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    // This code RUNS ON YOUR SERVER after upload

    console.log("file url", file.url);

    // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
    return { uploadedBy: "evairo" };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
