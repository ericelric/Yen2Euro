<div align="center" dir="auto">
   <a href="https://yen2euro.vercel.app/" rel="nofollow"><img width="200" alt="logo" src="https://github.com/user-attachments/assets/f66f19d4-7fa3-4b79-a767-b2ce0c74866d"></a><br>
</div>

<h1 align="center">¥en2€uro - Convert Currencies Seamlessly</h1>

**¥en2€uro** is a sleek calculator app with built-in currency conversion. Perform arithmetic operations while instantly converting values between currencies.

🚀 **Live Demo:** [¥en2€uro](https://yen2euro.vercel.app/)

## **Features**

- **Live Currency Conversion**: Uses up-to-date exchange rates from [openexchangerates.org](https://openexchangerates.org/)
- **Persistent Settings**: Remembers your selected currencies across sessions via localStorage
- **Basic Calculator**: Supports standard arithmetic operations
- **Currency Switch Button**: Swap currencies with a single click

## **Tech Stack**

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
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

3. Create a .env file and add your Open Exchange Rates API key:

   ```sh
   VITE_EXCHANGE_RATES_API_KEY=your_api_key_here
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


## **Screenshot**


---

¥en2€uro - Convert Currencies Seamlessly<br>
Licensed under the MIT License. See LICENSE file for details.
