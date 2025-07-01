import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MenuList = ({ linkTo, linkName, text, onSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setAnchorEl(null);
  };

  const handleMenuItemClick = (name, index) => {
    handleClose();
    if (name === "Sign Out" && onSignOut) {
      onSignOut();
    } else if (linkTo[index]) {
      navigate(linkTo[index]);
    }
  };

  return (
    <div className="relative">
      <button
        className="p-2 focus:outline-none"
        onClick={handleClick}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {text}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
          {linkName.map((name, index) => (
            <button
              key={index}
              onClick={() => handleMenuItemClick(name, index)}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuList;
