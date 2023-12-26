import SkeletonCard from "@/components/skeleton-card";

export default function Loading() {
  return (
    <div
      className="animate-pulse flex justify-center flex-wrap max-w-[1100px] mx-auto px-[20px]
    gap-20"
    >
      {Array.from({ length: 6 }).map((item, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}
