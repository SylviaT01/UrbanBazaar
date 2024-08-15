import React from "react";
import TopPicksFour from "../Product/top-picksfour";
import WeeklyOffersFour from "../Product/weeklyoffersfour";
import { Link } from "react-router-dom";

export default function UserDashboard() {
  return (
    <>
      <div>
        <h1 className="text-3xl text-center mb-4">You May Also Like This</h1>
        <TopPicksFour />
        <div className="flex justify-center py-4">
          <Link
            to="/toppicks"
            className="bg-blue-300 text-gray-600 text-sm px-2 py-2 rounded-md "
          >
            View Top Picks
          </Link>
        </div>
      </div>
      <div>
        <h1 className="text-3xl text-center mt-4 mb-4">
          Weekly Offers at Your Fingertips
        </h1>

        <WeeklyOffersFour />
        <div className="flex justify-center py-4">
          <Link
            to="/weeklyoffers"
            className="bg-blue-300 text-gray-600 text-sm px-2 py-2 rounded-md "
          >
            View All Offers
          </Link>
        </div>
      </div>
    </>
  );
}
