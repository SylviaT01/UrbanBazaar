// import { FunctionComponent } from "react";
// import GroupComponent from "../components/GroupComponent";
// import CreateProductButtonContaine from "../components/CreateProductButtonContaine";

function AddProductPage () {
  return (
    <div> 
      <main className="self-stretch flex flex-col justify-start items-start pb-[68px] text-center text-2xl text-black">
        <div className="w-[844px] max-w-full flex flex-row justify-center items-start px-8">
          <h2 className="m-0 relative text-2xl font-medium">Create new product</h2>
        </div>
        {/* <CreateProductButtonContaine /> */}
      </main>
      <div className="w-[269px] bg-white flex flex-row justify-between items-start px-4 py-8 text-sm text-gray-700 font-plus-jakarta-sans">
        <div className="flex flex-row items-start gap-6">
          <div className="flex flex-col items-start pt-[1.1px]">
            <img
              className="w-[26.3px] h-[20.6px] relative overflow-hidden"
              loading="lazy"
              alt=""
              src="/.unsplash_LSNJ-pltdu8.png"
            />
          </div>
          <div className="flex-1 relative leading-6 font-medium">Logout</div>
        </div>
        <img
          className="h-[20.9px] w-[23.7px] relative overflow-hidden object-contain"
          loading="lazy"
          alt=""
          src="logout.png"
        />
      </div>
    </div>
  );
};

export default AddProductPage;