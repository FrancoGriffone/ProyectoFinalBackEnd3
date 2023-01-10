import { Router } from "express";
import productFaker from '../../mocks/prodFaker.js';
const prodRouter = new Router();
import { faker } from "@faker-js/faker";



prodRouter.get("/api/productos-test", (req, res) =>
    res.json(productFaker(5)));

prodRouter.post("/api/productos-test", async (req, res) => {
    let response = [];
    for (let index = 0; index <= 5; index++) {
        response.push({
            title: faker.commerce.product(),
            price: faker.commerce.price(),
            thumbnail: faker.image.image()
        });
    }
    res.json(response);
});

export default prodRouter;