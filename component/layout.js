import HeaderIndex from './header/indexheader';
import FooterIndex from './footer/indexfooter';
import Head from 'next/head';


function Layout({ children }) {
    return (
        <>
            <Head>
                <link rel="stylesheet" href="/css/awesomefont.css" />
                <link rel="stylesheet" href="/css/bootstrap.css" />
                <link rel="stylesheet" href="/css/custom.css" />
            </Head>


            <div className="headerpart"><HeaderIndex /></div>
            <div className="bodypart"> {children}</div>
            <div className="footerpart">  <FooterIndex /></div>


        </>
    )
}

export default Layout;
