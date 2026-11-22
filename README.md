# Survey Graphs Studio: publish with login + ₹50 per report

Files: index.html, gate.js (login and payment), supabase/setup.sql, supabase/functions/payments/index.ts

## 1. Supabase (free, handles login and payment checks)
1. Sign up at supabase.com, create a project.
2. SQL Editor > paste supabase/setup.sql > Run.
3. Project Settings > API: copy the Project URL and the anon public key.
4. Authentication > URL Configuration: set Site URL to your GitHub Pages address (step 4) and add it under Redirect URLs. This makes email confirmation and password reset links work.
5. Edge Functions > Create function named `payments` > paste supabase/functions/payments/index.ts > Deploy.
6. Edge Functions > Secrets: add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET (never put the secret in any file).

## 2. Razorpay
1. Create an account at razorpay.com. Start in Test Mode: Settings > API Keys > generate keys (test card details are in Razorpay docs).
2. For real money, complete KYC to activate Live Mode, generate Live keys, and update the secrets in step 1.6 and RZP_KEY below. Razorpay charges a fee of about 2% per payment.

## 3. Edit gate.js (first lines)
Paste SB_URL, SB_KEY (anon key) and RZP_KEY (Key ID only). Admin email is already nithish2577@gmail.com: register with it and confirm the email; it then has unlimited free use.

## 4. GitHub Pages
1. github.com > New repository (public) > Add file > Upload files: upload index.html and gate.js.
2. Settings > Pages > Source: Deploy from branch > main / root > Save.
3. After a minute your app is at https://YOUR-NAME.github.io/REPO-NAME/ (use this in step 1.4).

## Flow
Home is open to all. Choosing the Excel file needs login and a ₹50 payment. Each payment is one report; the paid credit is used when the file is chosen. Changing the file shows a warning and needs a new payment. After the Word download the session ends.

## Honest limit
Payments and credits are checked on the server. But the Word file is made in the visitor's browser, so a technically skilled person could edit the page's code to bypass the lock. This stops ordinary users, not determined hackers.
