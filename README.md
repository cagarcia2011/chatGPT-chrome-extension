# ChatGPT Chrome Extension
A chrome extension chat bot using OpenAI API.

## Built With

  [![React][React.js]][React-url]
  [![Tailwindcss]][Tailwindcss-url]
  [![TypeScript]][TypeScript-url]
  [![Vite]][Vite-url]

## Getting Started

### Prerequisites 
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Create an account at [OpenAI API](https://platform.openai.com/)
2. Get an API Key at [OpenAI API-Keys](https://platform.openai.com/account/api-keys)
3. Get yout Organization ID at [OpenAI Org-Settings](https://platform.openai.com/account/org-settings)
4. Clone the repo
   ```sh
   git clone https://github.com/cagarcia2011/chatGPT-chrome-extension.git
   ```
5. Install NPM packages
   ```sh
   npm install
   ```
6. Create a .env file on the root directory and add the following
   ```
    VITE_OPENAI_SECRET=<Your OpenAI API-KEY>
    VITE_OPENAI_ORG=<Your OpenAI Organization ID>

    VITE_MODE=<production or development>
   ```
   * _Make sure to replace placeholders "<...>" with the actual values_
   * _At "development" mode you can test storage functionality using localstorage._
   * _At "production" mode it will use chrome.storage._
7. Build for production
   ```sh
    npm run build
   ```
8. Run development mode
   ```
    npm run dev
   ```
9. Load to chrome locally at [chrome://extensions/](chrome://extensions/)
    * Enable "_Developer Mode_"
    * Click on "_Load unpacked_"
    * Select the "_dist_" directory of the build

<!-- MARKDOW LINKS & IMAGES -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Tailwindcss]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwindcss-url]: https://tailwindcss.com/
[TypeScript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Vite-url]: https://vitejs.dev/
[Vite]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white