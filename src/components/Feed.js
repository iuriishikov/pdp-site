'use client'
import styles from '@/css/Feed.module.css'
import ReactCurvedText from "react-curved-text";
import {useEffect, useState} from "react";
import {useIntersection, useViewportSize} from "@mantine/hooks";
import {Transition} from "@mantine/core";

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
            <Transition duration={1000} transition={'fade'} mounted={wasInViewport}>
                {(transtionStyles) =>
                    <div style={transtionStyles} className={styles.text_item}>
                        {children}
                    </div>
                }
            </Transition>
        </div>
    )
}

export default function Feed({}) {
    const {width: viewportWidth, height: viewportHeight} = useViewportSize()

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.header_item}>
                    About
                </div>

                <div className={styles.header_item}>
                    Projects
                </div>

                <div className={styles.header_item}>
                    Contact
                </div>
            </header>

            <div className={styles.top_padding} />

            <TextItem>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </TextItem>
        </div>
    )
}