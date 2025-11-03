import { useEffect, useState } from "react";
import { useCart } from "../store/cart";
import { Link } from "react-router-dom";

export default function SuccessPage() {
  const clearCart = useCart((state) => state.clearCart);
  const items = useCart((state) => state.items);
  const totalPrice = useCart((state) => state.getTotalPrice());
  const totalItems = useCart((state) => state.getTotalItems());

  // generate fake order#
  const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;

  // snapshot of order
  const [orderSnapshot] = useState({
    items: items,
    totalPrice: totalPrice,
    totalItems: totalItems,
    orderNumber: orderNumber,
    orderDate: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  });

  // clear cart when leaving success page in any method
  useEffect(() => {
    return () => clearCart();
  }, [clearCart]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 ">
          <span className="text-6xl">✓</span>
        </div>

        {/* Success message */}
        <h1 className="text-4xl font-heading font-bold text-text-dark mb-4">
          Order Placed Successfully!
        </h1>

        <p className="font-body text-lg text-text-dark/70 mb-8">
          Thank you for your purchase. Your order has been confirmed and will be
          shipped accordingly.
        </p>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadown-md p-6 mb-8">
          <h2 className="text-2xl font-heading font-semibold text-text-dark mb-4">
            Order Summary
          </h2>

          <div className="space-y-3 text-left">
            <div className="flex justify-between font-body">
              <span className="text-text-dark/70">Order Number:</span>
              <span className="font-semibold text-text-dark">
                {/* {orderNumber} */}
                {orderSnapshot.orderNumber}
              </span>
            </div>

            <div className="flex justify-between font-body">
              <span className="text-text-dark/70">Order Date:</span>
              <span className="font-semibold text-text-dark">
                {/* {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })} */}
                {orderSnapshot.orderDate}
              </span>
            </div>

            <div className="flex justify-between font-body">
              <span className="text-text-dark/70">Items Ordered:</span>
              <span className="font-semibold text-text-dark">
                {/* {totalItems} */}
                {orderSnapshot.totalItems}
              </span>
              {/* getTotalItems */}
            </div>

            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="flex justify-between font-heading text-xl">
                <span className="text-text-dark/70">Total Paid:</span>
                <span className="font-bold text-accent">
                  ${orderSnapshot.totalPrice}
                  {/* {totalPrice} */}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items List */}
        {/* {items.length > 0 && ( */}
        {orderSnapshot.items.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-heading font-semibold text-text-dark mb-4">
              Items in Your Order
            </h3>
            <div className="space-y-3">
              {/* {items.map((item) => ( */}
              {orderSnapshot.items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 text-left">
                    <p className="font-body text-sm text-text-dark font-semibold">
                      {item.title}
                    </p>
                    <p className="font-body text-xs text-text-dark/60">
                      Qty: {item.quantity} * {item.price}
                    </p>
                  </div>
                  <p className="font-body text-sm font-semibold text-text-dark">
                    {/* ${totalPrice.toFixed(2)} */}$
                    {orderSnapshot.totalPrice.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Message */}
        <div className="bg-background rounded-lg p-4 mb-8">
          <p className="font-body text-sm text-text-dark/70">
            📧 A confirmation email has been sent to your email address with
            order details and tracking information.
          </p>
        </div>

        {/* Action BUttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/React-shopfora"
            className="inline-block bg-primary-hover hover:bg-accent text-white font-heading font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Continue Shopping
          </Link>
          <button
            onClick={() => window.print()}
            className="bg-white hover:bg-gray-50 text-text-dark border-2 border-gray-300 font-heading font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Print Receipt
          </button>
        </div>

        {/* Demmo Message */}
        <p className="text-xs font-body text-text-dark/60 text-center mt-4">
          * This is a demo store. No real order has been placed or payment
          processed.
        </p>
      </div>
    </div>
  );
}
