import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartToast from '@/components/CartToast';

export const metadata = {
  title: 'IBNA Clothing — Premium Pakistani Menswear',
  description: 'Crafted in Pakistan. Built for confidence.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700&family=Barlow+Condensed:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          <CartToast />
          <div className="ann">
            <div className="ann-track">
              <span>Free delivery on orders over PKR 5,000 &nbsp;|&nbsp; Summer Edit Now Live &nbsp;|&nbsp; Free delivery on orders over PKR 5,000 &nbsp;|&nbsp; Summer Edit Now Live &nbsp;|&nbsp; Free delivery on orders over PKR 5,000 &nbsp;|&nbsp; Summer Edit Now Live</span>
            </div>
          </div>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}