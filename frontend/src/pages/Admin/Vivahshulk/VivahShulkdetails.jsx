import React from 'react';

const VivahShulkDetails = ({ user }) => {
       return (
              <div className="flex flex-col items-center w-full">
                     <div className="flex flex-col justify-center">
                            {/* Header Row - Hidden on small screens */}
                            <div className=" flex flex-col gap-3 items-start pl-5 py-3 font-bold text-lg border-t-2 border-b-2 border-orange-200 bg-orange-50 justify-between px-6 w-[280px]">
                                   <div className="flex items-center justify-center gap-5">
                                          <div className=" text-blue-600 mr-10 text-start flex justify-items-start items-start">नाम :</div>
                                          <div className="text-md sm:text-md text-blue-700  sm:w-auto truncate">{user.name}</div>
                                   </div>
                                   <div className="flex  justify-center gap-5">
                                          <div className="text-green-700 text-center ">विवाह की तिथि : </div> <div className="text-sm sm:text-md text-green-700 font-semibold  truncate">{user.marriageDate}</div>
                                   </div>
                                   <div className="flex  justify-center gap-5">
                                          <div className="text-yellow-700 text-right mr-4">विवाह शुल्क :</div> <div className="text-sm sm:text-md text-yellow-700  truncate">₹{user.shulk}</div>
                                   </div>
                                   {/* Comment (if applicable) */}
                                   {user.comment?.length > 3 && (

                                          <div className="text-xs sm:text-md text-pink-700 mt-2 sm:mt-0 sm:col-div-3 truncate text-wrap w-[250px] ">

                                                 टिप्पणी: {user.comment}
                                          </div>
                                   )}

                                   {/* Payment Status and Date */}
                                   <div className="flex justify-center items-center gap-6 my-3 ml-10">
                                          <button
                                                 className={`px-3 py-1 sm:px-5 sm:py-2 font-medium rounded-full shadow-sm transition-all duration-300 text-white text-md sm:text-sm ${!user.paid ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                                                        }`}
                                          >
                                                 {!user.paid ? 'Unpaid' : 'Paid'}
                                          </button>
                                          {user.paid && <div className="text-sm sm:text-md font-bold text-green-700 truncate">{user.date }</div>}
                                   </div>
                            </div>
 


                     </div>


              </div>
       );
};

export default VivahShulkDetails;