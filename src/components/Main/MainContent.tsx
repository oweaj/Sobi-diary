const MainContent = () => {
  return (
    <ul className="h-[calc(100%-25rem)] flex flex-col gap-3 overflow-y-auto">
      {['올해 보너스', '복돈', '올해 보너스', '복돈', '올해 보너스', '복돈', '올해 보너스', '복돈'].map(
        (item, index) => (
          <li
            key={index}
            className="flex items-center justify-between border border-gray-300 rounded-lg py-2 px-6 bg-gray-50"
          >
            <p className="flex flex-col">
              <span className="text-gray-400">2023.12.15</span>
              <span>{item}</span>
            </p>
            <p className="text-sky-500">+5,000,000</p>
          </li>
        )
      )}
    </ul>
  );
};

export default MainContent;
