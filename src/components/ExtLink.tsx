import type { AnchorHTMLAttributes, ReactNode } from 'react';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  /** Hide the ↗ glyph (e.g. inside buttons that carry their own icon). */
  plain?: boolean;
};

/** A link that opens in a new tab and tells screen-reader users so. */
export function ExtLink({ href, children, plain, ...rest }: Props) {
  const isSameOrigin = href.startsWith('/');
  return (
    <a href={href} target="_blank" rel={isSameOrigin ? 'noopener' : 'noopener noreferrer'} {...rest}>
      {children}
      {!plain && (
        <span className="ext-icon" aria-hidden="true">
          ↗
        </span>
      )}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
