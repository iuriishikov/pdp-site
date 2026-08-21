import { headlineRuns } from '../model/intro'

import styles from './hero.module.css'

/**
 * The headline above the fold, alternating between the mono and italic
 * display faces run by run.
 */
export function Hero() {
  return (
    <div className={styles.label}>
      {headlineRuns.map((run, index) => (
        <span
          key={index}
          className={run.style === 'italic' ? styles.label_italic : styles.label_regular}
        >
          {run.text}
        </span>
      ))}
    </div>
  )
}
