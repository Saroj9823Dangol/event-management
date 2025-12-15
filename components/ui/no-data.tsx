import React from "react";
import { Inbox } from "lucide-react";

interface NoDataProps {
  title?: string;
  description?: string;
}

const NoData: React.FC<NoDataProps> = ({
  title = "No Data Found",
  description = "We couldn't find what you were looking for.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
        <Inbox className="w-8 h-8 text-white/40" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/60 max-w-sm">{description}</p>
    </div>
  );
};

export default NoData;
