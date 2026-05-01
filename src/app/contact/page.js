'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function ContactPage() {
  const { showToast } = useCart();

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast("Message sent! We'll reply shortly.");
    e.target.reset();
  };

  return (
    <div>
      <div className="page-hero"><h1>Contact Us</h1><p>We're here to help</p></div>
      <div className="breadcrumb">
        <Link href="/"><span>Home</span></Link>
        <span className="sep">/</span><span>Contact</span>
      </div>
      <div className="contact-layout">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Have a question about sizing, an order, or just want to say hello? We'd love to hear from you. We typically respond within 24 hours.</p>
          <div className="contact-detail">
            <div className="contact-item">
              <span className="contact-icon">📱</span>
              <div className="contact-item-text">
                <strong>WhatsApp</strong>
                <span>+92 300 0000000<br />Mon–Sat, 10am–8pm</span>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📸</span>
              <div className="contact-item-text">
                <strong>Instagram</strong>
                <span><a href="https://www.instagram.com/ibnaclothing.12/" target="_blank" rel="noopener" style={{color:'var(--gray-mid)'}}>@ibnaclothing.12</a></span>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📘</span>
              <div className="contact-item-text">
                <strong>Facebook</strong>
                <span><a href="https://www.facebook.com/IBNAclothing.12/" target="_blank" rel="noopener" style={{color:'var(--gray-mid)'}}>IBNA Clothing</a></span>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div className="contact-item-text">
                <strong>Location</strong>
                <span>Karachi, Pakistan</span>
              </div>
            </div>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send a Message</h2>
          <div className="form-group"><label>Your Name</label><input type="text" placeholder="Muhammad Ahmed" required /></div>
          <div className="form-group"><label>Email</label><input type="email" placeholder="you@example.com" required /></div>
          <div className="form-group">
            <label>Subject</label>
            <select>
              <option>Order Enquiry</option>
              <option>Returns &amp; Exchanges</option>
              <option>Product Question</option>
              <option>Wholesale</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group"><label>Message</label><textarea rows="5" placeholder="How can we help you?" required></textarea></div>
          <button type="submit" className="form-submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}