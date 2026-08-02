import React, { lazy, Suspense } from 'react';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

type PayloadIconProps = LucideProps & {
  name: string;
}

// Helper to convert PascalCase/camelCase to kebab-case expected by dynamicIconImports
const toKebabCase = (str: string) =>
  str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
    .replace(/-icon$/, '')
    .replace(/^lucide-/, '');

export const PayloadIcon = ({ name, ...props }: PayloadIconProps) => {
  const kebabName = toKebabCase(name) as keyof typeof dynamicIconImports;

  if (!dynamicIconImports[kebabName]) {
    return null; // Fallback if icon name doesn't exist
  }

  const LucideIcon = lazy(dynamicIconImports[kebabName]);

  return (
    <Suspense fallback={<div className="w-6 h-6 bg-gray-300" />}>
      <LucideIcon {...props} />
    </Suspense>
  );
};
