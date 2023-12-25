import moment from "moment";
import Popup from "./Popup";
import { useState } from "react";

const TableRow = ({ data }) => {
  const [PreviewImage, setPreviewImage] = useState();

  const handleImageClick = (img) => {
    setPreviewImage(img);
  };

  return (
    <>
      <tr className="hover:bg-gray-100 transition" key={data.id}>
        <td className="border border-gray-400 px-4 py-2 md:py-4 text-sm md:text-base">
          {data.name}
        </td>
        <td className="border border-gray-400 px-4 py-2 md:py-4 text-sm md:text-base">
          {moment(data.dob).format("LL")}
        </td>
        <td className="border border-gray-400 px-4 py-2 md:py-4 text-sm md:text-base">
          {data.email}
        </td>
        <td className="border border-gray-400 px-4 py-2 md:py-4">
          <img
            src={data.profile_image}
            alt="User"
            className="w-8 h-8 md:w-12 md:h-12 object-cover rounded-full cursor-pointer"
            onClick={() => handleImageClick(data.profile_image)}
          />
        </td>
        <td className="border border-gray-400 px-2 py-1 md:py-4">
          {data?.documents?.map((res, index) => (
            <a
              href={res.url}
              download
              target="_blank"
              rel="noreferrer"
              className="mb-2 text-blue-500 hover:underline md:text-base text-xs block md:inline-block"
            >
              {index + 1}. {res?.name}
            </a>
          ))}
        </td>
      </tr>
      <Popup
        title="Profile image"
        closePopup={() => setPreviewImage(null)}
        open={PreviewImage}
      >
        <div className="w-full flex items-center justify-center h-[400px]">
          <img className="max-w-500px" width="500px" src={PreviewImage} alt="Profile" />
        </div>
      </Popup>
    </>
  );
};

export default TableRow;
