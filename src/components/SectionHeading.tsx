type Props = { index?: number; children: string; id?: string; className?: string };

/** Section label: small uppercase heading with an optional decorative index and a rule that draws in. */
export function SectionHeading({ index, children, id, className }: Props) {
  return (
    <h2 id={id} className={['section-label', className].filter(Boolean).join(' ')}>
      {index !== undefined && (
        <span className="section-index" aria-hidden="true">
          {String(index).padStart(2, '0')}
        </span>
      )}
      <span className="section-text">{children}</span>
      <span className="section-rule" aria-hidden="true" />
    </h2>
  );
}
