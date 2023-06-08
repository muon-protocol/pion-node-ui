const SelectButtonWithModal = () => {
  return (
    <div className="select-button-with-modal mb-6">
      <div className="flex flex-col w-full gap-2">
        <div className="text-xyz-75 text-sm">Select bonPION</div>
        <div className="select-button-with-modal__button flex items-center justify-between bg-catskill-white rounded-xl pl-5 pr-4 h-14 cursor-pointer">
          <span className="flex gap-2.5 items-center">
            <img
              src="/assets/images/select-button/bon-icon.svg"
              alt=""
              width="26px"
              height="26px"
            />
            <p className="text-white font-medium">bonPION #12151</p>
          </span>
          <img
            src="/assets/images/select-button/down-arrow.svg"
            alt=""
            width="14px"
            height="14px"
          />
        </div>
      </div>

      {false && <div className="select-button-with-modal__modal"></div>}
    </div>
  );
};

export default SelectButtonWithModal;
