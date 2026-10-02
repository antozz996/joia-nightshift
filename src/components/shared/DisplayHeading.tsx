import type { HTMLAttributes, PropsWithChildren } from "react";

type DisplayHeadingProps = PropsWithChildren<
  HTMLAttributes<HTMLHeadingElement> & {
    as?: "h1" | "h2" | "h3";
    world: "private" | "night" | "switch";
    size?: "hero" | "section" | "card";
  }
>;

export function DisplayHeading({
  as: Tag = "h2",
  world,
  size = "section",
  className = "",
  children,
  ...props
}: DisplayHeadingProps) {
  return (
    <Tag className={`display-heading display-heading--${world} display-heading--${size} ${className}`.trim()} {...props}>
      {children}
    </Tag>
  );
}
