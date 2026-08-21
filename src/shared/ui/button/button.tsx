import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import styles from './button.module.css'

type ButtonOwnProps = {
  readonly children: ReactNode
  readonly className?: string
}

type ButtonAsButton = ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'> & {
    readonly href?: undefined
  }

type ButtonAsLink = ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<'a'>, 'className' | 'children'> & {
    /** Rendering as an anchor keeps middle-click, "open in new tab" and
     *  copy-link working, which a click handler on a button cannot offer. */
    readonly href: string
  }

type ButtonProps = ButtonAsButton | ButtonAsLink

function Face({ children }: { readonly children: ReactNode }) {
  return (
    <>
      <span className={styles.shadow} aria-hidden="true" />
      <span className={styles.button}>{children}</span>
    </>
  )
}

/**
 * The site's only button: a white face offset over a solid black block, giving
 * a hard drop shadow.
 *
 * Renders an `<a>` when given `href`, otherwise a real `<button>`. Either way
 * the interactive element is the outer node, so the control is focusable and
 * responds to the keyboard — the previous version put the click handler on a
 * `<div>` wrapping a `<button>`, so Enter and Space did nothing.
 */
export function Button({ children, className, ...props }: ButtonProps) {
  const rootClassName = className ? `${styles.root} ${className}` : styles.root

  if (props.href !== undefined) {
    const { href, ...anchorProps } = props
    return (
      <a {...anchorProps} href={href} className={rootClassName}>
        <Face>{children}</Face>
      </a>
    )
  }

  const { href: _ignored, type = 'button', ...buttonProps } = props
  return (
    <button {...buttonProps} type={type} className={rootClassName}>
      <Face>{children}</Face>
    </button>
  )
}
