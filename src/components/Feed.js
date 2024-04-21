'use client'
import React from 'react'
import styles from '@/css/Feed.module.css'
import Marquee from "react-fast-marquee";
import {useEffect, useState} from "react";
import {useIntersection, useScrollIntoView, useViewportSize, useWindowScroll} from "@mantine/hooks";
import {Transition} from "@mantine/core";
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import butterflyAnimationData from '@/animations/butterfly.json'
import MicrosoftLogo from '@/icons/microsoft-logo.svg'
import NestleLogo from '@/icons/nestle-logo.svg'
import PhilipsLogo from '@/icons/philips-logo.svg'
import Head from "next/head";



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



export default function Feed({target}) {
    useEffect(() => {
        if (target === 'about') {
            scrollToAbout()
        } else if (target === 'clients') {
            scrollToClients()
        }
    }, [target])

    const {scrollIntoView: scrollToClients, targetRef: clientsRef} = useScrollIntoView({offset: 60})
    const {scrollIntoView: scrollToAbout, targetRef: aboutRef} = useScrollIntoView({offset: 60})

    return (
        <div className={styles.container}>
            <div className={styles.background}>
                <Lottie animationData={butterflyAnimationData} width={200} height={200} autoplay={true} loop={true} />
            </div>

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

            <div ref={clientsRef} className={styles.projects}>
                <h1>CLIENTS</h1>

                <Marquee speed={100}>
                    <div className={styles.project_card}>
                        <MicrosoftLogo classNmae={styles.project_logo}/>

                        <div className={styles.project_name}>
                            Microsoft
                        </div>
                    </div>

                    <div className={styles.project_card}>
                        <NestleLogo className={styles.project_logo}/>

                        <div className={styles.project_name}>
                            Nestle
                        </div>
                    </div>

                    <div className={styles.project_card}>
                        <PhilipsLogo className={styles.project_logo}/>

                        <div className={styles.project_name}>
                            Philips
                        </div>
                    </div>
                </Marquee>
            </div>
        </div>
    )
}