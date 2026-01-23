<div align="center" dir="auto">
   <a href="https://yen2euro.vercel.app/" rel="nofollow"><img width="200" alt="logo" src="https://github.com/user-attachments/assets/f66f19d4-7fa3-4b79-a767-b2ce0c74866d"></a><br>
</div>

<h1 align="center">¥en2€uro - Convert Currencies Seamlessly</h1>

**¥en2€uro** is a sleek calculator app with built-in currency conversion. Perform arithmetic operations while instantly converting values between currencies.

🚀 **Live Demo:** [¥en2€uro](https://yen2euro.vercel.app/)

## **Features**

- **Live Currency Conversion**: Uses up-to-date exchange rates from [openexchangerates.org](https://openexchangerates.org/)
- **Progressive Web App (PWA)**: Install on your phone or desktop for a native app experience
- **Offline Support**: Works without internet using cached exchange rates
- **Persistent Settings**: Remembers your selected currencies across sessions via localStorage
- **Basic Calculator**: Supports standard arithmetic operations
- **Currency Switch Button**: Swap currencies with a single click

## **Tech Stack**

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/) + [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)
- [React Select](https://react-select.com/)
- [Open Exchange Rates API](https://openexchangerates.org/)
- [Custom CSS with BEM methodology](https://en.bem.info/methodology/)

## **Getting Started**

1. Clone the repository:

   ```sh
   git clone git@github.com:ericelric/Yen2Euro.git
   cd Yen2Euro
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file and add your Open Exchange Rates API key:

   ```sh
   VITE_OPEN_EXCHANGE_RATES_KEY=your_api_key_here
   ```

4. Start the development server:

   ```sh
   npm run dev
   ```

## Usage

1. Enter numbers and operations as usual.

2. Select source and target currencies from dropdowns.

3. View the result in your target currency in real-time.

4. Use the swap button to quickly reverse conversion direction.

5. The app stores your last-used currencies and only refetches rates if older than 6 hours.

## **Install as App**

¥en2€uro is a Progressive Web App that can be installed on your device:

- **Desktop (Chrome/Edge)**: Click the install icon in the address bar
- **iOS**: Tap Share → "Add to Home Screen"
- **Android**: Tap the browser menu → "Install app" or "Add to Home Screen"

Once installed, the app works offline using cached exchange rates.

## **Screenshot**
![pixel mockup yen](https://github.com/user-attachments/assets/538b5a19-66b4-416a-b014-a6d67d049665)

---

¥en2€uro - Convert Currencies Seamlessly<br>
Licensed under the MIT License. See LICENSE file for details.
