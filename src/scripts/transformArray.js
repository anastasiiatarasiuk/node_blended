import fs from "node:fs/promises";
import { PATH_DB } from "../constants/path.js";
const transformArray = async () => {
  try {
    const data = await fs.readFile(PATH_DB, "utf8");
    const parsedData = JSON.parse(data);
    const filteredArray = parsedData.map(({ description, ...item }) => {
      return item;
    });
    await fs.writeFile(PATH_DB, JSON.stringify(filteredArray, null, 2), "utf8");
  } catch (error) {
    console.log(error);
  }
};

transformArray();
