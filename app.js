const exp = require("constants");
const express = require("express");
const https = require("https");

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) => {
    const id = Number(req.body.pokemon);
    const url = "https://pokeapi.co/api/v2/pokemon/" + id;
    console.log(url);
    const pokeImg = "https://pokeres.bastionbot.org/images/pokemon/" + id + ".png";

    https.get(url, function (response) {
        var responseData = "";

        response.on("data", function (dataChunk) {
            responseData += dataChunk;
        });

        response.on("end", function () {
            var pokeInfo = JSON.parse(responseData);
            var pokemonName = pokeInfo.name;
            var pokeType = pokeInfo.types[0].type.name;

            res.write("<h1>The Pokemon You Search Is Called: " + pokemonName + "</h1>");
            res.write("<img src=" + pokeImg + ">")
            res.write("<h3> The main type of the pokemon: " + pokeType + "</h3>")
            res.send();
        })
    })
})