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
import SABMillerLogo from '@/icons/sab-miller.svg'
import SchneiderElectricLogo from '@/icons/schneider-electric-logo.svg'
import BTLogo from '@/icons/b&t-logo.svg'
import Link from "next/link";



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
        <div style={{minHeight: 400}} ref={triggerRef}>
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

    const {scrollIntoView: scrollToClients, targetRef: clientsRef} = useScrollIntoView({offset: 0})
    const {scrollIntoView: scrollToAbout, targetRef: aboutRef} = useScrollIntoView({offset: 0})

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
                    <h1>PDP (Performance Development Partners) </h1>
                    <span>was created in 2004 and is operating now in 3 continents. More than 20 years we help our clients to make the world a better place by making the structure of their companies and management principals more equitable.</span>
                </TextItem>

                <TextItem>
                    We are a values-driven organization and work to meet the highest professional and ethical standards.
                </TextItem>

                <TextItem>
                    We want to influence positive change in the world and help our clients in a rapidly changing world. We accelerate sustainable and inclusive growth and help our clients create meaningful and lasting change.
                    Our mission is to help organizations, teams and people unlock their potential and achieve outstanding results.
                </TextItem>

                <TextItem>
                    <h1>
                        Practices
                        Organizational Effectiveness Practice
                    </h1>

                    <span>
                        «Culture eats strategy for breakfast»
                        Peter Drucker
                        We are engaged in management consulting, including the development and implementation of strategies, increasing government and organizational effectiveness, optimizing organizational structures and management changes.

                        It is important to us to bring value to our clients. We work with our clients to design optimal organizational structures, roles and responsibilities.
                    </span>
                </TextItem>

                <TextItem>
                    <h1>
                        Talent Management Practice
                    </h1>

                    <span>
                        We help managers to reveal untapped capability in their people. We work with leaders to remove bureaucracy and create value through a clear and present focus on accountability. And we help organizations build teams and strengthen relationships so that each level adds value, is appropriately rewarded, and contributes to the resilience of the whole.
                        Organizations need to champion and develop the leaders we need now. Inclusive leaders, from diverse backgrounds and perspectives. Game-changers. Implementers. We help organizations better understand people and create the conditions for each leader to unleash their potential.
                    </span>
                </TextItem>

                <TextItem>
                    <h1>
                        Reward Practice
                    </h1>

                    <span style={{textDecoration: 'underline'}}>
                        Our salary research gives your HR team the confidence to create sound compensation structures, determine salary premiums for in-demand work, and implement other important aspects related to employee compensation. No matter the size or scope of your data needs, we can help you understand current salary research trends in the market to set you apart from your competitors.
                    </span>
                </TextItem>
            </div>

            <div ref={aboutRef} className={styles.about}>
                <h1>
                    ABOUT
                </h1>

                <div className={styles.about_item}>
                    <span>
                        Elena Baryshnikova – Managing Partner, leader of the organizational effectiveness practice. Photo and short resume. Below is the link - download CV - the full version of the CV is downloaded
                    </span>

                    <span> </span>

                    <Link href={'/team/members/yelena-baryshnikova'}>
                        there
                    </Link>

                    <span>.</span>
                </div>

                <div className={styles.about_item}>
                    <span>
                        Marzhan Nazarova is a leader in the remuneration management practice. Photo and short resume. Below is the link - download CV - the full version of the CV is downloaded
                    </span>

                    <span> </span>

                    <Link href={'/team/members/marzhan-nazarova'}>
                        there
                    </Link>

                    <span>
                        .
                    </span>
                </div>
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
                        <SchneiderElectricLogo className={styles.project_logo}/>

                        <div className={styles.project_name}>
                            Schneider Electric
                        </div>
                    </div>

                    <div className={styles.project_card}>
                        <PhilipsLogo className={styles.project_logo}/>

                        <div className={styles.project_name}>
                            Philips
                        </div>
                    </div>

                    <div className={styles.project_card}>
                        <SABMillerLogo className={styles.project_logo} />

                        <div className={styles.project_name}>
                            SABMiller
                        </div>
                    </div>

                    <div className={styles.project_card}>
                        <BTLogo className={styles.project_logo} />

                        <div className={styles.project_name}>
                            B&T
                        </div>
                    </div>
                </Marquee>
            </div>
        </div>
    )
}