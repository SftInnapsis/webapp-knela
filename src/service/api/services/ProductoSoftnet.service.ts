import { ProductoSoftnetRepository } from "../repositories/ProductoSoftnet.reposiitory";

export const ProductoSoftnetService = {
   getProducto,
};

function getProducto(token) {
   return ProductoSoftnetRepository.getProducto(token);
}

