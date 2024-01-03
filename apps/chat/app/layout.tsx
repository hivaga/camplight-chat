import './global.css';
import Header from '../components/header/header';

export const metadata = {
  title: 'Camplight Chat',
  description: 'Next JS chat application'
};

export default function RootLayout({children}: { children: React.ReactNode; }) {

  //TODO: find efficient way to reset server temporary store
  //TODO: find out efficient way to clean next js cache

  return (
    //TODO: find out why we have this error
    <html lang="en" suppressHydrationWarning={true}>
    <body>
    <div className={'animated-background'}></div>
    <div className={'main-content'}>
      <Header/>
      {children}
    </div>
    </body>
    </html>
  );
}
