# Inquiry security

The contact page accepts a general inquiry. It does not book a consultation, open a file, or publish a business email, phone number, or address.

## Data flow

1. The browser checks the same rules as the server and shows field errors before a request when those rules fail.
2. The server action reads the form, hashes the client address for rate limiting, and validates it with Zod.
3. Sensitive patterns and a filled `companyWebsite` field stop the request. The inquiry text is not written to a log.
4. When Resend is fully configured, the server sends one plain-text message and reports success only after Resend accepts it.
5. When Resend is not fully configured, the server validates the inquiry and tells the visitor it was not sent. The business is not contacted.

The application does not store inquiries in a database.

## Fields

Collected: full name, email or phone, preferred contact method, preferred language for a reply, service group, an optional note of up to 500 characters, and a privacy acknowledgement.

Not collected: social insurance numbers, government passwords, passport copies, tax returns, bank statements, payment cards, immigration documents, or files. The preferred language is a reply preference. It is not a consultation language. The service group does not request that work.

## Processor

[Resend](https://resend.com) is the delivery provider, called over HTTPS from the server. No email SDK is installed. The application does not use a booking calendar.

Development mode is the default. It is used whenever `RESEND_API_KEY`, `INQUIRY_FROM_EMAIL`, or `INQUIRY_TO_EMAIL` is missing or not an email address. Development mode must stay in place until a privacy notice is approved.

## Security controls

- Server-side Zod validation, with the same schema used for the client check
- Length ceilings and removal of control characters
- Rejection of sensitive phrases, a social-insurance shape, and a payment-card number
- Honeypot field `companyWebsite`, which must stay empty
- Eight requests per client hash in ten minutes
- Secrets only in environment variables
- Delivery failure is reported as not sent, and the provider response body is not logged
- Inquiry contents are not sent to analytics. The measurement plan in [MEASUREMENT.md](MEASUREMENT.md) is disabled. A future success event may carry only a locale, a coarse screen size, and a service group id.

## Retention

The application keeps no inquiry record. In development mode, nothing is delivered. When Resend is enabled, the message exists in the receiving mailbox. The business must choose how long that mailbox keeps it. That choice is not configured here.

## Privacy review still required

No privacy notice is approved. The acknowledgement on the form says that, and it asks the person not to include sensitive documents. Do not enable Resend until the business approves a privacy notice, a retention period, and the address that receives inquiries.

## Environment

See `.env.example`. Copy it to `.env.local` only on a machine that will actually send mail. Do not commit `.env.local`.
