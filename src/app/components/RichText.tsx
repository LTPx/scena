import { createElement } from "react";

type Variant = "inline" | "block";

const BLOCK_TAGS = /<(p|ul|ol|h[1-6]|blockquote|div)\b/i;

export function normalizeWpHtml(html: string, variant: Variant): string {
  const clean = (html ?? "").replace(/&nbsp;|\u00a0/g, " ");
  if (variant === "inline") {
    return clean
      .replace(/<\/p>\s*<p[^>]*>/gi, "\n")
      .replace(/<\/?p[^>]*>/gi, "")
      .replace(/<br\s*\/?>/gi, "\n")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .join("<br />");
  }

  const withoutEmptyP = clean.replace(/<p[^>]*>\s*<\/p>/gi, "");
  if (BLOCK_TAGS.test(withoutEmptyP)) return withoutEmptyP;

  return withoutEmptyP
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => `<p>${chunk.replace(/\n/g, "<br />")}</p>`)
    .join("");
}

interface Props {
  html: string;
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
  variant?: Variant;
  className?: string;
}

export default function RichText({
  html,
  as = "div",
  variant = "inline",
  className,
}: Props) {
  return createElement(as, {
    className,
    dangerouslySetInnerHTML: { __html: normalizeWpHtml(html, variant) },
  });
}
