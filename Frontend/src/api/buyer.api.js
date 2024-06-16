import { api } from ".";

export function buyerRegister(data) {
  return api.post("/buyer/register", data);
}

export function buyerLogin(data) {
  return api.post("/buyer/login", data);
}

export function buyerGetShops() {
  return api.get("/buyer/shop");
}

export function buyerGetShopBooks(shopId, data) {
  return api.get(`/buyer/book-shop/${shopId}`, data);
}

export function buyerCreateOrder(data) {
  return api.post("/buyer/create-order", data);
}

export function buyerGetOrders() {
  return api.get("/buyer/get-orders");
}

export function buyerViewShop() {
  return api.get("/buyer/view-shop");
}
