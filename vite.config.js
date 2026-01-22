import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'
import axios from 'axios'

async function GenerateArticleRoutes() {
  try{
    let articleRoutes = []
    let response = await axios.get(`https://lumini-school-api.onrender.com/article/get`)
    response.data.forEach(element => { articleRoutes.push(`/article/${element.slug}`) });
    return articleRoutes
  }
  catch{
    console.log('Error generating article routes for the sitemap file')
    return
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({ 
      hostname: "https://luminischool.onrender.com",
      dynamicRoutes: await GenerateArticleRoutes()
    }),
  ],
})