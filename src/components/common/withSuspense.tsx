import { ComponentType, ReactNode, Suspense } from 'react';

interface WithSuspenseProps {
  fallback?: ReactNode;
}

export const withSuspense = <P extends object>(
  Component: ComponentType<P>,
  fallback: ReactNode = null,
) => {
  const WrappedComponent: React.FC<P & WithSuspenseProps> = (props) => {
    const { fallback: propFallback, ...rest } = props;
    return (
      <Suspense fallback={propFallback || fallback}>
        <Component {...(rest as P)} />
      </Suspense>
    );
  };

  return WrappedComponent;
};
