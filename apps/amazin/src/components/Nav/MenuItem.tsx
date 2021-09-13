import { memo } from 'react';

import InnerMenuItem from './InnerMenuItem';

type PropType = {
  label: string;
  to?: string;
  className?: string;
  extFunction?: FnType;
  children?: Children;
  key: string;
};

export const mapArgsToProps = ([label, to, className, extFunction]: ArgsType, id: number) => ({
  label,
  to,
  className,
  extFunction,
  key: `${id} ${label || className}`
});

export const NavCategoryAdapter = (cat: string) => [cat, '/search/category/' + cat];

function MenuItem({ label, ...props }: { label: string; props?: Props }) {
  if (label === 'separator') return <li className="separator" />;
  return <li children={<InnerMenuItem label={label} {...props} />} />;
}

export default memo(MenuItem, (prev, next) => prev.label === next.label);