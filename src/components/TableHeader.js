const TableHeader = () => {
  return (
    <thead>
      <tr className="bg-grey-500 text-black">
        <th className="border border-gray-400 px-4 py-2 md:py-3 text-sm md:text-base">
          Name
        </th>
        <th className="border border-gray-400 px-4 py-2 md:py-3 text-sm md:text-base">
          Date of Birth
        </th>
        <th className="border border-gray-400 px-4 py-2 md:py-3 text-sm md:text-base">
          Email
        </th>
        <th className="border border-gray-400 px-4 py-2 md:py-3 text-sm md:text-base">
          Image
        </th>
        <th className="border border-gray-400 px-4 py-2 md:py-3 text-sm md:text-base">
          Documents
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
