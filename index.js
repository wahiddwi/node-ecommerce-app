import express from "express";

import * as ProductServices from "./services/products.js";

const app = express();
const port = 8080;
const host = "localhost";

app.use(express.json());

app.get("/api/products", ProductServices.getAllProducts);
app.post("/api/product", ProductServices.createProduct);
app.put("/api/product/:id", ProductServices.updateProduct);
app.delete("/api/product/:id", ProductServices.deleteProduct);

// run server
app.listen(port, host, () => {
  // console.log(api);
  console.log(`Server berjalan di http://${host}:${port}`);
});
