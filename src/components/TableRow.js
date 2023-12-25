import moment from "moment";

const TableRow = ({ data }) => {
  return (
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
          className="w-8 h-8 md:w-12 md:h-12 object-cover rounded-full"
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
  );
};

export default TableRow;
