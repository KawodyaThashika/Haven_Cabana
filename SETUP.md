# Live availability + packages setup (Firebase, free)

One-time setup, ~10 minutes. After this, anything you change in Admin shows on the live site within ~1 second. No GitHub push needed.

## 1. Create the Firebase project
1. https://console.firebase.google.com → **Add project** (name: haven-cabana). Analytics: off.
2. **Build → Firestore Database → Create database** → Production mode → region `asia-south1` (Mumbai).
3. **Build → Authentication → Get started → Email/Password → Enable.**
4. **Authentication → Users → Add user** → your email + a strong password. This is your admin login.
   Copy the **User UID** shown in that row.
5. **Authentication → Settings → User actions** → untick "Enable create (sign-up)" so strangers can't register.

## 2. Security rules
Firestore → **Rules** tab → paste `firestore.rules` from this project, replace `PASTE_ADMIN_UID_HERE` with your UID → **Publish**.

## 3. Connect the site
Project settings (gear icon) → **Your apps → Web (</>)** → register app → copy the config values into `src/config/firebaseConfig.ts`.

Authentication → Settings → **Authorized domains** → add your site domain (e.g. `yourname.github.io`).

## 4. Deploy
```
npm install
git add . && git commit -m "Live availability" && git push
```
GitHub Actions builds and deploys as before.

## 5. Use it
Open `/#/admin` → sign in → **Availability**: click a date (or use the range form) to mark booked. **Packages**: edit prices → Save All. Both go live instantly.
