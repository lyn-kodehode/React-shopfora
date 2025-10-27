import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../store/cart";
import { useState } from "react";

export default function CheckoutPage() {
  const items = useCart((state) => state.items);
  const navigate = useNavigate();
  const totalPrice = useCart((state) => state.getTotalPrice());

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
  });

  // handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/checkout/success");
  };

  // if cart is empty
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-heading font-bold text-text-dark mb-4">
          Your Cart is Empty
        </h1>
        <p className="font-body text-text-dark/70 mb-6">
          Add some items before checking out!
        </p>
        <Link
          to="/"
          className="inline-block bg-primary-hover hover:bg-accent text-white font-heading font-semibold py-3 px-8 rounded-lg transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-heading font-bold text-text-dark mb-8">
        Checkout
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT: Checkout form 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Info section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-heading font-semibold text-text-dark mb-6">
                Shipping Information
              </h2>

              <div className="space-y-4">
                {/* Full name */}
                <div>
                  <label className="block font-body text-sm font-semibold text-text-dark mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className=""
                    placeholder="john@example.com"
                  />
                </div>

                {/* Street Address */}
                <div>
                  <label className="">Street Address *</label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    required
                    className=""
                    placeholder="123 Clark Rd"
                  />
                </div>

                {/* City, State, Zip */}
                <div className="grid md:grid-cols-3 gap-4">
                  <label className="">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className=""
                    placeholder="Paradise"
                  />
                </div>
                <div>
                  <label className="">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className=""
                    placeholder="California"
                  />
                </div>
                <div>
                  <label className="">Zip Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className=""
                    placeholder="10001"
                  />
                </div>

                {/* Payment Info */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-heading font-semibold text-text-dark mb-6">
                    Payment Information
                  </h2>

                  <div className="space-y-4">
                    {/* Card number */}
                    <div>
                      <label className="">Card Number *</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                        maxLength="16"
                        className=""
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                  </div>

                  {/* Expiry and CVV */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label>Expiry Date *</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        required
                        maxLength="5"
                        className=""
                        placeholder="MM/YY"
                      />
                    </div>

                    <div>
                      <label>CVV *</label>
                      <input
                        type="text"
                        name="cardCVV"
                        value={formData.cardCVV}
                        onChange={handleInputChange}
                        required
                        maxLength="3"
                        className=""
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/*  */}
            </div>

            {/*  */}
          </div>

          {/* RIGHT: Order Summary  */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-heading font-semibold text-text-dark mb-4">
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-body text-sm text-text-dark font-semibold">
                        {item.title}
                      </p>
                      <p className="font-body text-xs text-text-dark/60">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-body text-sm font-semibold text-text-dark">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between font-heading text-xl font-bold text-text-dark">
                  <span>Total:</span>
                  <span className="text-accent">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary-hover hover:bg-accent text-white font-heading font-semibold py-4 rounded-lg transition-colors text-lg"
              >
                Place Order
              </button>

              <p className="text-xs font-body text-text-dark/60 text-center mt-4">
                * This is a demo. No real payment will be processed
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
