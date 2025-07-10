import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import imageCompression from "browser-image-compression";

const options = {
  maxSizeMB: 1, // Maksimal ukuran gambar dalam MB
  maxWidthOrHeight: 1920, // Maksimal lebar atau tinggi gambar
  useWebWorker: true, // Gunakan Web Worker untuk meningkatkan kinerja
};
export const POST = async (req: any, res: any) => {
  const formData = await req.formData();

  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }
  const compressedFile = await imageCompression(file, options);

  const buffer = Buffer.from(await compressedFile.arrayBuffer());
  const filename = file.name.replaceAll(" ", "_");
  // console.log(filename);
  try {
    await writeFile(
      path.join(process.cwd(), "public/uploads/" + filename),
      buffer
    );
    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
