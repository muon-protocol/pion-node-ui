const AddressInput = () => {
  return (
    <div className="address-input flex flex-col w-full gap-2 mb-2">
      <div className="address-input__top text-sm flex justify-between">
        <div className="address-input__title text-xyz-75">
          {'Destination Address (Arbitrum One)'}
        </div>
      </div>
      <div className="address-input__input-wrapper flex items-center justify-between bg-catskill-white rounded-xl pl-5 pr-4 h-14">
        <input
          className="address-input__input placeholder-gray10 text-white font-medium w-full h-full bg-transparent outline-none"
          placeholder="Enter Address"
          type="text"
          value={''}
          onChange={() => {}}
        />
      </div>
    </div>
  );
};

export default AddressInput;
