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
  let i = 0;
  const formDataEntryValues = Array.from(formData);
  let url: any = [];
  // let i;
  i = 0;
  console.log(formData);
  for (const formDataEntryValue of formData) {
    // console.log(formDataEntryValue[1]);
    // const compressedFile = await imageCompression(
    //   formDataEntryValue[1],
    //   options
    // );
    // console.log(compressedFile);
    let file = formDataEntryValue[1] as unknown as Blob;
    console.log(typeof file.name === "string");
    if (typeof file.name === "string") {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = Math.round(Math.random() * 10000000) + ".jpg";
      try {
        let realPath = path.join(process.cwd(), "public/uploads/" + filename);
        await writeFile(realPath, buffer);
        // url[i] = `/uploads/${filename}`;
        // console.log(
        //   Object.keys(url).filter((v) => v === formDataEntryValue[0])
        // );
        // if (
        //   Object.keys(url).filter((v) => v === formDataEntryValue[0]).length > 0
        // ) {
        //   url[formDataEntryValue[0]].push(`/uploads/${filename}`);
        // url = {...url, [...formDataEntryValue[0]]}
        // console.log(url[formDataEntryValue[0]]);
        // } else {
        url = { ...url, [formDataEntryValue[0]]: `/uploads/${filename}` };
        // }
      } catch (error) {
        console.log("Error occured ", error);
        return NextResponse.json({ Message: "Failed", status: 500, url: [] });
      }
      i++;
    }
  }
  return NextResponse.json({
    Message: "Success",
    status: 200,
    url_image: url,
  });
};
