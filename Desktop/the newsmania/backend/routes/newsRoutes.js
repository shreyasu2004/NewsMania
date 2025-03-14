const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const router = express.Router();

// Times of India (via API)
const NEWS_API_KEY = process.env.NEWS_API_KEY;

router.get('/toi', async (req, res) => {
    try {
        const response = await axios.get(
            `https://newsapi.org/v2/top-headlines?sources=the-times-of-india&apiKey=${NEWS_API_KEY}`
        );
        res.json(response.data.articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Hindustan Times (via scraping)
router.get('/ht', async (req, res) => {
    try {
        const response = await axios.get('https://www.hindustantimes.com/');
        const $ = cheerio.load(response.data);

        let articles = [];

        $('.headingfour a').each((index, element) => {
            let title = $(element).text().trim();
            let link = $(element).attr('href');
            articles.push({ title, link });
        });

        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Vijay Karnataka (via scraping)
router.get('/vk', async (req, res) => {
    try {
        const response = await axios.get('https://vijaykarnataka.com/');
        const $ = cheerio.load(response.data);

        let articles = [];

        $('.news-card-title a').each((index, element) => {
            let title = $(element).text().trim();
            let link = $(element).attr('href');
            articles.push({ title, link });
        });

        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// New Indian Express (via scraping)
router.get('/nie', async (req, res) => {
    try {
        // const response = await axios.get('https://www.newindianexpress.com/');
        const $ = cheerio.load(response.data);
        const response = await axios.get(
            `https://newsapi.org/v2/everything?q=india&apiKey=${NEWS_API_KEY}`
        );
        
        let articles = [];

        $('.other-story-card a').each((index, element) => {
            let title = $(element).text().trim();
            let link = $(element).attr('href');
            articles.push({ title, link });
        });

        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
