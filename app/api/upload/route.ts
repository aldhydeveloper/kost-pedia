import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
// import imageCompression from "browser-image-compression";
const options = {
  maxSizeMB: 0.5, // Maksimal ukuran gambar dalam MB
  maxWidthOrHeight: 1920, // Maksimal lebar atau tinggi gambar
  useWebWorker: true, // Gunakan Web Worker untuk meningkatkan kinerja
};
export const POST = async (req: any, res: any) => {
  const formData = await req.formData();
  // const key = [];
  // let i = 0;
  // const formDataEntryValues = Array.from(formData);
  let url: any = [];
  // let i;
  // i = 0;
  // console.log(formData);
  for (const formDataEntryValue of formData) {
    let file = formDataEntryValue[1] as unknown as Blob;
    if (typeof file.name === "string") {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = Math.round(Math.random() * 10000000) + ".jpg";
      try {
        let realPath = path.join(process.cwd(), "public/uploads/" + filename);
        await writeFile(realPath, new Uint8Array(buffer));
        // console.log(formData);
        const key = formDataEntryValue[0] in url;
        // console.log(key);
        url = {
          ...url,
          [formDataEntryValue[0]]: !key
            ? [`public/uploads/${filename}`]
            : [...url[formDataEntryValue[0]], `public/uploads/${filename}`],
        };
      } catch (error) {
        console.log("Error occured ", error);
        return NextResponse.json({ Message: "Failed", status: 500, url: [] });
      }
      // i++;
    }
  }
  return NextResponse.json({
    Message: "Success",
    status: 200,
    url_image: url,
  });
};
