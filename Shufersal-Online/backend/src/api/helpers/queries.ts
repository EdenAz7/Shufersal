export function isUserExistQuery(): string {
    return `SELECT * FROM shufersal.users WHERE email = ?;`
}
export function isIDExistQuery(): string {
    return `SELECT * FROM shufersal.users WHERE id = ?;`
}
export function registerUserQuery(): string {
    return `INSERT INTO shufersal.users (id, first_name, last_name, email, password, city, street) VALUES (?, ?, ?, ?, ?, ?, ?);`
}
//
export function getProductsQuery(): string {
    return `SELECT * FROM shufersal.products ORDER BY category_id;`
}
export function getProductByNameQuery(): string {
    return `SELECT * FROM shufersal.products WHERE name LIKE ?;`
}
export function getProductCategoriesQuery(): string {
    return `SELECT * FROM shufersal.products_categories;`
}
export function getProductsByCategoryQuery(): string {
    return `SELECT * FROM shufersal.products WHERE category_id = ?;`
}
export function addProductQuery(): string {
    return `INSERT INTO shufersal.products (name, category_id, price, picture) VALUES (?, ?, ?, ?);
    `
}
export function editProductQuery(): string {
    return `UPDATE shufersal.products 
    SET 
        name = ?,
        category_id = ?,
        price = ?,
        picture = ?
    WHERE
        (id = ?);
    `
}
export function getCartByUserIDQuery(): string {
    return `SELECT 
    *
FROM
    shufersal.carts
WHERE
    user_id = ? AND status = 1;`
}
export function getCartDetailsByCartIDQuery(): string {
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
HAVING cd.cart_id = ?;`
}
export function addProductToCartQuery(): string {
    return `INSERT INTO shufersal.cart_details (product_id, quantity, total_price, cart_id) VALUES (?, ?, ?, ?);`
}
export function createCartToUserQuery(): string {
    return `INSERT INTO shufersal.carts (user_id) VALUES (?);`
}
export function updateProductQuantityQuery(): string {
    return `UPDATE shufersal.cart_details 
    SET 
        quantity = ?,
        total_price = ?
    WHERE
        (product_id = ?) AND (cart_id = ?);
    
    `
}
export function removeProductToCartQuery(): string {
    return `DELETE FROM shufersal.cart_details WHERE (cart_id = ?) AND (product_id = ?) ;`
}
export function deleteAllProductsFromCartQuery(): string {
    return `DELETE FROM shufersal.cart_details WHERE (cart_id = ?);`
}
export function isCartExistQuery(): string {
    return `SELECT * FROM shufersal.carts WHERE id = ? AND status = 1;`
}
export function isProductInCartQuery(): string {
    return `SELECT * FROM shufersal.cart_details WHERE cart_id = ? AND product_id = ?;`
}
export function getCartPriceQuery(): string {
    return `SELECT sum(total_price) as total_cart_price FROM shufersal.cart_details WHERE cart_id = ?;`
}
export function orderCartQuery(): string {
    return `INSERT INTO shufersal.orders (user_id, cart_id, total_price, city, street, date, credit_card) VALUES (?, ?, ?, ?, ?, ?, ?);
    `
}
export function getCloseOrderQuery(): string {
    return `UPDATE shufersal.carts SET status = '0' WHERE (id = ?);
    `
}
export function getUnavailableShippingDatesQuery(): string {
    return `SELECT 
    date, COUNT(*) AS shipping_date_count
FROM
    shufersal.orders
GROUP BY date
HAVING shipping_date_count > 2 AND date > NOW();`
}
export function getAllOrdersQuery(): string {
    return `SELECT * FROM shufersal.orders;`
}