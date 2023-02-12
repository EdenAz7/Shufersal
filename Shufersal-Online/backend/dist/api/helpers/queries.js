"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrdersQuery = exports.getUnavailableShippingDatesQuery = exports.getCloseOrderQuery = exports.orderCartQuery = exports.getCartPriceQuery = exports.isProductInCartQuery = exports.isCartExistQuery = exports.deleteAllProductsFromCartQuery = exports.removeProductToCartQuery = exports.updateProductQuantityQuery = exports.createCartToUserQuery = exports.addProductToCartQuery = exports.getCartDetailsByCartIDQuery = exports.getCartByUserIDQuery = exports.editProductQuery = exports.addProductQuery = exports.getProductsByCategoryQuery = exports.getProductCategoriesQuery = exports.getProductByNameQuery = exports.getProductsQuery = exports.registerUserQuery = exports.isIDExistQuery = exports.isUserExistQuery = void 0;
function isUserExistQuery() {
    return `SELECT * FROM shufersal.users WHERE email = ?;`;
}
exports.isUserExistQuery = isUserExistQuery;
function isIDExistQuery() {
    return `SELECT * FROM shufersal.users WHERE id = ?;`;
}
exports.isIDExistQuery = isIDExistQuery;
function registerUserQuery() {
    return `INSERT INTO shufersal.users (id, first_name, last_name, email, password, city, street) VALUES (?, ?, ?, ?, ?, ?, ?);`;
}
exports.registerUserQuery = registerUserQuery;
//
function getProductsQuery() {
    return `SELECT * FROM shufersal.products ORDER BY category_id;`;
}
exports.getProductsQuery = getProductsQuery;
function getProductByNameQuery() {
    return `SELECT * FROM shufersal.products WHERE name LIKE ?;`;
}
exports.getProductByNameQuery = getProductByNameQuery;
function getProductCategoriesQuery() {
    return `SELECT * FROM shufersal.products_categories;`;
}
exports.getProductCategoriesQuery = getProductCategoriesQuery;
function getProductsByCategoryQuery() {
    return `SELECT * FROM shufersal.products WHERE category_id = ?;`;
}
exports.getProductsByCategoryQuery = getProductsByCategoryQuery;
function addProductQuery() {
    return `INSERT INTO shufersal.products (name, category_id, price, picture) VALUES (?, ?, ?, ?);
    `;
}
exports.addProductQuery = addProductQuery;
function editProductQuery() {
    return `UPDATE shufersal.products 
    SET 
        name = ?,
        category_id = ?,
        price = ?,
        picture = ?
    WHERE
        (id = ?);
    `;
}
exports.editProductQuery = editProductQuery;
function getCartByUserIDQuery() {
    return `SELECT 
    *
FROM
    shufersal.carts
WHERE
    user_id = ? AND status = 1;`;
}
exports.getCartByUserIDQuery = getCartByUserIDQuery;
function getCartDetailsByCartIDQuery() {
    return `SELECT 
    cd.cart_id AS cart_id,
    cd.product_id,
    p.name,
    p.price,
    cd.quantity,
    cd.total_price
FROM
    shufersal.cart_details cd
        JOIN
    shufersal.products p ON cd.product_id = p.id
HAVING cd.cart_id = ?;`;
}
exports.getCartDetailsByCartIDQuery = getCartDetailsByCartIDQuery;
function addProductToCartQuery() {
    return `INSERT INTO shufersal.cart_details (product_id, quantity, total_price, cart_id) VALUES (?, ?, ?, ?);`;
}
exports.addProductToCartQuery = addProductToCartQuery;
function createCartToUserQuery() {
    return `INSERT INTO shufersal.carts (user_id) VALUES (?);`;
}
exports.createCartToUserQuery = createCartToUserQuery;
function updateProductQuantityQuery() {
    return `UPDATE shufersal.cart_details 
    SET 
        quantity = ?,
        total_price = ?
    WHERE
        (product_id = ?) AND (cart_id = ?);
    
    `;
}
exports.updateProductQuantityQuery = updateProductQuantityQuery;
function removeProductToCartQuery() {
    return `DELETE FROM shufersal.cart_details WHERE (cart_id = ?) AND (product_id = ?) ;`;
}
exports.removeProductToCartQuery = removeProductToCartQuery;
function deleteAllProductsFromCartQuery() {
    return `DELETE FROM shufersal.cart_details WHERE (cart_id = ?);`;
}
exports.deleteAllProductsFromCartQuery = deleteAllProductsFromCartQuery;
function isCartExistQuery() {
    return `SELECT * FROM shufersal.carts WHERE id = ? AND status = 1;`;
}
exports.isCartExistQuery = isCartExistQuery;
function isProductInCartQuery() {
    return `SELECT * FROM shufersal.cart_details WHERE cart_id = ? AND product_id = ?;`;
}
exports.isProductInCartQuery = isProductInCartQuery;
function getCartPriceQuery() {
    return `SELECT sum(total_price) as total_cart_price FROM shufersal.cart_details WHERE cart_id = ?;`;
}
exports.getCartPriceQuery = getCartPriceQuery;
function orderCartQuery() {
    return `INSERT INTO shufersal.orders (user_id, cart_id, total_price, city, street, date, credit_card) VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
}
exports.orderCartQuery = orderCartQuery;
function getCloseOrderQuery() {
    return `UPDATE shufersal.carts SET status = '0' WHERE (id = ?);
    `;
}
exports.getCloseOrderQuery = getCloseOrderQuery;
function getUnavailableShippingDatesQuery() {
    return `SELECT 
    date, COUNT(*) AS shipping_date_count
FROM
    shufersal.orders
GROUP BY date
HAVING shipping_date_count > 2 AND date > NOW();`;
}
exports.getUnavailableShippingDatesQuery = getUnavailableShippingDatesQuery;
function getAllOrdersQuery() {
    return `SELECT * FROM shufersal.orders;`;
}
exports.getAllOrdersQuery = getAllOrdersQuery;
