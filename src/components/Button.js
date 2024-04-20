'use client'
import styles from '@/css/Button.module.css'


export default function Button({children, disabled=false, onClick, style, ...props}) {

    return (
        <div data-disabled={disabled.toString()} onClick={onClick} className={styles.root} style={style}>
            <div className={styles.shadow} />

            <button style={style} className={styles.button}>
                {children}
            </button>
        </div>
    )
}