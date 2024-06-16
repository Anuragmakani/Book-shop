import { api } from ".";

export function sellerRegister(data) {
  return api.post("/seller/register", data);
}

export function sellerLogin(data) {
  return api.post("/seller/login", data);
}

export function sellerCreateShop(data) {
  return api.post("/seller/one/create-shop", data);
}

export function sellerGetBook(sellerId, data) {
  return api.get(`/seller/get-books/${sellerId}`, data);
}

export function sellerGetOrders(data) {
  return api.get("/seller/get-oreders", data);
}
