import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req: any, res: any) => {
  const formData = await req.formData();
  const key = [];
  let i = 0;
  for (const k of formData.keys()) {
    key[i] = k;
    i++;
  }
  // const file = formData.get("file");
  // if (!file) {
  //   return NextResponse.json({ error: "No files received." }, { status: 400 });
  // }
  const formDataEntryValues = Array.from(formData);
  let url: any = [];
  // let i;
  i = 0;
  // console.log(formData);
  for (const formDataEntryValue of formData) {
    // console.log(formDataEntryValue[1]);
    let file = formDataEntryValue[1] as unknown as Blob;
    // console.log(file);
    if (typeof file !== "string") {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = file.name.replaceAll(" ", "_");
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
