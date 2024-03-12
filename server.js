// import express, { NextFunction, response } from "express";
const express = require("express");
const { scrape } = require("./scraper");

const app = express();

app.get("/:query", async (request, response) => {
    const q = request.params.query;
    const r = await scrape(q);
    response.json(r)
})

app.listen(3000, () => {
    console.log("Listeninig on port 3000");
});