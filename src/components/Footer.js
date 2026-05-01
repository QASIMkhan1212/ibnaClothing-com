import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="footer-logo">
            <Link href="/"><img src="/logo.png" alt="IBNA" /></Link>
          </div>
          <p className="footer-desc">Crafted in Pakistan. Built for confidence. Worn everyday.</p>
          <div className="footer-social">
            <a href="https://www.instagram.com/ibnaclothing.12/" target="_blank">IG</a>
            <a href="https://www.facebook.com/IBNAclothing.12/" target="_blank">FB</a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><Link href="/shop?cat=New In">New In</Link></li>
            <li><Link href="/shop?cat=T-Shirts">T-Shirts</Link></li>
            <li><Link href="/shop?cat=Polo">Polo</Link></li>
            <li><Link href="/shop?cat=Shirts">Shirts</Link></li>
            <li><Link href="/shop?cat=Denim">Denim</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Help</h4>
          <ul>
            <li><Link href="/sizeguide">Size Guide</Link></li>
            <li><Link href="/returns">Returns</Link></li>
            <li><Link href="/shipping">Shipping</Link></li>
            <li><Link href="/track">Track Order</Link></li>
            <li><Link href="/faqs">FAQs</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 IBNA Clothing. All rights reserved.</p>
        <p>Made with care in Pakistan 🇵🇰</p>
      </div>
    </footer>
  );
}