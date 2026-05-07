function CustomerFrame({ children }) {
  return (
    <div className="min-h-screen bg-slate-100 p-4 flex justify-center items-start">
      <div className="relative w-[402px] h-[874px] max-w-full overflow-hidden rounded-[2.5rem] bg-[#f7f1eb] shadow-2xl">
        {children}
      </div>
    </div>
  );
}

export default CustomerFrame;