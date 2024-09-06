import fs from "node:fs/promises";
import { PATH_DB } from "../constants/path.js";

const getTotalPrice = async () => {
  try {
    const data = await fs.readFile(PATH_DB, "utf8");
    const parsedData = JSON.parse(data);
    const total = parsedData.reduce((sum, item) => sum + Number(item.price), 0);
    console.log(total);
  } catch (error) {
    console.log(error);
  }
};
getTotalPrice();
