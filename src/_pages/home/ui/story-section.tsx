import { PracticeBlock, practices } from '@/entities/practice'
import { Prose } from '@/shared/ui/prose'
import { Reveal } from '@/shared/ui/reveal'

import { introBlocks, introTitle, practicesHeading } from '../model/intro'

import styles from './story-section.module.css'

/**
 * The editorial column: who PDP is, then each practice.
 *
 * The intro, the "PRACTISES" heading and each practice are siblings so the
 * alternating left/right alignment falls out of `:nth-child` — see the
 * stylesheet.
 */
export function StorySection() {
  return (
    <div className={styles.texts}>
      <Reveal>
        <div className={styles.text_item}>
          <h1>{introTitle}</h1>

          <Prose blocks={introBlocks} />
        </div>
      </Reveal>

      <h1>{practicesHeading}</h1>

      {practices.map((practice) => (
        <Reveal key={practice.title}>
          <div className={styles.text_item}>
            <PracticeBlock practice={practice} />
          </div>
        </Reveal>
      ))}
    </div>
  )
}
