import exlLogo from "@/assets/exl-logo.png";

const EXLLogo = () => {
  return (
    <div className="flex items-center">
      <img 
        src={exlLogo} 
        alt="EXL" 
        className="h-8 w-auto"
      />
    </div>
  );
};

export { EXLLogo };
