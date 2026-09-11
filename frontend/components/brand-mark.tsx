import Image from "next/image";

export function BrandMark({ large = false }: { large?: boolean }) {
  return (
    <div className={`flex shrink-0 items-center justify-center rounded-2xl border border-[#D8C3A5] bg-[#FFF9ED] ${large ? "h-48 w-48 p-10 shadow-sm" : "h-24 w-24 p-5"}`}>
      <Image src="/jyc-book.svg" alt="JYC open book logo" width={120} height={120} className="h-full w-full" priority={large} />
    </div>
  );
}
