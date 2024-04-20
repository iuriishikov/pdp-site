'use client'
import styles from '@/css/Wrapper.module.css'
import Link from "next/link";
import {useState} from "react";
import {MantineProvider} from "@mantine/core";
import {useWindowScroll} from "@mantine/hooks";
import Input from "@/components/Input";
import Button from "@/components/Button";

function Header() {
    const [scroll, setScroll] = useWindowScroll()

    function handleShare() {
        const url = window.location.href

        navigator.share({url: url})
    }

    return (
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
    )
}

function Footer() {
    const [emailTitle, setEmailTitle] = useState('')
    const [emailBody, setEmailBody] = useState('')
    const [emailAuthor, setEmailAuthor] = useState('')

    return (
        <footer className={styles.footer}>
            <h1>
                CONTACT
            </h1>

            <a href='mailto:info@pdp.group' className={styles.footer_email}>
                info@pdp.group
            </a>

            <div className={styles.footer_email_form}>
                <Input value={emailAuthor} onChange={(event) => setEmailAuthor(event.target.value)} placeholder={'Who are you?'} />

                <Input value={emailTitle} onChange={(event) => setEmailTitle(event.target.value)} placeholder={'Subject'} />

                <Input value={emailBody} onChange={(event) => setEmailBody(event.target.value)} multiStrokes={true} placeholder={'Text'} />

                <Button disabled={!emailBody || !emailTitle || !emailAuthor}>
                    Send
                </Button>
            </div>
        </footer>
    )
}

export default function Wrapper({children}) {
    return (
        <MantineProvider>
            <div className={styles.container}>
                <Header/>

                {children}

                <Footer />
            </div>
        </MantineProvider>
    )
}