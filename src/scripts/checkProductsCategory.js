import fs from "node:fs/promises";
import { PATH_DB } from "../constants/path.js";

const checkProductsCategory = async () => {
  try {
    const data = await fs.readFile(PATH_DB, "utf8");
    const parsedData = JSON.parse(data);
    const first = parsedData[0];
    const filter = parsedData.every(
      (value) => value.category === first.category
    );
    console.log(filter);
  } catch (error) {
    console.log(error);
  }
};
checkProductsCategory();
