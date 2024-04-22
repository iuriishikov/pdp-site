'use client'
import styles from '@/css/Wrapper.module.css'
import Link from "next/link";
import {useState} from "react";
import {MantineProvider} from "@mantine/core";
import {useWindowScroll} from "@mantine/hooks";
import Input from "@/components/Input";
import Button from "@/components/Button";
import '@/app/globals.css'



function ContactForm() {
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
        <div className={styles.contact_form}>
            <Input
                value={emailAuthor}
                onChange={(event) => setEmailAuthor(event.target.value)}
                placeholder={'Who are you?'}
            />

            <Input
                value={emailSubject}
                onChange={(event) => setEmailSubject(event.target.value)}
                placeholder={'Subject'}
            />

            <Input
                value={emailBody}
                onChange={(event) => setEmailBody(event.target.value)}
                multiStrokes={true}
                placeholder={'Text'}
            />

            <Button
                onClick={sendEmail}
                disabled={!emailBody || !emailSubject || !emailAuthor}
            >
                Send
            </Button>
        </div>
    )
}

function Footer() {
    return (
        <footer className={styles.footer}>
            <h1>
                Contact Us
            </h1>

            <a href='mailto:info@pdp.group' className={styles.footer_email}>
                info@pdp.group
            </a>

            <a href='tel:+16147495620' className={styles.footer_email}>
                N-America +16147495620
            </a>

            <a href='tel:+79057762787' className={styles.footer_email}>
                Europe +79057762787
            </a>

            <a href='tel:+77068415555' className={styles.footer_email}>
                Central Asia +77068415555
            </a>

            <ContactForm/>

            <Link href={'/'} className={styles.footer_item}>
                Home
            </Link>

            <div className={styles.footer_item}>
                ©2004-2024 PDP Authorship
            </div>

            <a href={'https://t.me/yurrriiiyyy'} className={styles.footer_item}>
                Site created by
            </a>
        </footer>
    )
}

export default function Wrapper({children}) {
    return (
        <MantineProvider>
            <div className={styles.root}>
                <div className={styles.container}>
                    {children}

                    <Footer/>
                </div>
            </div>
        </MantineProvider>
    )
}