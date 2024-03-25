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
  const formDataEntryValues = Array.from(formData.values());
  let url: string[] = [];
  // let i;
  i = 0;
  // console.log(key);
  for (const formDataEntryValue of formDataEntryValues) {
    // console.log();
    let file = formDataEntryValue as unknown as Blob;
    // console.log(typeof file);
    if (typeof file !== "string") {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = file.name.replaceAll(" ", "_");
      try {
        let realPath = path.join(process.cwd(), "public/uploads/" + filename);
        await writeFile(realPath, buffer);
        // console.log(formDataEntryValues);
        url[i] = `${process.env.BASE_URL}/uploads/${filename}`;
      } catch (error) {
        console.log("Error occured ", error);
        return NextResponse.json({ Message: "Failed", status: 500, url: [] });
      }
      i++;
    }
  }
  return NextResponse.json({
    Message: "Success",
    status: 201,
    url_image: url as string[],
  });
};
