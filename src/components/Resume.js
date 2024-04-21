'use client'
import styles from '@/css/Resume.module.css'
import Image from 'next/image'
import Button from "@/components/Button";

export default function Resume({
    photoSrc,
    postName,
    workerBio,
    workerName,
    workerTitle,
    messangerUrl,
}) {

    function resend() {
        const url = window.location.href

        navigator.share({url: url})
    }

    function intoMessanger() {
        window.location.href = messangerUrl
    }

    return (
        <div className={styles.container}>
            <div className={styles.about}>
                <h1>{postName}</h1>

                <div className={styles.bio}>
                    {workerBio}
                </div>

                <div className={styles.contact_buttons}>
                    <Button onClick={intoMessanger}>
                        Messanger
                    </Button>

                    <Button onClick={resend}>
                        Resend
                    </Button>
                </div>
            </div>

            <div className={styles.worker}>
                <div className={styles.worker_name}>
                    {workerName}
                </div>

                <Image src={photoSrc} className={styles.worker_photo}/>
            </div>
        </div>
    )
}