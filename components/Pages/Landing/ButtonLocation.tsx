const ButtonLocation = ({ text }: { text: string }) => {
  return (
    <>
      <button
        type="button"
        className="bg-meta-5 rounded-full px-4 py-2 flex items-center text-lg"
      >
        <span className="block w-6 h-6 rounded-full bg-bodydark mr-5"></span>
        {text}
      </button>
    </>
  );
};

export default ButtonLocation;
