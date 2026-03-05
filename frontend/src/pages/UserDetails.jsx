import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { uri } from "../backend/Uri";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${uri}/id?id=${id}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching user:", error));
  }, [id]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-600">
        <div className="flex items-center gap-3 animate-pulse">
          <div className="w-5 h-5 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          लोड हो रहा है...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-gray-50 flex flex-col items-center py-8 px-3">

      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-bold text-orange-600 mb-6 text-center">
        आपकी जानकारी
      </h1>

      {/* Card */}
      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-4 sm:p-6">

        {/* Basic Info */}
        <div className="space-y-3 mb-6">

          <div className="flex justify-between border-b pb-2">
            <span className="text-sm font-semibold text-gray-700">नाम</span>
            <span className="text-sm text-blue-700 font-semibold">{user.name}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-sm font-semibold text-gray-700">फोन नंबर</span>
            <span className="text-sm text-gray-700">{user.phone}</span>
          </div>

        </div>

        {/* Table Section - from yearlyContributions when present */}
        <div className="overflow-x-auto">

          <table className="w-full text-xs sm:text-sm border rounded-lg">

            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-2 text-left">वर्ष</th>
                <th className="px-2 py-2 text-center">पूजा</th>
                <th className="px-2 py-2 text-center">खाना</th>
                <th className="px-2 py-2 text-center">कुल</th>
                <th className="px-2 py-2 text-center">प्राप्त</th>
                <th className="px-2 py-2 text-center">दिनांक</th>
              </tr>
            </thead>

            <tbody>
              {(() => {
                const yc = user.yearlyContributions && typeof user.yearlyContributions === "object" ? user.yearlyContributions : null;
                const years = yc && Object.keys(yc).length > 0 ? Object.keys(yc).sort() : ["2024", "2025"];
                let sumPuja = 0, sumKhana = 0, sumTotal = 0;
                return (
                  <>
                    {years.map((yr) => {
                      const row = yc ? yc[yr] : null;
                      const puja = row ? (Number(row.pichhlapujaChanda) || Number(row.pujaChanda) || 0) : 0;
                      const khana = row ? (Number(row.khanaChanda) || 0) : 0;
                      const totalRow = puja + khana;
                      sumPuja += puja;
                      sumKhana += khana;
                      sumTotal += totalRow;
                      const paid = row ? (row.pujaPaid || row.khanaPaid) : false;
                      const date = row ? (row.date || "") : "";
                      return (
                        <tr key={yr} className="border-t">
                          <td className="px-2 py-2">{yr.slice(-2)}</td>
                          <td className="px-2 py-2 text-center">{puja || "-"}</td>
                          <td className="px-2 py-2 text-center">{yr === "2024" && !khana ? "-" : (khana || "-")}</td>
                          <td className="px-2 py-2 text-center">{totalRow || "-"}</td>
                          <td className={`px-2 py-2 text-center font-medium ${paid ? "text-green-600" : "text-red-600"}`}>
                            {paid ? "☑" : "❌"}
                          </td>
                          <td className="px-2 py-2 text-center">{date || "-"}</td>
                        </tr>
                      );
                    })}
                    <tr className="border-t bg-gray-50 font-semibold">
                      <td className="px-2 py-2">कुल</td>
                      <td className="px-2 py-2 text-center">{sumPuja}</td>
                      <td className="px-2 py-2 text-center">{sumKhana}</td>
                      <td className="px-2 py-2 text-center">{sumTotal}</td>
                      <td className="text-center">-</td>
                      <td className="text-center">-</td>
                    </tr>
                  </>
                );
              })()}
            </tbody>
          </table>

        </div>

        {/* Comment - from year table (2025 when available) */}
        <div className="mt-5 border-t pt-4 flex justify-between">
          <span className="font-semibold text-red-700">टिप्पणी</span>
          <span className="text-red-600">
            {(user.yearlyContributions && user.yearlyContributions["2025"]?.comment) || "__"}
          </span>
        </div>

        {/* Notice - based on current year paid status from year table */}
        {(() => {
          const y2025 = user.yearlyContributions && user.yearlyContributions["2025"];
          const paid = y2025 ? (y2025.pujaPaid || y2025.khanaPaid) : false;
          return !paid && (
            <div className="mt-6 text-center space-y-2 text-sm text-blue-700">
              <p>इस वर्ष मां मथुरासिनी पूजा का चंदा ₹275 रखा गया है</p>
              <p>🙏 कृपया पिछले वर्ष से कम से कम ₹20 अधिक दें</p>
              <p>सामूहिक भोजन: बड़े ₹70 / बच्चे ₹40</p>
            </div>
          );
        })()}

      </div>
    </div>
  );
};

export default UserDetails;