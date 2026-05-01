import Link from 'next/link';

export const metadata = { title: 'About Us — IBNA Clothing' };

export default function AboutPage() {
  return (
    <div>
      <div className="about-hero">
        <img src="https://res.cloudinary.com/dy4yjeeib/image/upload/v1777308110/Gemini_Generated_Image_jegh0vjegh0vjegh_onnz6j.png" alt="About IBNA" loading="lazy" />
        <div className="about-hero-content">
          <h1>About IBNA</h1>
          <p>Crafted in Pakistan. Built for confidence.</p>
        </div>
      </div>
      <div className="about-sec">
        <h2>Our Story</h2>
        <p>IBNA Clothing was born from a simple idea: that premium quality menswear shouldn't come at a premium price. Founded in Pakistan, we believe every man deserves clothing that looks good, feels great, and lasts long.</p>
        <p>We work directly with local craftsmen and carefully selected fabric mills to create pieces that balance comfort, style, and durability. Every stitch, every wash, every cut is done with intention.</p>
        <p>From our graphic tees to our summer shirts, every IBNA piece is made to move with you — whether you're heading to work, meeting friends, or just out for a walk.</p>
      </div>
      <div className="about-values">
        <div className="about-val">
          <div className="icon">🇵🇰</div>
          <h3>Made in Pakistan</h3>
          <p>Every piece is crafted locally with pride, supporting Pakistani artisans and textile workers.</p>
        </div>
        <div className="about-val">
          <div className="icon">✂️</div>
          <h3>Quality First</h3>
          <p>We use premium ring-spun cotton and carefully selected fabrics that stand the test of time.</p>
        </div>
        <div className="about-val">
          <div className="icon">💰</div>
          <h3>Fair Pricing</h3>
          <p>Premium quality doesn't need a premium price. We keep our prices accessible for everyone.</p>
        </div>
      </div>
    </div>
  );
}