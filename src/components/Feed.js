'use client'
import styles from '@/css/Feed.module.css'
import ReactCurvedText from "react-curved-text";
import {useEffect, useState} from "react";
import {useIntersection, useViewportSize, useWindowScroll} from "@mantine/hooks";
import {Transition} from "@mantine/core";
import Lottie from "lottie-react";
import butterflyAnimationData from '@/animations/butterfly.json'
import Link from "next/link";
import Image from 'next/image'
import 'swiper/css';
import MicrosoftLogo from '@/icons/miscrosoft-logo.svg'
import PhilipsLogo from '@/icons/philips-logo.svg'
import NestleLogo from '@/icons/philips-logo.svg'
import {Swiper, SwiperSlide} from "swiper/react";

const projects = [
    {
        label: 'Microsoft',
        desc: 'Microsoft corp',
        previewSrc: require('@/icons/microsoft.jpeg')
    },
    {
        label: 'Philips Corp',
        desc: 'Microsoft corp',
        previewSrc: require('@/icons/philips.webp')
    },
    {
        label: 'Philips Corp',
        desc: 'Microsoft corp',
        previewSrc: require('@/icons/philips.webp')
    },
    {
        label: 'Philips Corp',
        desc: 'Microsoft corp',
        previewSrc: require('@/icons/philips.webp')
    },
    {
        label: 'Philips Corp',
        desc: 'Microsoft corp',
        previewSrc: require('@/icons/philips.webp')
    },
    {
        label: 'Philips Corp',
        desc: 'Microsoft corp',
        previewSrc: require('@/icons/philips.webp')
    },
    {
        label: 'Philips Corp',
        desc: 'Microsoft corp',
        previewSrc: require('@/icons/philips.webp')
    },
    {
        label: 'Philips Corp',
        desc: 'Microsoft corp',
        previewSrc: require('@/icons/philips.webp')
    },
    {
        label: 'Philips Corp',
        desc: 'Microsoft corp',
        previewSrc: require('@/icons/philips.webp')
    },
    {
        label: 'Philips Corp',
        desc: 'Microsoft corp',
        previewSrc: require('@/icons/philips.webp')
    },
    {
        label: 'Philips Corp',
        desc: 'Microsoft corp',
        previewSrc: require('@/icons/philips.webp')
    },
    {
        label: 'Philips Corp',
        desc: 'Microsoft corp',
        previewSrc: require('@/icons/philips.webp')
    },
    {
        label: 'Philips Corp',
        desc: 'Microsoft corp',
        previewSrc: require('@/icons/philips.webp')
    },
    {
        label: 'Philips Corp',
        desc: 'Microsoft corp',
        previewSrc: require('@/icons/philips.webp')
    },
    {
        label: 'Philips Corp',
        desc: 'Microsoft corp',
        previewSrc: require('@/icons/philips.webp')
    },
    {
        label: 'Philips Corp',
        desc: 'Microsoft corp',
        previewSrc: require('@/icons/philips.webp')
    },
    {
        label: 'Philips Corp',
        desc: 'Microsoft corp',
        previewSrc: require('@/icons/philips.webp')
    },
    {
        label: 'Philips Corp',
        desc: 'Microsoft corp',
        previewSrc: require('@/icons/philips.webp')
    },
    {
        label: 'Philips Corp',
        desc: 'Microsoft corp',
        previewSrc: require('@/icons/philips.webp')
    }
]

function CurvedText({children, cx=0, width=0, height=0, cy=0, rx=0, ry=0}) {
    const [wasInViewport, setWasInViewport] = useState(false)
    const {width: viewportWidth, height: viewportHeight} = useViewportSize()

    return (
        <div className={styles.curved_item}>
            <ReactCurvedText
                width={width}
                height={height}
                cx={cx}
                cy={cy}
                rx={rx}
                ry={ry}
                startOffset={50}
                reversed={false}
                text={children}
                textProps={{ style: { fontSize: 'inherit' } }}
                textPathProps={null}
                tspanProps={null}
                ellipseProps={null}
                svgProps={null}
            />
        </div>
    )
}

function TextItem({children}) {
    const [wasInViewport, setWasInViewport] = useState(false)
    const {ref: triggerRef, entry: triggerEntry} = useIntersection({threshold: 0.3})

    useEffect(() => {
        if (wasInViewport) {
            return
        }

        if (triggerEntry?.isIntersecting) {
            setWasInViewport(true)
        }
    }, [triggerEntry])

    return (
        <div style={{minHeight: 200}} ref={triggerRef}>
            <Transition duration={3000} transition={'fade'} mounted={wasInViewport}>
                {(transtionStyles) =>
                    <div style={transtionStyles} className={styles.text_item_root}>
                        <div className={styles.text_item}>
                            {children}
                        </div>
                    </div>
                }
            </Transition>
        </div>
    )
}

function Project({previewSrc, label, desc}) {
    return (
        <a className={styles.project}>
            <Image src={previewSrc} className={styles.project_preview} />

            <div className={styles.project_label}>
                {label}
            </div>

            <div className={styles.project_desc}>
                {desc}
            </div>
        </a>
    )
}

export default function Feed({}) {
    const {width: viewportWidth, height: viewportHeight} = useViewportSize()
    const [scroll, setScroll] = useWindowScroll()

    function handleShare() {
        const url = window.location.href

        navigator.share({url: url})
    }

    return (
        <div className={styles.container}>
            <div className={styles.background}>
                <Lottie animationData={butterflyAnimationData} width={200} height={200} autoplay={true} loop={true} />

            </div>

            <header data-is-mounted={(scroll.y < 10).toString()} className={styles.header}>
                <Link href={'/'} onClick={handleShare} className={styles.header_item}>
                    Share
                </Link>

                <Link href={'/about'} className={styles.header_item}>
                    About
                </Link>

                <Link href={'/projects'} className={styles.header_item}>
                    Projects
                </Link>

                <Link href={'/contact'} className={styles.header_item}>
                    Contact
                </Link>
            </header>

            <div className={styles.label}>
                <span className={styles.label_italic}>
                    {'We '}
                </span>

                <span className={styles.label_regular}>
                     {' want to influence '}
                </span>

                <span className={styles.label_italic}>
                     {'positive '}
                </span>

                <span className={styles.label_regular}>
                    {'change in the world'}
                </span>
            </div>

            <div className={styles.texts}>
                <TextItem>
                    PDP (Performance Development Partners) was created in 2004 and is operating now in 3 continents. More than 20 years we help our clients to make the world a better place by making the structure of their companies and management principals more equitable.
                </TextItem>

                <TextItem>
                    We are a values-driven organization and work to meet the highest professional and ethical standards.
                </TextItem>

                <TextItem>
                    We want to influence positive change in the world and help our clients in a rapidly changing world. We accelerate sustainable and inclusive growth and help our clients create meaningful and lasting change.
                </TextItem>

                <TextItem>
                    Our mission is to help organizations, teams and people unlock their potential and achieve outstanding results.
                </TextItem>
            </div>

            <Swiper slidesPerView={'auto'} autoplay={true} direction={'horizontal'} spaceBetween={30} className={styles.projects_swiper}>
                {projects.map((projectData) =>
                    <SwiperSlide key={projectData} className={styles.project_slide}>
                        <Project previewSrc={projectData.previewSrc} label={projectData.label} desc={projectData.desc} />
                    </SwiperSlide>
                )}
            </Swiper>


            <footer className={styles.footer}>

            </footer>
        </div>
    )
}