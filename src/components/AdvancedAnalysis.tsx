// components/AnalyticsImages.tsx
//import Image from "next/image";

export default function AnalyticsImages() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <div className="shadow-xl rounded-2xl p-4 bg-white">
        <h2 className="text-xl font-semibold mb-2">
          Feature Insights Using Apache PySpark
        </h2>
        <img
          src="/images/Features.png"
          alt="Feature Analysis"
          width={600}
          height={400}
          className="rounded-xl object-contain"
        />
      </div>

      <div className="shadow-xl rounded-2xl p-4 bg-white">
        <h2 className="text-xl font-semibold mb-2">Temperature Trends</h2>
        <img
          src="/images/Temp.png"
          alt="Temperature Over Time"
          width={600}
          height={400}
          className="rounded-xl object-contain"
        />
      </div>
    </div>
  );
}
