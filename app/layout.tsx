import './globals.css';
import {site} from '@/lib/site';
import {Header,Footer,CookieBanner} from '@/components/site';
export const metadata={title:{default:'NextByte Journal — Practical AI, Ecommerce & Technology Guides',template:'%s | NextByte Journal'},description:'Practical, original guides covering AI, ecommerce, productivity, websites and digital workflows.',metadataBase:new URL(site.url)};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body><Header/>{children}<Footer/><CookieBanner/></body></html>}
