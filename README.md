# ibnaClothing-com

## Order / Email setup

This project includes a serverless endpoint to receive orders and send confirmation emails: `/api/submit-order`.

To enable transactional emails, set the following environment variables in Vercel (or locally):

- `SMTP_HOST` - SMTP server host
- `SMTP_PORT` - SMTP port (default 587)
- `SMTP_SECURE` - `true` if using secure TLS, otherwise `false`
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password
- `SMTP_FROM` - optional from address
- `ADMIN_EMAIL` - admin notification email (defaults to info@ibnaclothing.com)

If SMTP is not configured the endpoint will still accept orders and log them to the server console but will not send emails.

Admin contact: info@ibnaclothing.com

Payment details to show on checkout:

- Easypaisa/JazzCash: 03406915833 (Nabeel Ahmad)
- Bank (Allied Bank): IBAN PK77ABPA0010077873920014 (Nabeel Ahmad)
- Delivery: Delivery all over Pakistan