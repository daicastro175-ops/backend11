import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "./data/products.json");

class ExportDAO {
    async saveProducts(products) {
        await fs.writeFile(
            filePath,
            JSON.stringify(products, null, 2)
        );
    }
}

export default new ExportDAO();