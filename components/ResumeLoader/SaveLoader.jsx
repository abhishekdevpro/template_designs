export const SaveLoader = ({ loadingText = "Saving" }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white bg-opacity-10 p-8 rounded-lg flex flex-col items-center shadow-lg">
        <div className="w-16 h-16 mb-4 relative">
          {/* Outer spinning circle */}
          <div className="absolute inset-0 border-4 border-[#003a63] border-t-transparent rounded-full animate-spin"></div>

          {/* Inner pulsing circle */}
          <div className="absolute inset-2 bg-[#002a48] rounded-full animate-pulse"></div>
        </div>

        <div className="text-white text-lg font-semibold animate-pulse">
          {loadingText}
          <span className="animate-bounce inline-block">.</span>
          <span className="animate-bounce inline-block delay-100">.</span>
          <span className="animate-bounce inline-block delay-200">.</span>
        </div>
      </div>
    </div>
  );
};
