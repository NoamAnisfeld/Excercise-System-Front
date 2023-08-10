import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
// @ts-ignore
import { prefixer } from 'stylis';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function RTL({ children }: React.PropsWithChildren) {
  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
}
