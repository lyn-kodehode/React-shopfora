import { useCart } from "../store/cart";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const addItem = useCart((state) => state.addItem);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      {/* clickable product card */}
      <Link to={`/product/${product.id}`}>
        {/* product image + badge + discount + stock */}
        <div className="aspect-square bg-background relative">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover"
          />

          {/* discount badge if theres any */}
          {product.discountPercentage > 0 && (
            <div className="absolute top-2 right-2 bg-accent text-white text-xs font-semibold px-2 py-1 rounded-full">
              -{Math.round(product.discountPercentage)}%
            </div>
          )}

          {/* Low-stock badge */}
          {/* {product.availabilityStatus === "Low Stock"} */}
          {product.stock < 10 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Low Stock
            </div>
          )}
        </div>

        {/* product content */}
        <div className="p-4">
          {/* product brand */}
          <p className="text-xs font-body text-text-dark/60 uppercase mb-1">
            {product.brand}
          </p>

          {/* product title */}
          <h3 className="font-heading text-lg font-semibold text-text-dark mb-2 line-clamp-2">
            {product.title}
          </h3>

          {/* price and rating */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-2xl font-heading font-bold text-accent">
                ${product.price}
              </p>
              {product.discountPercentage > 0 && (
                <p className="text-sm text-text-dark/50 line-through">
                  $
                  {(
                    product.price /
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}
                </p>
              )}
            </div>
            <p className="text-sm font-body text-text-dark/70">
              ⭐ {product.rating}
            </p>
          </div>

          {/* add to cart button */}
          {/* <button
            className="w-full bg-primary-hover hover:bg-accent text-white font-heading font-semibold py-2 px-4 rounded-lg transition-colors"
            onClick={() => addItem(product)}
          >
            Add to Cart
          </button> */}
        </div>
      </Link>

      {/* add to cart button */}
      <div className="px-4 pb-4">
        <button
          className="w-full bg-primary-hover hover:bg-accent text-white font-heading font-semibold py-2 px-4 rounded-lg transition-colors"
          onClick={() => addItem(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
