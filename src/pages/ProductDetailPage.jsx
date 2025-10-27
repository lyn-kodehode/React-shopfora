import { useParams, useNavigate } from "react-router-dom";
import { useSingleProduct } from "../hooks/useProducts";
import { useCart } from "../store/cart";
import { useEffect, useState } from "react";

export default function ProductDetailPage() {
  // get prduct ID from the URL
  const { id } = useParams();

  // fetch product data
  const { data: product, isLoading, isError, error } = useSingleProduct(id);

  // addItem from Zustand
  const addItem = useCart((state) => state.addItem);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const navigate = useNavigate();

  // reset selected image when product changes
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [id]);

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-heading font-bold text-text-dark mb-8">
          Loading product...
        </h1>
        <p></p>
      </div>
    );
  }

  // error state
  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="font-body text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  // if product not found
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="font-body text-text-dark">Product not found</p>
      </div>
    );
  }

  // success state - show product details
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="font-body text-text-dark/70 hover:text-primary-hover transition-colors mb-6 flex items-center gap-2"
      >
        ← Back to Products
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* LEFT: image section */}
        <div>
          {/* Main image */}
          <div className="aspect-square bg-background rounded-lg overflow-hidden mb-4">
            <img
              // src={product.images[0]}
              src={product.images[selectedImageIndex]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail images */}
          <div className="grid grid-cols-4 gap-2">
            {product.images.slice(0, 4).map((image, index) => (
              <div
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`aspect-square bg-background rounded overflow-hidden border-2 cursor-pointer transition-all ${
                  selectedImageIndex === index
                    ? "border-primary ring-2 ring-primary"
                    : "border-gray-200 hover:border-primary"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.title} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: product info section */}
        <div>
          {/* Brand and category */}
          <div className="flex gap-2 text-sm font-body text-text-dark/60 mb-2">
            <span className="uppercase">{product.brand}</span>
            <span className="">•</span>
            <span>{product.category}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-heading font-bold text-text-dark mb-4">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">⭐</span>
            <span className="font-body text-lg font-semibold">
              {product.rating}
            </span>
            <span className="font-body text-sm text-text-dark/60">
              ({product.reviews?.length || 0} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mb-6">
            {/* review -baseline doesnt align */}
            <div className="flex items-baseline gap-3">
              <p className="text-5xl font-heading font-bold text-accent">
                ${product.price}
              </p>
              {product.discountPercentage > 0 && (
                <>
                  <p className="text-2xl text-text-dark/50 line-through">
                    $
                    {(
                      product.price /
                      (1 - product.discountPercentage / 100)
                    ).toFixed(2)}
                  </p>
                  <span className="bg-accent text-white text-sm font-semibold px-3 py-1 rounded-full">
                    -{Math.round(product.discountPercentage)}% OFF
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-heading font-semibold text-lg mb-2">
              Description
            </h3>
            <p className="font-body text-text-dark/80 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Stock status */}
          <div className="">
            {product.stock > 0 ? (
              <p className="font-body text-secondary font-semibold">
                ✓ In Stock ({product.stock} available)
              </p>
            ) : (
              <p className="font-body text-red-500 font-semibold">
                ✗ Out of Stock
              </p>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addItem(product)}
            disabled={product.stock === 0} //diable if out of stock
            className="w-full bg-primary-hover hover:bg-accent text-white font-heading font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews section */}
      <div className="mt-12">
        <h2 className="text-3xl font-heading font-bold text-text-dark mb-6">
          Customer Reviews
        </h2>

        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <div key={index} className="">
                {/* Reviewer info */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-heading font-semibo' text-text-dark">
                      {review.reviewerName}
                    </p>
                    <p className="text-sm font-body text-text-dark/60">
                      {review.reviewerEmail}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xl">⭐</span>
                    <span className="font-body font-semibold">
                      {review.rating}
                    </span>
                  </div>
                </div>

                {/* Review comment */}
                <p className="font-body text-text-dark/80 leading-relaxed">
                  {review.comment}
                </p>

                {/* Review date */}
                <p className="text-xs font-body text-text-dark/50 mt-3">
                  {new Date(review.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="font-body text-text-dark/60">No reviwes yet.</p>
        )}
      </div>

      {/* additional product info */}
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {/* Shipping info */}
        <div className="bg-white rounded-lg shadown-md p-6">
          <h3 className="font-heading font-semibold text-lg text-text-dark mb-3">
            📦 Shipping
          </h3>
          <p className="font-body text-sm text-text-dark/70">
            {product.shippingInformation || "Standard shipping available"}
          </p>
        </div>

        {/* Warranty info */}
        <div className="bg-white rounded-lg shadown-md p-6">
          <h3 className="font-heading font-semibold text-lg text-text-dark mb-3">
            🛡️ Warranty
          </h3>
          <p className="font-body text-sm text-text-dark/70">
            {product.warrantyInformation || "No warranty information"}
          </p>
        </div>

        {/* Return Policy */}
        <div className="bg-white rounded-lg shadown-md p-6">
          <h3 className="font-heading font-semibold text-lg text-text-dark mb-3">
            ↩️ Returns
          </h3>
          <p className="font-body text-sm text-text-dark/70">
            {product.returnPolicy || "Standard return policy applies"}
          </p>
        </div>
      </div>
    </div>
  );
}
