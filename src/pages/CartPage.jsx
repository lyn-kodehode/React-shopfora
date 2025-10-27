import { useCart } from "../store/cart";
import { Link } from "react-router-dom";
import { HiTrash, HiPlus, HiMinus } from "react-icons/hi";

export default function CartPage() {
  const items = useCart((state) => state.items);
  const removeItem = useCart((state) => state.removeItem);
  const updateQuantity = useCart((state) => state.updateQuantity);
  const totalPrice = useCart((state) => state.getTotalPrice());

  // if cart is empty
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-heading font-bold text-text-dark mb-4">
          Your Cart is Empty
        </h1>
        <Link
          to="/React-shopfora"
          className="inline-block bg-primary-hover hover:bg-accent text-white font-heading font-semibold py-3 px-8 rounded-lg transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // if cart has item/s
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-heading font-bold text-text-dark mb-8">
        Shopping Cart
      </h1>

      {/* space-betweenY children except first element */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md p-4 flex gap-4"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1">
              {/* <div> */}
              <h3 className="font-heading font-semibold text-text-dark">
                {item.title}
              </h3>

              <p className="font-heading font-bold text-accent">
                ${item.price}
              </p>
              {/* <p className="font-body text-text-dark/70">
                Quantity: {item.quantity}
              </p> */}
            </div>

            {/* quantity controls */}
            <div className="flex items-center gap-2 bg-background rounded-lg px-3 py-2">
              <button
                onClick={() => updateQuantity(item.id, item.updateQuantity - 1)}
                className="text-text-dark hover:text-primary-hover transition-colors"
              >
                <HiMinus />
              </button>
              <span className="font-body font-semibold text-text-dark w-8 text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, item.updateQuantity + 1)}
                className="text-text-dark hover:text-primary-hover transition-colors"
              >
                <HiPlus />
              </button>
            </div>

            {/* remove from cart button */}
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:text-red-700 transition-colors h-fit"
            >
              <HiTrash className="text-xl" />
            </button>
          </div>
        ))}
      </div>

      {/* Checkout section with total price*/}
      <div className="mt-8 bg-white rounded-lg p-6 max-w-md ml-auto">
        <div className="flex justify-between font-heading font-bold text-text-dark text-2xl">
          <span>Total:</span>
          <span className="text-accent">${totalPrice.toFixed(2)}</span>
        </div>
        <Link
          to="/React-shopfora/checkout"
          className="w-full mt-4 bg-primary-hover hover:bg-accent text-white font-heading font-semibold py-3 rounded-lg transition-colors block text-center"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

// width -405 trash icon is by the border container
