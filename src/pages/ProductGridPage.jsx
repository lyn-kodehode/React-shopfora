import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

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

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12;

  // const { data: products, isLoading, isError, error } = useProducts();
  const { data, isLoading, isError, error } = useProducts({
    page: currentPage,
    limit: limit,
  });

  // calculate total number of pages
  const totalPages = data ? Math.ceil(data.total / limit) : 0; //194 / 12 = 17
  const products = data?.products || [];

  // Pagination Handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    // (1, currentPage - 2) = 1-1, 2-1, 3-1, 4-2, 5-3, 6-4, 7-5, 8-6, 9-7, 10-8, 11-9, 12-10, 13-11, 14-12, 15-13, 16-14, 17-15
    // [1,1,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15] (17)
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    // (17, startPage + 5 -1) =1-5-5, 2-6-6, 3-7-7, 4-8-8, 5-9-9, 6-10-10, 7-11-11, 8-12-12, 9-13-13, 10-14-14, 11-15-15, 12-16-16, 13-17-17, 14-18-17, 15-19-17, 16-20-17, 17-21-17
    // [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 17, 17, 17, 17] (17)
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // adjustment when endPage approaches
    // (5 - 1 < 4){ startPage = (1, 5 - 5 + 1) = 1  }
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    // (i=1; i<= 5; i++)
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    console.log(pages);
    console.log("Current page:", currentPage);
    // shows currentPage goes up to 17

    return pages;
  };

  getPageNumbers();

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
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {/* Prev page button */}
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg font-body font-semibold transition-colors ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-text-dark hover:bg-primary-hover hover:text-white border border-gray-300 "
            }`}
          >
            <HiChevronLeft />
            Previous
          </button>

          {/* Page numbers */}
          <div className="flex gap-2">
            {/* First page if not in range */}
            {getPageNumbers()[0] > 1 && (
              <>
                <button
                  onClick={() => goToPage(1)}
                  className="px-4 py-2 rounded-lg font-body font-semibold bg-white text-text-dark hover:bg-primary-hover hover:text-white border border-gray-300 transition-colors"
                >
                  1
                </button>
                {getPageNumbers()[0] > 2 && (
                  <span className="px-4 py-2 text-text-dark/60">...</span>
                )}
              </>
            )}

            {/* Page number buttons */}
            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`px-4 py-2 rounded-lg font-body font-semibold hover:text-white border  transition-colors ${
                  currentPage === pageNum
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-text-dark hover:bg-primary-hover hover:text-white border border-gray-300"
                }  `}
              >
                {pageNum}
              </button>
            ))}

            {/* Last page if not in range */}
            {/* {getPageNumbers()[getPageNumbers().length - 1]} */}
            {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
              <>
                {getPageNumbers()[getPageNumbers().length - 1] && (
                  <span className="px-4 py-2 text-text-dark/60">...</span>
                )}
                <button
                  onClick={() => goToPage(totalPages)}
                  className="px-4 py-2 rounded-lg font-body font-semibold bg-white text-text-dark hover:bg-primary-hover hover:text-white border border-gray-300 transition-colors"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          {/* Next page button  */}
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg font-body font-semibold transition-colors ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-text-dark hover:bg-primary-hover hover:text-white border border-gray-300"
            }`}
          >
            <HiChevronRight />
            Next
          </button>
        </div>
      )}
    </div>
  );
}
