/**
 * Default CSS LESS SCSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}
declare module '*.less' {
  const content: { [className: string]: string };
  export default content;
}

// declare module '*.jpg'
// declare module '*.png'
// declare module '*.jpeg'

interface SvgrComponent {}

declare module '*.svg' {
  const svgUrl: string;
  const svgComponent: SvgrComponent;
  export default svgUrl;
  export { svgComponent as ReactComponent };
}

// eslint-disable-next-line
declare interface AnyObject {
  [key: string]: any;
}

// eslint-disable-next-line
declare type Any = any;
