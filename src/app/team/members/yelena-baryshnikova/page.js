import Resume from '@/components/Resume'

export const metadata = {
    title: 'ELENA BARYSHNIKOVA',
    description: 'Organizational development consultant, expert in building effective teams and developing competencies of first leaders. Former partner of the BIOSS Institute (Institute for Organizational and Social Studies of the National School of Government of Great Britain - a world leader in building effective organizational structures and assessing the management potential of global leaders, works with government and large commercial organizations in the U.S., UK and other countries).\n' +
        'Author of a monograph on the technology of the assessment center "Personnel assessment by the method of the assessment center. Best HR-strategies" (published in 2013 by Mann, Ivanov and Ferber).\n' +
        'Experience of successful work in organizational consulting for large international and national corporations, quasi-sector, government structures for more than 20 years.',
    openGraph: {
        title: 'Elena Baryshnikova',
        description: 'Organizational development consultant, expert in building effective teams and developing competencies of first leaders. Former partner of the BIOSS Institute (Institute for Organizational and Social Studies of the National School of Government of Great Britain - a world leader in building effective organizational structures and assessing the management potential of global leaders, works with government and large commercial organizations in the U.S., UK and other countries).\n' +
            'Author of a monograph on the technology of the assessment center "Personnel assessment by the method of the assessment center. Best HR-strategies" (published in 2013 by Mann, Ivanov and Ferber).\n' +
            'Experience of successful work in organizational consulting for large international and national corporations, quasi-sector, government structures for more than 20 years.',

    }
}



export default function Page() {
    return (
        <Resume
            workerName={'ELENA BARYSHNIKOVA'}
            postName={'CEO'}
            workerBio={'Organizational development consultant, expert in building effective teams and developing competencies of first leaders. Former partner of the BIOSS Institute (Institute for Organizational and Social Studies of the National School of Government of Great Britain - a world leader in building effective organizational structures and assessing the management potential of global leaders, works with government and large commercial organizations in the U.S., UK and other countries).\n' +
                'Author of a monograph on the technology of the assessment center "Personnel assessment by the method of the assessment center. Best HR-strategies" (published in 2013 by Mann, Ivanov and Ferber).\n' +
                'Experience of successful work in organizational consulting for large international and national corporations, quasi-sector, government structures for more than 20 years.'
            }
            contactUrl={'https://t.me/elenabaryshnikov'}
            photoSrc={require('@/icons/elena-baryshnikova.jpg')}
        />
    )
}