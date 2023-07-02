const AddressInput = ({
  title,
  value,
  onValueChanged,
  placeholder,
}: {
  title: string;
  value: string;
  onValueChanged: (value: string) => void;
  placeholder: string;
}) => {
  return (
    <div className="address-input flex flex-col w-full gap-2 mb-2">
      <div className="address-input__top text-sm flex justify-between">
        <div className="address-input__title text-gray">{title}</div>
      </div>
      <div className="address-input__input-wrapper flex items-center justify-between bg-catskill-white rounded-xl pl-5 pr-4 h-14">
        <input
          className="address-input__input placeholder-gray text-black font-medium w-full h-full bg-transparent outline-none"
          placeholder={placeholder}
          type="text"
          value={value}
          onChange={(e) => onValueChanged(e.target.value)}
        />
      </div>
    </div>
  );
};

export default AddressInput;
