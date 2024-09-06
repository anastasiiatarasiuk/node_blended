import fs from "node:fs/promises";
import { PATH_DB } from "../constants/path.js";
import path from "node:path";

const createFiles = async () => {
  try {
    const data = await fs.readFile(PATH_DB, "utf8");
    const parsedData = JSON.parse(data);

    parsedData.forEach((element, index) => {
      const filePath = path.join(
        process.cwd(),
        "src",
        "files",
        `${index + 1}.json`
      );
      fs.writeFile(filePath, JSON.stringify(element, null, 2), "utf8");
    });
  } catch (error) {
    console.log(error);
  }
};

createFiles();
