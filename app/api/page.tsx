import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req:any, res:any) {
  // Find the absolute path of the "json" directory
  const jsonDirectory = path.join(process.cwd(), 'data');
  console.log(process.cwd())
  // Read the "data.json" file
  const fileContents = await fs.readFile(jsonDirectory + '/product.json', 'utf8');
  // Return the content of the data file in JSON format
  console.log(res)
  // res.status(200).json(JSON.parse(fileContents));
}