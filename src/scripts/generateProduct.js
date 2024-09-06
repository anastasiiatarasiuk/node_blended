import { createFakeProduct } from "../utils/createFakeProduct.js";
import { PATH_DB } from "../constants/path.js";
import fs from "node:fs/promises";

const generateProducts = async (number) => {
  try {
    const data = await fs.readFile(PATH_DB, "utf8");
    const products = JSON.parse(data);
    for (let i = 0; i < number; i += 1) {
      products.push(createFakeProduct());
    }
    await fs.writeFile(PATH_DB, JSON.stringify(products, null, 2), "utf8");
  } catch (error) {
    console.log(error);
  }
};

generateProducts(5);
