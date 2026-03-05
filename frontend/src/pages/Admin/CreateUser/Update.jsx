import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { uri } from "../../../backend/Uri";

const AVAILABLE_YEARS = ["2024", "2025", "2026", "2027", "2028", "2029", "2030"];

// Build form from user + year table. Year table has only pujaChanda, khanaChanda (no pichhlapujaChanda).
function getFormForYear(data, year) {
       if (!data) return { name: "", phone: "", pujaChanda: "", khanaChanda: "", date: "", comment: "", pujaPaid: false, khanaPaid: false };
       const yc = data.yearlyContributions && typeof data.yearlyContributions === "object" ? data.yearlyContributions[year] : null;
       return {
              name: data.name ?? "",
              phone: data.phone ?? "",
              pujaChanda: yc ? (yc.pujaChanda ?? "") : "",
              khanaChanda: yc ? (yc.khanaChanda ?? "") : "",
              date: yc ? (yc.date ?? "") : "",
              comment: yc ? (yc.comment ?? "") : "",
              pujaPaid: yc ? (yc.pujaPaid ?? false) : false,
              khanaPaid: yc ? (yc.khanaPaid ?? false) : false
       };
}

const Update = () => {

       const { id } = useParams();
       const navigate = useNavigate();

       const [loading, setLoading] = useState(true);
       const [saving, setSaving] = useState(false);
       const [deleting, setDeleting] = useState(false);
       const [userData, setUserData] = useState(null);
       const [selectedYear, setSelectedYear] = useState("2025");

       const [form, setForm] = useState({
              name: "",
              phone: "",
              pujaChanda: "",
              khanaChanda: "",
              date: "",
              comment: "",
              pujaPaid: false,
              khanaPaid: false
       });

       const getUser = () => {
              setLoading(true);
              axios.get(`${uri}/id?id=${id}`)
                     .then(res => {
                            const data = res.data;
                            setUserData(data);
                            setForm(getFormForYear(data, selectedYear));
                     })
                     .catch(() => setUserData(null))
                     .finally(() => setLoading(false));
       };

       useEffect(() => {
              getUser();
              // eslint-disable-next-line react-hooks/exhaustive-deps -- fetch on id change only
       }, [id]);

       // When year changes, show data for that year from the year table (yearlyContributions) when available.
       useEffect(() => {
              if (userData) setForm(getFormForYear(userData, selectedYear));
       }, [selectedYear, userData]);

       const handleChange = (field, value) => {
              setForm(prev => ({
                     ...prev,
                     [field]: value
              }));
       };

       const updateUser = () => {
              const { _id, __v, yearlyContributions: _yearlyContributions, ...payload } = form;
              const body = { ...payload, year: selectedYear };
              setSaving(true);
              axios.post(`${uri}/update-user/id?id=${id}`, body)
                     .then(() => {
                            alert("Updated Successfully");
                            getUser();
                     })
                     .catch((err) => {
                            alert(err.response?.data?.message || "Update failed");
                     })
                     .finally(() => setSaving(false));
       };

       const deleteUser = () => {
              if (!window.confirm("Are you sure you want to delete this user?")) return;
              setDeleting(true);
              axios.delete(`${uri}/deleteuser/id?id=${id}`)
                     .then(() => {
                            alert("Deleted Successfully");
                            navigate("/admin");
                     })
                     .catch((err) => {
                            alert(err.response?.data?.message || "Delete failed");
                     })
                     .finally(() => setDeleting(false));
       };

       if (loading) {
              return (
                     <div className="min-h-screen bg-orange-50 flex items-center justify-center">
                            <div className="flex items-center gap-3 text-orange-600 font-medium">
                                   <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                                   Loading...
                            </div>
                     </div>
              );
       }

       if (!userData) return null;

       return (
              <div className="min-h-screen bg-orange-50 p-1 sm:p-4">

                     <div className="max-w-5xl mx-auto  p-2 sm:p-6 py-6 my-4">

                            {/* Header */}
                            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                                   <h1 className="text-2xl font-bold text-orange-600">
                                          User Update
                                   </h1>
                                   <div className="flex items-center gap-3">
                                          <label className="text-sm font-medium text-gray-700">वर्ष (Year):</label>
                                          <select
                                                 value={selectedYear}
                                                 onChange={(e) => setSelectedYear(e.target.value)}
                                                 className="border border-gray-300 rounded-lg px-3 py-2 bg-white font-medium text-orange-600"
                                          >
                                                 {AVAILABLE_YEARS.map((y) => (
                                                        <option key={y} value={y}>{y}</option>
                                                 ))}
                                          </select>
                                          <button
                                                 onClick={deleteUser}
                                                 disabled={deleting}
                                                 className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                          >
                                                 {deleting ? "Deleting..." : "Delete"}
                                          </button>
                                   </div>
                            </div>


                            {/* Table - 2024: single pujaChanda (label पिछला पूजा); 2025+: pujaChanda + khanaChanda */}
                            <div className="overflow-x-auto">
                                   {(() => {
                                          const is2024 = selectedYear === "2024";
                                          return (
                                                 <table className="w-full border">
                                                        <tbody>
                                                               <tr>
                                                                      <td className="p-3 border font-semibold">नाम</td>
                                                                      <td className="p-3 border">
                                                                             <input
                                                                                    value={form.name}
                                                                                    onChange={(e) => handleChange("name", e.target.value)}
                                                                                    className="w-full border p-2 rounded"
                                                                             />
                                                                      </td>
                                                               </tr>
                                                               <tr>
                                                                      <td className="p-3 border font-semibold">फोन नंबर</td>
                                                                      <td className="p-3 border">
                                                                             <input
                                                                                    value={form.phone || ""}
                                                                                    onChange={(e) => handleChange("phone", e.target.value)}
                                                                                    className="w-full border p-2 rounded"
                                                                             />
                                                                      </td>
                                                               </tr>
                                                               <tr>
                                                                      <td className="p-3 border font-semibold">पूजा चंदा</td>
                                                                      <td className="p-3 border">
                                                                             <input
                                                                                    value={form.pujaChanda}
                                                                                    onChange={(e) => handleChange("pujaChanda", e.target.value)}
                                                                                    className="w-full border p-2 rounded"
                                                                             />
                                                                      </td>
                                                               </tr>
                                                               <tr>
                                                                      <td className="p-3 border font-semibold">खाना चंदा</td>
                                                                      <td className="p-3 border">
                                                                             <input
                                                                                    value={form.khanaChanda}
                                                                                    onChange={(e) => handleChange("khanaChanda", e.target.value)}
                                                                                    className="w-full border p-2 rounded"
                                                                             />
                                                                      </td>
                                                               </tr>
                                                               <tr>
                                                                      <td className="p-3 border font-semibold">दिनांक</td>
                                                                      <td className="p-3 border">
                                                                             <input
                                                                                    value={form.date || ""}
                                                                                    onChange={(e) => handleChange("date", e.target.value)}
                                                                                    placeholder={is2024 ? "वर्ष 2024 की तारीख" : `वर्ष ${selectedYear} की तारीख`}
                                                                                    className="w-full border p-2 rounded"
                                                                             />
                                                                      </td>
                                                               </tr>
                                                               <tr>
                                                                      <td className="p-3 border font-semibold">टिप्पणी</td>
                                                                      <td className="p-3 border">
                                                                             <input
                                                                                    value={form.comment || ""}
                                                                                    onChange={(e) => handleChange("comment", e.target.value)}
                                                                                    className="w-full border p-2 rounded"
                                                                             />
                                                                      </td>
                                                               </tr>
                                                               {is2024 ? (
                                                                      <tr>
                                                                             <td className="p-3 border font-semibold">पूजा चंदा जमा</td>
                                                                             <td className="p-3 border">
                                                                                    <input
                                                                                           type="checkbox"
                                                                                           checked={form.pujaPaid}
                                                                                           onChange={(e) => handleChange("pujaPaid", e.target.checked)}
                                                                                    />
                                                                             </td>
                                                                      </tr>
                                                               ) : (
                                                                      <>
                                                                             <tr>
                                                                                    <td className="p-3 border font-semibold">पूजा चंदा जमा</td>
                                                                                    <td className="p-3 border">
                                                                                           <input
                                                                                                  type="checkbox"
                                                                                                  checked={form.pujaPaid}
                                                                                                  onChange={(e) => handleChange("pujaPaid", e.target.checked)}
                                                                                           />
                                                                                    </td>
                                                                             </tr>
                                                                             <tr>
                                                                                    <td className="p-3 border font-semibold">खाना चंदा जमा</td>
                                                                                    <td className="p-3 border">
                                                                                           <input
                                                                                                  type="checkbox"
                                                                                                  checked={form.khanaPaid}
                                                                                                  onChange={(e) => handleChange("khanaPaid", e.target.checked)}
                                                                                           />
                                                                                    </td>
                                                                             </tr>
                                                                      </>
                                                               )}
                                                        </tbody>
                                                 </table>
                                          );
                                   })()}
                            </div>

                            {/* Save Button */}
                            <div className="mt-6 flex justify-center">

                                   <button
                                          onClick={updateUser}
                                          disabled={saving}
                                          className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                   >
                                          {saving ? "Saving..." : "Save Update"}
                                   </button>

                            </div>

                     </div>

              </div>
       );
};

export default Update;