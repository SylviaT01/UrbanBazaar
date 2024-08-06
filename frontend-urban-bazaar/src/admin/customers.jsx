import React, { useState, useEffect } from "react";
import profile2 from "../assets/profile2.svg";
import members from "../assets/members.svg";
import active from "../assets/active.svg";
import arrowup from "../assets/arrowup .svg";
import arrowdown from "../assets/arrowdown.svg";

const Customer = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    fetch("http://127.0.0.1:5000/user")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex overflow-hidden flex-col items-center px-20 bg-sky-50 max-md:px-5">
      <div className="mt-10 w-full max-w-[1240px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[22%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow pb-8 mt-5 font-medium whitespace-nowrap max-md:mt-10"></div>
          </div>
          <div className="flex flex-col ml-5 w-[78%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col w-full max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-5 justify-between items-start px-4 py-6 w-full bg-white rounded-lg max-md:max-w-full">
                <div className="flex gap-6 mt-1">
                  <img
                    src={profile2}
                    className="object-contain shrink-0 w-24 aspect-[1.14]"
                    alt="TotalCustomers"
                  />
                  <div className="flex flex-col self-start mt-1.5">
                    <div className="text-sm tracking-normal text-neutral-400 max-md:mr-0.5">
                      Total Customers
                    </div>
                    <div className="self-start mt-3.5 text-3xl font-semibold tracking-tight leading-none text-zinc-800">
                      5,423
                    </div>
                    <div className="flex gap-1 mt-2 text-xs tracking-normal text-zinc-800">
                      <img
                        src={arrowup}
                        className="object-contain shrink-0 aspect-[1.15] w-[23px]"
                        alt="arrowup"
                      />
                      <div className="my-auto">
                        <span className="font-bold text-green-600">16%</span>{" "}
                        this month
                      </div>
                    </div>
                  </div>
                </div>
                <div className="shrink-0 w-px h-24" />
                <div className="flex gap-6 items-start self-stretch">
                  <img
                    src={members}
                    className="object-contain shrink-0 w-24 aspect-[1.14]"
                    alt="Members"
                  />
                  <div className="flex flex-col items-start mt-1.5">
                    <div className="text-sm tracking-normal text-neutral-400">
                      Members
                    </div>
                    <div className="mt-3.5 text-3xl font-semibold tracking-tight leading-none text-zinc-800">
                      1,893
                    </div>
                    <div className="flex gap-1 self-stretch mt-2 text-xs tracking-normal text-zinc-800">
                      <img
                        loading="lazy"
                        src={arrowdown}
                        className="object-contain shrink-0 aspect-[1.15] w-[23px]"
                        alt="arrowdown"
                      />
                      <div className="my-auto">
                        <span className="font-bold text-rose-700">1%</span> this
                        month
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 self-stretch w-px h-[95px]" />
                </div>
                <div className="flex gap-6">
                  <img
                    loading="lazy"
                    src={active}
                    className="object-contain shrink-0 w-24 aspect-[1.14]"
                    alt="Active"
                  />
                  <div className="flex flex-col self-start mt-1">
                    <div className="text-sm tracking-normal text-neutral-400">
                      Active Now
                    </div>
                    <div className="self-start mt-3.5 text-3xl font-semibold tracking-tight leading-none text-zinc-800">
                      189
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
