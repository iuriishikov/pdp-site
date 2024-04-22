import Resume from '@/components/Resume'

export const metadata = {
    description: 'Irina Kondratova is highly experienced COO. More than 20 years of experience in management, board membership and entrepreneurship',
    openGraph: {
        title: 'Irina Kondratova',
        images: [
            {
                url: 'https://pdp.group/irina-kondratova.jpg',
                alt: 'Irina kondratova'
            }
        ],
        description: 'Irina Kondratova is highly experienced COO. More than 20 years of experience in management, board membership and entrepreneurship',
    }
}

export default function Page() {
    return (
        <Resume
            workerBio={
                <>
                    <p>
                        Highly experienced COO. More than 20 years of experience in management, board membership and entrepreneurship
                    </p>

                    <ul>
                        <li>
                            Digital Operational (DigOps) & Performance management
                        </li>

                        <li>
                            Data and analytics (D&A) strategy and operating model design
                        </li>

                        <li>
                            Analytics and business intelligence (ABI)
                        </li>
                    </ul>
                </>
            }
            postName={'Leader of the Digital Operations practice'}
            workerName={'Irina Kondratova'}
            photoSrc={require('@/icons/irina-kondratova.jpg')}
            contactUrl={'https://t.me/KondrIr'}
        />
    )
}