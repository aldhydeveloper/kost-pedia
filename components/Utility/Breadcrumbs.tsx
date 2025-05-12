'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Crumb {
  href: string;
  label: string;
}

const Breadcrumbs = ({breadcrumbs}:{breadcrumbs:Crumb[]}) => {
  // const pathname = usePathname();
  // const pathSegments: string[] = pathname.split('/').filter(Boolean);

  // const breadcrumbs: Crumb[] = pathSegments.map((segment, index) => {
  //   const href = '/' + pathSegments.slice(0, index + 1).join('/');
  //   const label = decodeURIComponent(segment).replace(/-/g, ' ');
  //   return { href, label };
  // });
  console.log(breadcrumbs)
  return (
    <nav aria-label="Breadcrumb" className="my-4">
      <ol className="flex flex-wrap text-sm text-gray-600 space-x-1">
        <li>
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
        </li>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.href}>
            <li>
              <span className="mx-1 text-gray-400">/</span>
            </li>
            <li>
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-900 font-semibold">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="text-blue-600 hover:underline">
                  {crumb.label}
                </Link>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
export type { Crumb }
