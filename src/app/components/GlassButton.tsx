import { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";
import { Link } from "@/navigation";

type Variant = "dark" | "light";

const VARIANT_STYLE: Record<Variant, CSSProperties> = {
  dark: {
    background:
      "linear-gradient(135deg, rgba(25,18,12,0.28) 0%, rgba(70,52,38,0.12) 100%)",
    boxShadow: "inset 0 0 8px rgba(255,255,255,0.08)",
  },
  light: {
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 100%)",
    boxShadow: "inset 0 0 8px rgba(255,255,255,0.15)",
  },
};

const VARIANT_BORDER: Record<Variant, string> = {
  dark: "linear-gradient(135deg, rgba(246,245,241,0.75) 0%, rgba(246,245,241,0.08) 35%, rgba(246,245,241,0.08) 65%, rgba(246,245,241,0.5) 100%)",
  light:
    "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.2) 35%, rgba(255,255,255,0.2) 65%, rgba(255,255,255,0.8) 100%)",
};

const MASK_STYLE: CSSProperties = {
  WebkitMask:
    "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  WebkitMaskComposite: "xor",
  mask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
};

const BASE_CLASS = [
  "relative inline-flex h-[35px] w-fit items-center justify-center rounded-full px-4",
  "font-[family-name:Gellix] font-normal not-italic leading-[100%] tracking-[0%] text-[#FFFFFF]",
  "backdrop-blur-[4px]",
].join(" ");

const INTERACTIVE_CLASS = "transition-opacity duration-200 hover:opacity-80";

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  fontSize?: number;
};

type LinkProps = CommonProps & {
  href: string;
  as?: undefined;
} & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    "href" | "children" | "className"
  >;

type ButtonProps = CommonProps & {
  href?: undefined;
  as?: undefined;
} & Omit<ComponentPropsWithoutRef<"button">, "children" | "className">;

type StaticProps = CommonProps & {
  as: "span" | "div";
  href?: undefined;
} & Omit<ComponentPropsWithoutRef<"span">, "children" | "className">;

export type GlassButtonProps = LinkProps | ButtonProps | StaticProps;

export default function GlassButton(props: GlassButtonProps) {
  const {
    children,
    className = "",
    variant = "dark",
    fontSize = 14,
    ...rest
  } = props;

  const style: CSSProperties = {
    ...VARIANT_STYLE[variant],
    fontSize: `${fontSize}px`,
  };

  const border = (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-full p-px"
      style={{ background: VARIANT_BORDER[variant], ...MASK_STYLE }}
    />
  );

  if (rest.as === "span" || rest.as === "div") {
    const { as: Tag, ...staticRest } = rest as Omit<
      StaticProps,
      "children" | "className" | "variant" | "fontSize"
    >;
    return (
      <Tag
        {...staticRest}
        className={`${BASE_CLASS} ${className}`}
        style={style}
      >
        {border}
        {children}
      </Tag>
    );
  }

  if ("href" in rest && rest.href !== undefined) {
    const { as: _as, ...linkRest } = rest as Omit<
      LinkProps,
      "children" | "className" | "variant" | "fontSize"
    >;
    return (
      <Link
        {...linkRest}
        className={`${BASE_CLASS} ${INTERACTIVE_CLASS} ${className}`}
        style={style}
      >
        {border}
        {children}
      </Link>
    );
  }

  const { as: _as, ...buttonRest } = rest as Omit<
    ButtonProps,
    "children" | "className" | "variant" | "fontSize"
  >;
  return (
    <button
      type="button"
      {...buttonRest}
      className={`${BASE_CLASS} ${INTERACTIVE_CLASS} ${className}`}
      style={style}
    >
      {border}
      {children}
    </button>
  );
}
