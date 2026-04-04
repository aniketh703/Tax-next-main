import { useState, useEffect } from "react";
import { Users } from "lucide-react";

export default function VisitorCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    // We use a specific namespace and key for taxnext.in
    // Using counterapi.dev which is free and unlimited
    const namespace = "taxnext.in";
    const key = "visits";

    fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.count) {
          setCount(data.count);
        }
      })
      .catch((err) => {
        console.error("Visitor counter error:", err);
      });
  }, []);

  if (count === null) return null;

  return (
    <div className="flex items-center gap-2 text-[#7a8c82] font-body text-[0.75rem]">
      <Users size={12} strokeWidth={1.5} className="text-[#1A4D2E]" />
      <span>
        <span className="font-semibold text-white/80">{count.toLocaleString()}</span>
        {" "}Verified Professional Reach
      </span>
    </div>
  );
}
