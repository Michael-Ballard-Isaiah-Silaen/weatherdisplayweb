const FeatureBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-[70%] sm:w-[45%] md:w-[30%]">
      <div className="flex h-fit w-full flex-col items-start justify-start gap-2 rounded-lg px-4 py-6 text-center">
        {children}
      </div>
    </div>
  );
};

export default FeatureBox;
