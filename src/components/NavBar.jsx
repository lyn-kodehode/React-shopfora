import { HiShoppingCart, HiMenu, HiX, HiSearch } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useCart } from "../store/cart";
import { useState } from "react";
import { useSearchResults } from "../hooks/useProducts";

export default function NavBar() {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  // const items = useCart((state) => state.items);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const cartCount = useCart((state) => state.getTotalItems());
  const {
    data: searchResults,
    isLoading,
    isError,
    error,
  } = useSearchResults(searchTerm);

  // hamburger menu toggle
  const toggleHamburgerMenu = () => {
    // console.log(isHamburgerMenuOpen);
    setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
  };

  // search handler
  const handleSearch = (event) => {
    // event.preventDefault();
    const query = event.target.value;
    setSearchTerm(query);
    setShowResults(query.length > 0);
  };

  // clear search
  const clearSearch = () => {
    setSearchTerm("");
    setShowResults(false);
  };

  // search focus handler
  // const handleFocus = () => {
  // };

  // blur dropdown handler
  const handleBlur = () => {
    // delay to allow clicking on results
    setTimeout(() => setShowResults(false), 200);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
        {/* ShopFora Logo */}
        <Link to="/React-shopfora">
          <img
            src="./shopfora-logo-500x145.png"
            alt="ShopFora logo"
            className="h-7 md:h-9 lg:h-11 w-auto hover:opacity-90 transition-opacity"
          />
        </Link>

        {/* Search */}
        {/* <button className="md:hidden text-text-dark ">
          {" "}
          <HiSearch className="text-lg" />
        </button> */}

        {/* Search input */}
        <div className="relative w-6/12">
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            onFocus={() => searchTerm && setShowResults(true)}
            onBlur={handleBlur}
            className="w-full px-2 md:px-4 py-1 md:py-2 border border-gray-300 rounded-lg font-body text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-400"
            placeholder="Search products..."
          />

          {/* Seatch Results dowpdown */}
          {/* {showResults && searchTerm && ( */}
          {showResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-y-auto max-h-96 z-50">
              {/* close button */}
              {/* <button onClick={clearSearch} className="">
                <HiX className="text-2xl" />
              </button> */}

              {/* Loading state */}
              {isLoading && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                  <div className="p-4 text-center font-body text-text-dark/60">
                    Searching
                  </div>
                </div>
              )}

              {/* search term found*/}
              {!isLoading && searchResults && searchResults.length > 0 && (
                <div className="py-2">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/React-shopfora/product/${product.id}`}
                      onClick={clearSearch}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-body text-sm font-semibold text-text-dark">
                          {product.title}
                        </p>
                        <p className="font-body text-xs text-text-dark/60">
                          {product.price}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* search term not found */}
              {!isLoading && searchResults && searchResults.length === 0 && (
                <div className="p-4 text-center font-body text-text-dark/60">
                  No products found for {searchTerm}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile hamburger menu with React-icon */}
        <button
          onClick={toggleHamburgerMenu}
          className="md:hidden text-text-dark"
        >
          {isHamburgerMenuOpen ? (
            <HiX className="text-2xl" />
          ) : (
            <HiMenu className="text-2xl" />
          )}
        </button>

        {/* Desktop Nav menu with React icons */}
        <div className="hidden md:flex gap-6 font-body items-center">
          <Link
            to="/React-shopfora"
            className="text-text-dark hover:text-primary-hover transition-colors flex item gap-2"
          >
            Home
          </Link>
          <Link
            to="/React-shopfora/cart"
            className="text-text-dark hover:text-primary-hover transition-colors flex items-center gap-2"
          >
            <HiShoppingCart className="text-xl" />
            Cart
            <span className="bg-primary text-text-dark px-2 py-1 rounded-full text-xs font-semibold">
              {/* {items.length} */}
              {cartCount}
            </span>
          </Link>
        </div>

        {/* Hamburger Menu conditional rendering */}
        {isHamburgerMenuOpen && (
          <div className="md:hidden bg-white border-gray-200">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4 font-body">
              <Link
                to="/React-shopfora"
                onClick={toggleHamburgerMenu}
                className="text-text-dark hover:text-primary-hover transition-colors py-2"
              >
                Home
              </Link>
              <Link
                to="/React-shopfora/cart"
                onClick={toggleHamburgerMenu}
                className="text-text-dark hover:text-primary-hover transition-colors flex items-center gap-2 py-2"
              >
                <HiShoppingCart className="" />
                Cart
                {cartCount > 0 && (
                  <span className="bg-primary text-text-dark px-2 py-1 rounded-full text-xs font-semibold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
      {/* <h1>This is NavBar</h1> */}
    </nav>
  );
}
