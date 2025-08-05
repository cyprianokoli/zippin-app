\# Zippin App – Developer Documentation



\## 1. Overview

Zippin is a scooter rental app for small Canadian cities like Camrose, Alberta.  

It provides a simple, affordable, eco-friendly scooter-sharing experience.



\*\*Tech Stack:\*\*

\- React Native (Expo)

\- React Navigation (Drawer + Stack)

\- AsyncStorage (local data persistence)

\- Context API (global wallet state)



\*\*Current Phase:\*\* Phase 2 – Wallet, Ride Summary, Transaction History.



---



\## 2. Features \& Status

\### ✅ Completed

\- \*\*Live Map\*\*

&nbsp; - Simulated scooters near user location.

&nbsp; - Battery % display for each scooter.

&nbsp; - Shows current user location.

\- \*\*Ride Tracking\*\*

&nbsp; - Start ride by tapping scooter.

&nbsp; - Timer + distance tracking.

&nbsp; - Ride cost calculation (unlock fee + per minute).

&nbsp; - CO₂ saved estimation.

\- \*\*Wallet System\*\*

&nbsp; - Persistent wallet balance (AsyncStorage).

&nbsp; - Add funds (+$5 button).

&nbsp; - Deduct ride cost automatically.

\- \*\*Transaction History\*\*

&nbsp; - Uber-style recent transactions.

&nbsp; - Click for full Transaction Details.

\- \*\*Ride Summary\*\*

&nbsp; - Displays ride stats after ride ends.

&nbsp; - Navigate to Transaction Details.



\### 🔜 In Progress / Planned

\- QR scan simulation before unlocking.

\- “Locate Me” button on map.

\- More realistic scooter simulation.

\- Real backend + payment integration.



---



\## 3. Navigation Structure

MainNavigator (Stack)

│

├── DrawerNavigator

│ ├── Home → MapScreen

│ └── Wallet → WalletScreen

│

├── RideSummary → RideSummaryScreen

└── TransactionDetails → TransactionDetailsScreen





---



\## 4. File \& Folder Map



\### \*\*Screens\*\*

| File | Purpose |

|------|---------|

| `/screens/MapScreen.tsx` | Live map, ride start/end logic, wallet deduction, navigate to Ride Summary |

| `/screens/WalletScreen.tsx` | Wallet balance, recent transactions, add funds |

| `/screens/TransactionDetailsScreen.tsx` | Detailed breakdown of ride or top-up |

| `/screens/RideSummaryScreen.tsx` | Ride completion summary, link to Transaction Details |

| `/screens/QRScannerSim.tsx` | Placeholder for future QR scan unlock |

| `/screens/ProfileScreen.tsx` | Placeholder for user profile |



\### \*\*Navigation\*\*

| File | Purpose |

|------|---------|

| `/navigation/SideMenu.tsx` | Drawer menu UI |

| `/navigation/BottomTabs.tsx` | (Planned) Tab navigation |



\### \*\*Context\*\*

| File | Purpose |

|------|---------|

| `/context/WalletContext.tsx` | Global wallet state, AsyncStorage persistence, add/deduct funds |



\### \*\*Assets\*\*

\- `/assets/logo.png` → Zippin logo

\- `/assets/scooter-icon.png` → Scooter marker icon

\- `/assets/adaptive-icon.png`, `/assets/icon.png`, `/assets/favicon.png` → App icons



---



\## 5. Key Functions \& Logic



\### \*\*MapScreen.tsx\*\*

```ts

startRide() {

&nbsp; if (balance < unlockFee) {

&nbsp;   alert("Not enough funds.");

&nbsp;   return;

&nbsp; }

&nbsp; setActiveRide(true);

&nbsp; setRideTime(0);

&nbsp; setRideDistance(0);

&nbsp; rideTimer.current = setInterval(...);

}



endRide() {

&nbsp; clearInterval(rideTimer.current);

&nbsp; const rideCost = unlockFee + totalMinutes \* perMinuteRate;

&nbsp; deductFunds(rideCost, transactionDetails);

&nbsp; navigation.navigate("RideSummary", { transaction: transactionDetails });

}



6\. How to Edit

Brand Colors

Purple: #7B2CBF



Black: #000000



White: #FFFFFF

Edit in:



/screens/MapScreen.tsx (UI buttons, top bar)



/navigation/SideMenu.tsx (menu background)



Logo

Replace /assets/logo.png with your desired logo.



Ride Cost Formula

In /screens/MapScreen.tsx inside endRide():



ts

Copy

Edit

const rideCost = unlockFee + totalMinutes \* perMinuteRate;

7\. Deployment \& Development Workflow

Run locally

sh

Copy

Edit

npx expo start

Push changes to GitHub

sh

Copy

Edit

git add .

git commit -m "Message"

git push

Using GitHub Codespaces (edit from phone)

Go to your repo → Code → Codespaces → Create codespace.



Edit files in browser.



Commit + push.



In Codespaces terminal, run:



sh

Copy

Edit

npx expo start

Open QR link in Expo Go on your phone.



8\. Troubleshooting

Problem	Solution

Navigation error: screen not found	Check App.tsx for correct Stack.Screen names

Wallet not updating	Verify deductFunds() or addFunds() call in WalletContext

Merge conflicts when pushing	git pull origin main --allow-unrelated-histories then resolve

Expo Go can’t load app	Restart Expo: npx expo start -c



9\. Next Steps

Add QR unlock simulation before starting ride.



Add “Locate Me” button.



Improve scooter placement realism.



Integrate backend for real scooter data \& payments.

