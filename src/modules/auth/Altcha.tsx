import { useEffect, useRef } from 'react';

// Importing altcha package will introduce a new element <altcha-widget>
import 'altcha';

type AltchaProps = {
  onChange: (value: string) => void;
};

export function Altcha({ onChange }: AltchaProps): JSX.Element {
  const widgetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleStateChange = (ev: Event | CustomEvent) => {
      if ('detail' in ev) {
        const value = ev.detail.payload || null;
        onChange?.(value);
      }
    };

    const { current } = widgetRef;

    if (current) {
      current.addEventListener('statechange', handleStateChange);
      return () =>
        current.removeEventListener('statechange', handleStateChange);
    }
  }, [onChange]);

  /* Configure your `challengeurl` and remove the `test` attribute, see docs: https://altcha.org/docs/website-integration/#using-altcha-widget  */
  return (
    <altcha-widget
      ref={widgetRef}
      style={{
        '--altcha-max-width': '100%',
      }}
      debug
      test
    ></altcha-widget>
  );
}
