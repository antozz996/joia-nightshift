import Image from "next/image";

type BrandLogoProps = {
  brand: "joia" | "forma";
  className?: string;
  priority?: boolean;
  alt?: string;
};

const logos = {
  joia: {
    src: "/media/brand/joia-logo.png",
    width: 689,
    height: 194,
    alt: "JOIA",
  },
  forma: {
    src: "/media/brand/forma-logo.png",
    width: 867,
    height: 379,
    alt: "FORMĀ",
  },
} as const;

export function BrandLogo({
  brand,
  className,
  priority = false,
  alt,
}: BrandLogoProps) {
  const logo = logos[brand];

  return (
    <Image
      className={className}
      src={logo.src}
      width={logo.width}
      height={logo.height}
      alt={alt ?? logo.alt}
      priority={priority}
    />
  );
}
