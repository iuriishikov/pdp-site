import { butterflyAnimation } from '@/shared/assets'
import { LottieScene } from '@/shared/ui/lottie-scene'

import { ClientsSection } from './clients-section'
import { Hero } from './hero'
import styles from './home-page.module.css'
import { StorySection } from './story-section'
import { TeamSection } from './team-section'

/**
 * The homepage.
 *
 * A server component: everything but the butterfly animation, the reveal
 * observers and the logo marquee renders to static HTML.
 */
export function HomePage() {
  return (
    <div className={styles.container}>
      <LottieScene animation={butterflyAnimation} className={styles.background} />

      <Hero />

      <StorySection />

      <TeamSection />

      <ClientsSection />
    </div>
  )
}
