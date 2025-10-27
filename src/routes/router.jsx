import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import ProductGridPage from "../pages/ProductGridPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import SuccessPage from "../pages/SuccessPage";

export const router = createBrowserRouter([
  {
    path: "/React-shopfora",
    element: <MainLayout />,
    children: [
      { index: true, element: <ProductGridPage /> },
      {
        path: "/React-shopfora/product/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/React-shopfora/cart",
        element: <CartPage />,
      },
      {
        path: "/React-shopfora/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/React-shopfora/checkout/success",
        element: <SuccessPage />,
      },
    ],
  },
]);
