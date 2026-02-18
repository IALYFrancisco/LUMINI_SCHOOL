import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import axios from 'axios'
import sitemap from 'vite-sitemap-plugin'

async function GenerateArticleRoutes() {
  try{
    let articleRoutes = []
    let response = await axios.get('https://lumini-school-api.onrender.com/article/get')
    response.data.forEach(element => { articleRoutes.push({
      path: `/article/${element.slug}/`,
      changefreq: 'weekly',
      priority: 0.8
    }) });
    return articleRoutes
  }
  catch(err){
    console.log(err)
    console.log('Error generating article routes for the sitemap file')
    return []
  }
}

// https://vite.dev/config/
export default defineConfig( async () => { 
  return {
    plugins: [
      react(),
      sitemap({
        base: 'https://luminischool.onrender.com',
        changefreq: 'weekly',
        priority: 1.0,
        urls: [
          { path: '/', changefreq: 'weekly', priority: 1.0 },
          { path: '/authentication/login', changefreq: 'weekly', priority: 0.9 },
          { path: '/authentication/register', changefreq: 'weekly', priority: 0.9 },
          ...await GenerateArticleRoutes()
        ],
        robotsTxt: "User-agent: *\nDisallow: /dashboard\n\nSitemap: https://luminischool.onrender.com/sitemap.xml"
      })
    ],
  }
})