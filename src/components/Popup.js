const Popup = ({ title="Add Use",open, closePopup, children }) => {
  return (
    open && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-md relative">
          <button
            onClick={closePopup}
            className="absolute top-4 right-6 cursor-pointer text-gray-500 hover:text-black-700"
          >
            X
          </button>
          <h2 className="text-lg font-semibold mb-4">{title}</h2>
          {children}
            </div>
      </div>
    )
  );
};

export default Popup;
