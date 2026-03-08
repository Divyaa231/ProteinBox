function PhoneFrame({ children }) {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-97.5 h-211 bg-black rounded-[40px] p-3 shadow-2xl">
        <div className="w-full h-full rounded-4xl overflow-y-auto bg-linear-to-br from-[#0a0e14] to-[#1a1f2e]">
          {children}
        </div>
      </div>
    </div>
  );
}

export default PhoneFrame;
