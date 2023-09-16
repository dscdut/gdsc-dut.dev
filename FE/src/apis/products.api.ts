import { ProductBody } from 'src/types/products.type'
import http from 'src/utils/http'

const PRODUCTS_URL = 'products'

export const ProductAPI = {
  getProducts: () => http.get(PRODUCTS_URL),
  getProductById: (id: string | number) => http.get(`${PRODUCTS_URL}/${id}`),
  createProduct: (data: ProductBody) => http.post(PRODUCTS_URL, data),
  deleteProduct: (id: string | number) => http.delete(`${PRODUCTS_URL}/${id}`),
  updateProduct: (data: ProductBody, id: number) => http.put(`${PRODUCTS_URL}/${id}`, data)
}
