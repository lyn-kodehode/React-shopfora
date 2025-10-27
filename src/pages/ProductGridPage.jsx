import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

export default function ProductGridPage() {
  // mock data mimicking dummyJSON structure
  /* const mockProducts = [
    {
      id: 1,
      title: "Essence Mascara Lash Princess",
      price: 9.99,
      thumbnail:
        "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
      rating: 4.94,
      brand: "Essence",
      discountPercentage: 7.17,
      stock: 5,
    },
    {
      id: 2,
      title: "Eyeshadow Palette with Mirror",
      price: 19.99,
      thumbnail:
        "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png",
      rating: 3.28,
      brand: "Glamour Beauty",
      discountPercentage: 5.5,
      stock: 44,
    },
    {
      id: 3,
      title: "Powder Canister",
      price: 14.99,
      thumbnail:
        "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png",
      rating: 3.82,
      brand: "Velvet Touch",
      discountPercentage: 18.14,
      stock: 59,
    },
  ]; */

  const { data: products, isLoading, isError, error } = useProducts();

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-heading font-bold text-text-dark mb-8">
          All Products
        </h1>
        <p className="font-body text-text-ark/70">Loading products...</p>
      </div>
    );
  }

  // error state
  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-heading font-bold text-text-dark mb-8">
          All Products
        </h1>
        <p className="font-body text-red-500">
          Error loading products: {error.message}
        </p>
      </div>
    );
  }

  // success state - show all products
  return (
    // container class, margin-inline, paddingX, paddingY
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-heading font-bold text-text-dark mb-4">
        All Products
      </h1>

      {/* testing mock data */}
      {/* dummyJSON API data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
