import {metadata} from '@/app/page'
import Feed from '@/components/Feed'

export {
    metadata
}

export default function Page() {
    return (
        <Feed target={'about'} />
    )
}