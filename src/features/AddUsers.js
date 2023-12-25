import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAddUserMutation } from "./../services/users";

const AddUserForm = ({ togglePopup, setToast }) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const [addUser, { isLoading: isAddingUser }] = useAddUserMutation();
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const fileInputRef = React.useRef(null);

  const onSubmit = async (data) => {

    const payload = new FormData();

    payload.append("name", data.name);
    payload.append("email", data.email);
    payload.append("dob", data.dob);
    payload.append("profile_image", data.image);

    selectedDocuments.forEach((res) => {
        payload.append("documents", res.file);
    });

    const result = await addUser(payload);

    if (result?.data?.success) {
      togglePopup();
      setToast("User added successfully");
    } else {
      console.log("Error adding user:", result.error?.data?.errMsg);
      setToast(
        result.error?.data?.errMsg ||
          "something went wrong please try again later"
      );
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValue("image", file);
  };

  const handleDocumentsChange = (e) => {
    const files = e.target.files;
    setValue("documents", files, { shouldValidate: true });
    const newDocuments = Array.from(files).map((file) => ({
      file,
      id: Date.now(),
    }));
    setSelectedDocuments((prev) => [...prev, ...newDocuments]);
  };

  const handleDeleteDocument = (id) => {
    setSelectedDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const openFileInput = () => {
    fileInputRef.current.click();
  };

  const validateDate = (date) => {
    const currentDate = new Date();
    const inputDate = new Date(date);
    return inputDate < currentDate; // Assuming date should be in the past
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sm:w-[500px] w-full mx-auto p-4 bg-white"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Date of Birth:
          </label>
          <input
            type="date"
            {...register("dob", {
              required: "Date of Birth is required",
              validate: (value) =>
                validateDate(value) || "Date of Birth should be in the past",
            })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.dob && (
            <span className="text-red-500">{errors.dob.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/, //email validation
                message: "Invalid email address",
              },
            })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image:
          </label>
          <input
            type="file"
            accept=".png, .jpg"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.image && (
            <span className="text-red-500">{errors.image.message}</span>
          )}
        </div>

        <div className="mb-4">
          <div className="mb-4 flex items-center justify-between mb-3">
            <label className="text-gray-700 text-sm font-bold">
              Documents:
            </label>
            <button
              type="button"
              onClick={openFileInput}
              className="text-blue-600 text-sm font-bold"
            >
              <span className="text-lg">&#43;</span>
              {selectedDocuments.length > 0
                ? "Add More Documents"
                : "Add Documents"}
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            multiple
            onChange={handleDocumentsChange}
            style={{ display: "none" }}
          />

          {errors.documents && (
            <span className="text-red-500">{errors.documents.message}</span>
          )}
          {selectedDocuments.length > 0 && (
            <div className="mt-2 border p-2 rounded">
              {selectedDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between bg-gray-100 px-3 py-2 mb-2 rounded-md"
                >
                  <span>{doc.file.name}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteDocument(doc.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    &#10005;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-8">
          <button
            type="button"
            className="bg-red-500 text-white py-2 rounded hover:bg-red-600 transition flex-1"
            onClick={togglePopup}
          >
            Cancel
          </button>
          <button
            disabled={isAddingUser}
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition flex-1"
          >
            {isAddingUser ? "Processing" : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddUserForm;
