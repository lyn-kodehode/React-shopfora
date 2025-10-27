import { HiShoppingCart, HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useCart } from "../store/cart";
import { useState } from "react";

export default function NavBar() {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const items = useCart((state) => state.items);
  const cartCount = useCart((state) => state.getTotalItems());

  // hamburger menu toggle
  const toggleHamburgerMenu = () => {
    // console.log(isHamburgerMenuOpen);
    setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
  };

  return (
    // bg-color, box-shadow, position, top, index
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* container-classname, marginleftright, md:768 paddingX, md:768 paddingY */}
      <div className="container mx-auto px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
        {/* ShopFora Logo */}
        <Link to="/">
          <img
            src="./shopfora-logo-500x145.png"
            alt="ShopFora logo"
            className="h-7 md:h-9 lg:h-11 w-auto hover:opacity-90 transition-opacity"
          />
        </Link>

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
            to="/"
            className="text-text-dark hover:text-primary-hover transition-colors flex item gap-2"
          >
            Home
          </Link>
          <Link
            to="/cart"
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
                to={"/"}
                onClick={toggleHamburgerMenu}
                className="text-text-dark hover:text-primary-hover transition-colors py-2"
              >
                Home
              </Link>
              <Link
                to={"/cart"}
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
