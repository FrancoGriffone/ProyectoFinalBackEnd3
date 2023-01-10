import {faker} from '@faker-js/faker'

function productFaker(n){
    let response = [];
    for (let i = 0; i <= n; i++) {
        response.push({
            title: faker.commerce.product(),
            price: faker.commerce.price(),
            thumbnail: faker.image.image()
        });
    }
}

export default productFaker