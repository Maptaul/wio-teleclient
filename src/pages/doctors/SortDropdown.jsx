const SortDropdown = () => {
  return (
    <select className="border border-gray-300 rounded-xl px-3 py-2 bg-white text-sm w-full">
      <option value="">Select sort</option>
      <option value="rating">Rating</option>
      <option value="priceLowHigh">Price: Low to High</option>
      <option value="priceHighLow">Price: High to Low</option>
    </select>
  );
};

export default SortDropdown;
