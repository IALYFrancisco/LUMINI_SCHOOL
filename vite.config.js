import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'
import axios from 'axios'

async function GenerateArticleRoutes() {
  try{
    let articleRoutes = []
    let response = await axios.get(`http://localhost:3000/article/get`)
    response.data.forEach(element => { articleRoutes.push(`/article/${element.slug}`) });
    return articleRoutes
  }
  catch(err){
    console.log('Error generating article routes for the sitemap file')
    console.log(err)
    return
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({ 
      hostname: "http://localhost:5173",
      urls: [],
      generateRobotsTxt: true,
      robots: [ { disallow: "/dashboard", userAgent: '*' } ]
    }),
  ],
})