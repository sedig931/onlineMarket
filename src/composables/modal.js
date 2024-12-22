import { products, offProducts } from "./dataBse.js"

export const getSingleProduct = async function (id) {
    let product = {};
    // try {
    //     await fetch(`http://localhost:301/customer/get/product/${id}`, {
    //         credentials: 'include',
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(res => res.json())
    //         .then(data => {
    //             product.name = data.name;
    //             product.price = data.price;
    //         });
    //     return product;
    // }
    // catch (err) {
    //     throw err;
    // }
    const noOfferProduct = products.find(pro =>
        pro.id === id
    )
    if (noOfferProduct) {
        return noOfferProduct
    } else {
        return offProducts.find(pro =>
            pro.id === id
        )
    }
}

export const getOffersProducts = async function () {
    // let offersProducts = [];
    // await fetch('http://localhost:301/customer/offers/products', {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }).then(res => res.json())
    //     .then(data => {
    //         data.forEach(product => {
    //             const product1 = {};
    //             product1.id = product._id;
    //             product1.name = product.name;
    //             product1.price = product.price;
    //             product1.dicprice = product.price - 5;
    //             product1.img = product.picname;
    //             product1.carted = false;
    //             product1.amount = 1;
    //             offersProducts.push(product1);
    //         })
    //     });
    // return offersProducts;
    return offProducts;
}
export const getProducts = async function () {
    // let Products = [];
    // await fetch('http://localhost:301/customer/all/products', {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }).then(res => res.json())
    //     .then(data => {
    //         data.forEach(product => {
    //             const product1 = {};
    //             product1.id = product._id;
    //             product1.name = product.name;
    //             product1.price = product.price;
    //             product1.dicprice = product.price - 5;
    //             product1.img = product.picname;
    //             product1.carted = false;
    //             product1.amount = 1;

    //             Products.push(product1);
    //         })
    //     });
    // return Products;
    return products;
}

export const addDeleveryCart = async function (cart) {
    // try {
    //     await fetch('http://localhost:301/customer/push/cart', {
    //         credentials: 'include',
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(
    //             cart
    //         )
    //     })
    // } catch (err) {
    //     console.log(err.message);
    // }
    // console.log(cart);

}

export const getCustomerDcarts = async function (phone) {
    // try {
    //     let carts;
    //     await fetch(`http://localhost:301/customer/get/customer/dcarts/${phone}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(res => res.json())
    //         .then(data => {

    //             carts = data;
    //         });
    //     console.log(carts);
    //     return carts;
    // } catch (err) {
    //     throw err;
    // }
}