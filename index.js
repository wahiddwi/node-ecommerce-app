import express from "express";

import * as ProductServices from "./services/products.js";
import * as UserServices from "./services/users.js";
import * as CategoryServices from "./services/categories.js";
import * as OrderServices from "./services/orders.js";

const app = express();
const port = 8080;
const host = "localhost";

app.use(express.json());

app.get("/api/categories", CategoryServices.getAllCategories);
app.post("/api/category", CategoryServices.createCategory);
app.put("/api/category/:id", CategoryServices.updateCategory);
app.delete("/api/category/:id", CategoryServices.deleteCategory);

app.get("/api/products", ProductServices.getAllProducts);
app.post("/api/product", ProductServices.createProduct);
app.put("/api/product/:id", ProductServices.updateProduct);
app.delete("/api/product/:id", ProductServices.deleteProduct);

app.post("/api/login", UserServices.auth);
// app.delete("/api/logout", UserServices.logout);
app.post("/api/register", UserServices.register);

app.get("/api/users", UserServices.getAllUsers);
app.put("/api/user/:id", UserServices.updateUser);
app.delete("/api/user/:id", UserServices.deleteUser);

app.get("/api/orders", OrderServices.getAllOrders);
app.post("/api/order", OrderServices.createorders);
app.put("/api/order/:id", OrderServices.updateOrder);
app.delete("/api/order/:id", OrderServices.deleteOrder);

// run server
app.listen(port, host, () => {
  // console.log(api);
  console.log(`Server berjalan di http://${host}:${port}`);
});
