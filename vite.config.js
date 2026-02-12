// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],
//   base:"/real-estate",  
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Yahan hai wo Smart Logic:
  // Agar GitHub (production) hai -> toh '/real-estate/' lega
  // Agar Local computer hai -> toh '/' lega
  base: mode === 'production' ? '/real-estate/' : '/',
}))