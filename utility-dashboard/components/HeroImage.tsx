import Image from "next/image";

export default function HeroImage() {
  return (
    <div className="relative hidden md:block w-full h-full">
      <Image
        src="/images/orlando-skyline.jpg"
        alt="Orlando skyline"
        fill
        className="object-cover"
        priority
      />
      {/* Blue overlay like the prototype */}
     <div
  className="absolute inset-0"
  style={{ backgroundColor: "rgba(0, 90, 200, 0.82)" }}
/>
    </div>
  );
}