import { useCallback, useEffect } from 'react';

import { useOutline } from './useOutline';
import { useShadow } from 'src/hooks/useShadow';
import { SHADOW } from 'src/constants';

export function useOutsideClick(navSearchRef) {
  const { shadowOf, setShadowOf } = useShadow();
  const { setScopeOutline, setSuggestBox } = useOutline();

  const handleOutsideClick = useCallback((e) => {
    if (!navSearchRef.current || navSearchRef.current.contains(e.target)) return;
    setSuggestBox(false);
    setScopeOutline(0);
    setShadowOf('');
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (SHADOW.SCOPE === shadowOf) document.addEventListener('mousedown', handleOutsideClick);
    if (SHADOW.NAV_DD === shadowOf) {
      document.removeEventListener('mousedown', handleOutsideClick);
      setScopeOutline(0);
    }

    return () => document.removeEventListener('mousedown', handleOutsideClick);
    // eslint-disable-next-line
  }, []);
}