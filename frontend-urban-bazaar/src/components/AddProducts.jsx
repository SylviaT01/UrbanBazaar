function AddProductPage() {
  return (
    <div className="w-full relative bg-aliceblue h-[1024px] overflow-hidden text-left text-base text-black font-poppins p-8">
      <h2 className="text-2xl mb-4">General Information</h2>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <label className="block mb-2">Product name:</label>
          <input
            className="mb-4 border py-2 px-4 border-black w-full"
            type="text"
            placeholder="Product Name"
          />
          <label className="block mb-2">Brand:</label>
          <input
            className="mb-4 border py-2 px-4 border-black w-full"
            type="text"
            placeholder="Brand"
          />
          <label className="block mb-2">Description:</label>
          <input
            className="mb-4 border py-2 px-4 border-black w-full"
            type="text"
            placeholder="Description"
          />
          <label className="block mb-2">Price:</label>
          <input
            className="mb-4 border py-2 px-4 border-black w-full"
            type="text"
            placeholder="Price"
          />
          <label className="block mb-2">Discount:</label>
          <input
            className="mb-4 border py-2 px-4 border-black w-full"
            type="text"
            placeholder="Discount"
          />
        </div>
        <div>
          <label className="block mb-2">Tags:</label>
          <input
            className="mb-4 border py-2 px-4 border-black w-full"
            type="text"
            placeholder="Tags"
          />
          <label className="block mb-2">Product Image:</label>
          <input
            className="mb-4 border py-2 px-4 border-black w-full"
            type="text"
            placeholder="Image URL"
          />
          <label className="block mb-2">Publish Category:</label>
          <input
            className="mb-4 border py-2 px-4 border-black w-full"
            type="text"
            placeholder="Publish Category"
          />
        </div>
      </div>
    </div>
  );
}

export default AddProductPage;
