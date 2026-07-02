// Ambient module declarations for asset imports the TS compiler otherwise
// can't resolve — these are handled by Rspress's Rsbuild/webpack bundler at
// build time, not by tsc, so tsc needs to be told their shape explicitly.

declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}

declare module '*.css';
