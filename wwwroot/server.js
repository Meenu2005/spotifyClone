//import express from 'express';
//import fetch from 'node-fetch';

//const app = express();

//app.get('/search', async (req, res) => {
//    const q = req.query.q;
//    const response = await fetch(`https://api.deezer.com/search/artist?q=${q}`);
//    const data = await response.json();
//    res.json(data);
//});

//app.listen(3000, () => console.log('Proxy running on http://localhost:3000'));
import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/api/deezer", async (req, res) => {
    const q = req.query.q;
    const apiRes = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(q)}`);
    const data = await apiRes.json();
    res.json(data); // Send it back to the browser
});

app.listen(5075, () => console.log("Server running on port 5075"));
