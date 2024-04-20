import styles from '@/css/Input.module.css'
import TextareaAutosize from 'react-textarea-autosize';


export default function Input({onChange, value, placeholder, multiStrokes=false}) {
    return (
        <div className={styles.container}>
            {multiStrokes ? (
                <TextareaAutosize value={value} placeholder={placeholder} onChange={onChange} className={styles.native_input}/>
            ) : (
                <input value={value} placeholder={placeholder} onChange={onChange} className={styles.native_input}/>
            )}
        </div>
    )
}