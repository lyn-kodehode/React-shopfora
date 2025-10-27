import { useEffect } from "react";
import { useCart } from "../store/cart";
import { Link } from "react-router-dom";

export default function SuccessPage() {
  const clearCart = useCart((state) => state.clearCart);
  const items = useCart((state) => state.items);
  const totalPrice = useCart((state) => state.getTotalPrice());

  // generate fake order#
  const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;

  // clear cart when page loads
  useEffect(() => {
    // sets a minute delay to view the order summary
    const timer = setTimeout(() => {
      clearCart();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [clearCart]);

  return (
    <div className="">
      <div className="">
        {/* Success Icon */}
        <div className="">
          <span className="">✓</span>
        </div>

        {/* Success message */}
        <h1 className="">Order Placed Successfully!</h1>

        <p className="">
          Thank you for your purchase. Your order has been confirmed and will be
          shipped accordingly.
        </p>

        {/* Order Details */}
        <div className="">
          <h2 className="">Order Summary</h2>

          <div className="">
            <div className="">
              <span className="">Order Number:</span>
              <span className=""></span>
            </div>

            <div className="">
              <span className="">Order Date:</span>
              <span className="">
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="">
              <span className="">Items Ordered:</span>
              <span className=""></span>
              {/* getTotalItems */}
            </div>

            <div className="">
              <div className="">
                <span className="">Total Paid:</span>
                <span className="">${totalPrice}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items List */}
        {items.length > 0 && (
          <div className="">
            <h3 className="">Items in Your Order</h3>
            <div className="">
              {items.map((item) => (
                <div key={item.id} className="">
                  <img src="" alt="" className="" />
                  <div className="">
                    <p className="">{item.title}</p>
                    <p className="">
                      Qty: {item.quantity} * {item.price}
                    </p>
                  </div>
                  <p className="">${totalPrice.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Message */}
        <div className="">
          <p className="">
            📧 A confirmation email has been sent to your email address with
            order details and tracking information.
          </p>
        </div>

        {/* Action BUttons */}
        <div className="">
          <Link to="/React-shopfora" className="">
            Continue Shopping
          </Link>
          <button className="">Print Receipt</button>
        </div>

        {/* Demmo Message */}
        <p className="">
          * This is a demo store. No reall order has been placed or payment
          processed.
        </p>
      </div>
    </div>
  );
}
