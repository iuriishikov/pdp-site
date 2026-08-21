/**
 * Typings for SVG imports.
 *
 * Next.js ships `declare module '*.svg' { const content: any }` in
 * `next/image-types/global.d.ts`, deliberately loose so it does not clash with
 * SVGR. These declarations describe the two query forms this project uses; a
 * plain `import x from './a.svg'` keeps Next's own static-image behaviour.
 */

declare module '*.svg?component' {
  import type { FunctionComponent, SVGProps } from 'react'

  /**
   * SVGR-generated React component. `title` comes from the loader's
   * `titleProp` option and renders a `<title>` element inside the SVG.
   */
  const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>

  export default ReactComponent
}

declare module '*.svg?url' {
  import type { StaticImageData } from 'next/image'

  const content: StaticImageData

  export default content
}
