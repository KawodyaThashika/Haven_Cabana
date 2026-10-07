import React from "react";

// lucide-react v1.x removed all brand icons (Instagram, Facebook, ...).
// Importing them returns `undefined`, which crashes React and leaves a blank page.
// These are drop-in replacements with the same `size` / `className` / `style` props.

interface IconProps {
    size?: number;
    className?: string;
    style?: React.CSSProperties;
}

const base = (size: number) => ({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
});

export function Instagram({ size = 24, className, style }: IconProps) {
    return (
        <svg {...base(size)} className={className} style={style}>
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    );
}

export function Facebook({ size = 24, className, style }: IconProps) {
    return (
        <svg {...base(size)} className={className} style={style}>
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
    );
}
