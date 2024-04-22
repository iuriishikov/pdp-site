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
                    <h1>
                        Profecional Experience
                    </h1>

                    <p>
                        2016 – present, PDP, Digital Operations consulting’s Partner Project Examples:
                    </p>

                    <p>
                        · Tatneft (Oil): Group efficiency improvement project. Key performance metrics for CEO-1 level were defined. Customer — CEO of TATNEFT. Result: Developed operational analytics data structure.
                    </p>

                    <p>
                        · IBS (IT) Project 1: Analyzed the causes of staff turnover in the largest retall chain (15 000 stores, more than 200,000 headcount). Formed hypotheses; analyzed a data of more than 100,000 people, identified the causes of turnover in the context of efficiency; experience and age groups. Solution/Result: Proposed changes in the target business-process of hiring and the motivation system. Estimated effect of business up to 4% of EBITDa.
                    </p>

                    <p>
                        · IBS (IT) Project 2: Contact center 700+ employees. Project to achieve SLA indicators. Conducted analysis of D&A (Personnel-Processes by minutes), identified the cause of losses. Solution/Result: Proposed solution and predictive analytics data profile. The SLA score increased by 10% without any additional costs.
                    </p>

                    <p>
                        2019-2022 Verme, Co-founder, Product Director
                    </p>

                    <p>
                        Work Force Management system company— leader on the CIS market. Clients were top-25 retail chains, 20 000+ stores. Marketplace platform for retail store staff. Verme system generated peak sales forecasts for each store; mathematical model revealed shortages of Internal Performers in real time. The platform attracted performers for 2-4 hours shifts. Owned, developed and drove Product and Operations Strategy, Information Technology, Sales, Human Resources, P&L Result: 9000 shifts in 11 cities operating monthly in 6 months after the launch.
                    </p>

                    <p>
                        2007-2011 Kelly Services CIS, Chief Operating Officer
                    </p>

                    <p>
                        One of the largest outsourcing companies in the world Managed product portfolio; Implemented company&prime;s digital transformation project. Implemented ERP and end-to-end analytics across the entire product creation chain based on Axapta (Microsoft) Result: Achieved annual staff productivity growth of up to 85% 2010, Business unit was the leader in efficiency and EBITDa growth in EMEA 2011, Joined Kelly Global&prime;s talent pool of top managers.
                    </p>

                    <p>
                        2006-2007 Renaissance Insurance, Vice President of Regional Development
                    </p>

                    <p>
                        One of the top ten insurance companies. Strategized long-term regional network development and sales Result: Increased productivity by 70% in the regional network team (Revenue/FTE). Boosted regional network revenue by 200%
                    </p>
                </>
            }
            postName={'Leader of the Digital Operations practice'}
            workerName={'Irina Kondratova'}
            photoSrc={require('@/icons/irina-kondratova.jpg')}
            contactUrl={'https://t.me/KondrIr'}
        />
    )
}