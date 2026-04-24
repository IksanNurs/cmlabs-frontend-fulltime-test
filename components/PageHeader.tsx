import Link from 'next/link';

type PageHeaderProps = {
  title: string;
  description: string;
  crumbs: Array<{
    label: string;
    href?: string;
  }>;
};

export function PageHeader({ title, description, crumbs }: PageHeaderProps) {
  return (
    <div>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        {crumbs.map((crumb, index) => (
          <span key={`${crumb.label}-${index}`}>
            {crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : <span>{crumb.label}</span>}
            {index < crumbs.length - 1 ? ' / ' : null}
          </span>
        ))}
      </nav>
      <h1 className="headline">{title}</h1>
      <p className="subheadline">{description}</p>
    </div>
  );
}
