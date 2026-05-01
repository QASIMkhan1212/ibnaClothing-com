import Link from 'next/link';

export const metadata = { title: 'Size Guide — IBNA Clothing' };

export default function SizeGuidePage() {
  return (
    <div>
      <div className="page-hero"><h1>Size Guide</h1><p>Find your perfect fit</p></div>
      <div className="breadcrumb">
        <Link href="/"><span>Home</span></Link>
        <span className="sep">/</span><span>Size Guide</span>
      </div>
      <div className="size-guide">
        <h3>T-Shirts &amp; Polos</h3>
        <p>Measurements are in centimeters. For the best fit, measure yourself and compare with the size chart below.</p>
        <div className="size-table-wrap">
          <table className="size-table">
            <thead>
              <tr><th>Size</th><th>Chest (cm)</th><th>Length (cm)</th><th>Shoulder (cm)</th></tr>
            </thead>
            <tbody>
              <tr><td>XS</td><td>86–91</td><td>67</td><td>41</td></tr>
              <tr><td>S</td><td>91–96</td><td>69</td><td>43</td></tr>
              <tr><td>M</td><td>96–101</td><td>71</td><td>45</td></tr>
              <tr><td>L</td><td>101–106</td><td>73</td><td>47</td></tr>
              <tr><td>XL</td><td>106–111</td><td>75</td><td>49</td></tr>
              <tr><td>XXL</td><td>111–116</td><td>77</td><td>51</td></tr>
            </tbody>
          </table>
        </div>

        <h3>Shirts</h3>
        <div className="size-table-wrap">
          <table className="size-table">
            <thead>
              <tr><th>Size</th><th>Chest (cm)</th><th>Collar (cm)</th><th>Sleeve (cm)</th></tr>
            </thead>
            <tbody>
              <tr><td>S</td><td>90–95</td><td>37–38</td><td>60</td></tr>
              <tr><td>M</td><td>95–100</td><td>39–40</td><td>62</td></tr>
              <tr><td>L</td><td>100–105</td><td>41–42</td><td>64</td></tr>
              <tr><td>XL</td><td>105–110</td><td>43–44</td><td>66</td></tr>
            </tbody>
          </table>
        </div>

        <h3>How to Measure</h3>
        <p><strong>Chest:</strong> Measure around the fullest part of your chest, keeping the tape horizontal.</p>
        <p><strong>Shoulder:</strong> Measure from shoulder seam to shoulder seam across the back.</p>
        <p><strong>Length:</strong> Measure from the highest point of the shoulder down to the hem.</p>
        <p style={{background:'var(--cream)',padding:'16px 20px',borderLeft:'3px solid var(--accent)',marginTop:16}}>
          If you are between sizes, we recommend sizing up for a relaxed fit or sizing down for a more fitted look.
        </p>
      </div>
    </div>
  );
}