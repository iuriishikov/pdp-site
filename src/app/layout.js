import Wrapper from '@/components/Wrapper'

export const metadata = {
  title: 'PDP (Performance Development Partners)',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Wrapper>
            {children}
        </Wrapper>
      </body>
    </html>
  )
}
