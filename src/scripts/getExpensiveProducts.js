import fs from "node:fs/promises";
import { PATH_DB } from "../constants/path.js";

const getExpensiveProducts = async () => {
  const PRICE = 400;
  try {
    const data = await fs.readFile(PATH_DB, "utf8");
    const parsedData = JSON.parse(data);
    const filteredData = parsedData.filter((product) => product.price > PRICE);
    console.table(filteredData);
  } catch (error) {
    console.log(error);
  }
};
getExpensiveProducts();
