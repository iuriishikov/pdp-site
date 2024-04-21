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
    const [emailSubject, setEmailSubject] = useState('')
    const [emailBody, setEmailBody] = useState('')
    const [emailAuthor, setEmailAuthor] = useState('')

    function sendEmail() {
        const encodedSubject = encodeURI(emailSubject)
        const encodedBody = encodeURI(emailBody)
        const encodedAuthor = encodeURI(emailAuthor)

        const url = `mailto:info@pdp.group?subject=${encodedSubject}&body=${encodedBody}&from=${encodedAuthor}`

        window.open(url)
    }

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

                <Input value={emailSubject} onChange={(event) => setEmailSubject(event.target.value)} placeholder={'Subject'} />

                <Input value={emailBody} onChange={(event) => setEmailBody(event.target.value)} multiStrokes={true} placeholder={'Text'} />

                <Button onClick={sendEmail} disabled={!emailBody || !emailSubject || !emailAuthor}>
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

                <div className={styles.children}>
                    {children}
                </div>

                <Footer />
            </div>
        </MantineProvider>
    )
}