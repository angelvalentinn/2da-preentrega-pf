import { ProductManagerDB } from './src/dao/productManagerDB.js';

const PERSISTENT_PRODUCTS = new ProductManagerDB();

export default function websocket (io) {
    io.on('connection', async (socket) => {

        console.log('Nuevo cliente conectado');

        updateProducts();

        deleteProduct();

        createProduct();

        function createProduct() {
            socket.on("createProduct", async (product) => {
                await PERSISTENT_PRODUCTS.createProduct(product)
                updateProducts();
            })
        }
        
        function deleteProduct() {
            socket.on("deleteProduct", async (id) => {
                await PERSISTENT_PRODUCTS.deleteProduct(id)
                await updateProducts();
            })
        }

        async function updateProducts() {
            socket.emit("products",  await PERSISTENT_PRODUCTS.getProducts());
        }

    })
}