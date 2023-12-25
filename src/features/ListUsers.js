import { useState } from "react";
import TableHeader from "../components/TableHeader";
import TableRow from "../components/TableRow";
import { useGetUsersQuery } from "./../services/users";
import AddUsers from "./AddUsers";
import Popup from "../components/Popup";
import Toast from "../components/Toast";

const ListUsers = () => {
  const [open, setOpen] = useState();
  const [toast, setToast] = useState();
  const { data: users, isLoading } = useGetUsersQuery();

  const togglePopup = () => setOpen((prev) => !prev);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-4xl w-full p-4 md:p-8 bg-white rounded-lg shadow-md overflow-y-auto"
       style={{ height: '90vh' }}>
        {/* Button on the top right */}
        <div className="flex justify-end mb-4">
          <button
            onClick={togglePopup}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Add User
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-auto">
            <TableHeader />
            <tbody>
              {users?.map((res, index) => (
                <TableRow data={res} />
              ))}
            </tbody>
          </table>
          {users?.length === 0 && (
            <p className="text-center my-5">no record found</p>
          )}
          {isLoading && <p className="text-center my-5">Fetching Users...</p>}
        </div>
      </div>

      <Popup open={open} closePopup={togglePopup}>
        <AddUsers togglePopup={togglePopup} setToast={setToast} />
      </Popup>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      {console.log(toast, "varient")}
    </div>
  );
};

export default ListUsers;
