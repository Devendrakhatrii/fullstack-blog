import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="text-center w-full h-full text-4xl absolute top-0 left-0 flex items-center justify-center">
      <Loader2 className="size-20 text-primary animate-spin" />
    </div>
  );
};

export default Loading;
