import fs from "node:fs/promises";
import { PATH_DB } from "../constants/path.js";

const logFormattedData = async () => {
  try {
    const data = await fs.readFile(PATH_DB, "utf8");
    const parsedData = JSON.parse(data);
    parsedData.forEach((element) => {
      console.log(
        ` ${element.name} - ${Math.round(element.price)} - ${element.category}`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

logFormattedData();
