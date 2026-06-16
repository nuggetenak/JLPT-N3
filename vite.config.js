import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️  Change REPO_NAME to match your GitHub repo slug.
//     e.g. github.com/nuggetenak/jlpt-n3-practice → '/JLPT-N3/'
const REPO_NAME = '/JLPT-N3/'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? REPO_NAME : '/',
})
