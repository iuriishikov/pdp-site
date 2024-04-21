import Resume from '@/components/Resume'

export const metadata = {
    description: 'Marzhan Nazarova is an HR expert with more than 10 years of experience in improving recruitment, talent management and assessment processes. Leader of compensation management practice at PDP (Performance Development Partners). Experience in performance management, compensation and benefits, employee engagement and corporate culture, employer image, and diversity and inclusion. Over 7 years of experience managing teams. Served as HR Manager at All Movers US Inc. in Charlotte, USA. Former Head of HR Consulting Department at Samruk Kazyna Corporate University (currently Samruk Business Academy) and Senior Lecturer at Narikbayev KazGYU University (currently MNU University) in Astana, Kazakhstan. Created a digital employee assessment platform, including general testing, 360-degree assessments and HR surveys, which is currently used by more than 30 leading national companies in the Republic of Kazakhstan. Developed engagement surveys for a group of national companies and an outplacement program for a major national oil company. Received Master\'s degree in Human Resource Management from Georgetown University, Washington DC in 2014.\n',
    keywords: ['compensation management expert', 'C&B expert', 'Compensations and benefits expert', 'HR consulting', 'HR services', 'Marzhan Nazarova'],
    openGraph: {
        title: 'Marzhan Nazarova',
        images: [
            {
                url: 'https://pdp.group/marzhan-nazarova.png',
                alt: 'Marzhan Nazarova'
            }
        ],
        description: 'Marzhan Nazarova is an HR expert with more than 10 years of experience in improving recruitment, talent management and assessment processes. Leader of compensation management practice at PDP (Performance Development Partners). Experience in performance management, compensation and benefits, employee engagement and corporate culture, employer image, and diversity and inclusion. Over 7 years of experience managing teams. Served as HR Manager at All Movers US Inc. in Charlotte, USA. Former Head of HR Consulting Department at Samruk Kazyna Corporate University (currently Samruk Business Academy) and Senior Lecturer at Narikbayev KazGYU University (currently MNU University) in Astana, Kazakhstan. Created a digital employee assessment platform, including general testing, 360-degree assessments and HR surveys, which is currently used by more than 30 leading national companies in the Republic of Kazakhstan. Developed engagement surveys for a group of national companies and an outplacement program for a major national oil company. Received Master\'s degree in Human Resource Management from Georgetown University, Washington DC in 2014.',
    }
}

export default function Page() {
    return (
        <Resume
            workerBio={
            'Marzhan Nazarova is an HR expert with more than 10 years of experience in improving recruitment, talent management and assessment processes. Leader of compensation management practice at PDP (Performance Development Partners). Experience in performance management, compensation and benefits, employee engagement and corporate culture, employer image, and diversity and inclusion. Over 7 years of experience managing teams. Served as HR Manager at All Movers US Inc. in Charlotte, USA. Former Head of HR Consulting Department at Samruk Kazyna Corporate University (currently Samruk Business Academy) and Senior Lecturer at Narikbayev KazGYU University (currently MNU University) in Astana, Kazakhstan. Created a digital employee assessment platform, including general testing, 360-degree assessments and HR surveys, which is currently used by more than 30 leading national companies in the Republic of Kazakhstan. Developed engagement surveys for a group of national companies and an outplacement program for a major national oil company. Received Master\'s degree in Human Resource Management from Georgetown University, Washington DC in 2014.\n'
            }
            postName={'Remuneration management practice leader'}
            workerName={'Marzhan Nazarova'}
            photoSrc={require('@/icons/marzhan-nazarova.png')}
            contactUrl={'https://www.linkedin.com/in/marzhan-nazarova-513950123/'}
        />
    )
}