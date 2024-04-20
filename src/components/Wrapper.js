import styles from '@/css/Wrapper.module.css'

function Header() {

}

function Footer() {

}

export default function Wrapper({children}) {
    return (
        <div className={styles.container}>
            <Header />

            {children}

            <Footer />
        </div>
    )
}