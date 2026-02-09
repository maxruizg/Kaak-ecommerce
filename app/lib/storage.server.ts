/**
 * Image upload handling via Vercel Blob
 * Falls back to local storage in development
 */

export async function uploadImage(
  file: File,
  folder: string = "products"
): Promise<string> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    // Production: Use Vercel Blob
    const { put } = await import("@vercel/blob");
    const filename = `${folder}/${Date.now()}-${file.name}`;
    const blob = await put(filename, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return blob.url;
  }

  // Development: Return a placeholder URL
  console.log(`[Storage Dev] Would upload: ${folder}/${file.name}`);
  return `/images/${folder}/${file.name}`;
}

export async function deleteImage(url: string): Promise<void> {
  if (process.env.BLOB_READ_WRITE_TOKEN && url.includes("blob.vercel-storage.com")) {
    const { del } = await import("@vercel/blob");
    await del(url, { token: process.env.BLOB_READ_WRITE_TOKEN });
    return;
  }

  console.log(`[Storage Dev] Would delete: ${url}`);
}
