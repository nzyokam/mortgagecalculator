import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  theme: {
    fontSize: {
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      base: ["16px", "19.5px"],
      lg: ["18px", "21.94px"],
      xl: ["20px", "24.38px"],
      "2xl": ["24px", "29.26px"],
      "3xl": ["38px", "50px"],
      "4xl": ["48px", "58px"],
      "6xl": ["70px", "90px"],
      "8xl": ["106px", "126px"],
    },
    extend: {
      screens: {
        xs: "344px",
        ms:"390px",
        sm: "430px",
        md: "768px",
        lg: "1280px",
        xl: "1366px",
        "2xl": "1536px",
      },

      backgroundImage: {
       
      },
    },
  },
  plugins: [react()],
})
