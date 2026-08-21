import type { FunctionComponent, SVGProps } from 'react'

import BTLogo from '@/shared/assets/logos/bt-logo.svg?component'
import DomodedovoLogo from '@/shared/assets/logos/domodedovo-logo.svg?component'
import IBSLogo from '@/shared/assets/logos/ibs-logo.svg?component'
import JCSLogo from '@/shared/assets/logos/jcs-logo.svg?component'
import KazatompromLogo from '@/shared/assets/logos/kazatomprom-logo.svg?component'
import KegocLogo from '@/shared/assets/logos/kegoc-logo.svg?component'
import KazMunayGasLogo from '@/shared/assets/logos/kuzmunai-gaz-logo.svg?component'
import MerzPharmaLogo from '@/shared/assets/logos/merz-pharma-logo.svg?component'
import MicrosoftLogo from '@/shared/assets/logos/microsoft-logo.svg?component'
import NestleLogo from '@/shared/assets/logos/nestle-logo.svg?component'
import RZDLogo from '@/shared/assets/logos/rzd-logo.svg?component'
import SABMillerLogo from '@/shared/assets/logos/sab-miller.svg?component'
import SamrukKazynaLogo from '@/shared/assets/logos/samruk-kazyna-logo.svg?component'
import SchneiderElectricLogo from '@/shared/assets/logos/schneider-electric-logo.svg?component'

export type Client = {
  /** Accessible name for the logo, which carries no text alternative of its own. */
  readonly name: string
  readonly Logo: FunctionComponent<SVGProps<SVGSVGElement>>
}

/**
 * Clients whose logos scroll across the homepage, in display order.
 *
 * `philips-logo.svg`, `philip-morris-logo.svg` and `rusnano-logo.svg` are also
 * present under `shared/assets/logos` but are intentionally not listed here —
 * they are not part of the current marquee.
 */
export const clients = [
  { name: 'Microsoft', Logo: MicrosoftLogo },
  { name: 'Nestlé', Logo: NestleLogo },
  { name: 'Schneider Electric', Logo: SchneiderElectricLogo },
  { name: 'SABMiller', Logo: SABMillerLogo },
  { name: 'B&T', Logo: BTLogo },
  { name: 'RZD', Logo: RZDLogo },
  { name: 'Domodedovo', Logo: DomodedovoLogo },
  { name: 'IBS', Logo: IBSLogo },
  { name: 'JCS', Logo: JCSLogo },
  { name: 'KazMunayGas', Logo: KazMunayGasLogo },
  { name: 'Merz Pharma', Logo: MerzPharmaLogo },
  { name: 'KEGOC', Logo: KegocLogo },
  { name: 'Samruk-Kazyna', Logo: SamrukKazynaLogo },
  { name: 'Kazatomprom', Logo: KazatompromLogo },
] as const satisfies readonly Client[]
