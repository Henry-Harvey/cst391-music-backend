// Application dependencies
import { Request, Response } from "express";

import { Album } from "./app/models/Album";
import { Track } from "./app/models/Track";
import { Artist } from "./app/models/Artist";
import { MusicDAO } from "./app/database/MusicDAO";

// Create instance of an Express Application on Port 3000
const express = require("express");
const app = express();
//const port = process.env.PORT || 3000;

// Database configuration
const dbHost = "us-cdbr-east-04.cleardb.com";
//const dbPort = 3306;
const dbUsername = "ba82035eec0682";
const dbPassword = "6dee523b";

// Use the Port JSON Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// POST ROUTE at '/albums' that adds an Album and its Tracks to the database
app.post("/albums", function (req: Request, res: Response) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  console.log("In POST /albums Route with Post of " + JSON.stringify(req.body));

  if (
    !req.body.title ||
    !req.body.artist ||
    !req.body.description ||
    !req.body.year
  ) {
    res.status(400).json({ error: "Invalid Album Posted" });
  }

  let album: Album = req.body;

  let dao = new MusicDAO();
  dao.createAlbum(album, function (insertedId: any) {
    if (isNaN(insertedId)) {
      res.status(200).json({ error: "Creating Album failed" });
    } else {
      res.status(200).json({
        success: "Creating Album passed with an Album ID of " + insertedId,
      });
    }
  });
});

// GET Route at '/albums/:id' that returns the Album for an album ID from the database
app.get("/albums/:id", function (req: Request, res: Response) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  console.log("In GET /albums/:id Route for " + req.params.id);

  let dao = new MusicDAO();
  dao.readAlbumById(req.params.id, function (album: Album) {
    // Return Album as JSON
    res.json(album);
  });
});

// GET Route at '/albums/:artist' that returns all Albums for an Artist from the database
app.get(
  "/albums/search/artist/:artist",
  function (req: Request, res: Response) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    console.log("In GET /albums/:artist Route for " + req.params.artist);

    let dao = new MusicDAO();
    dao.readAlbumsByArtist(req.params.artist, function (albums: Array<Album>) {
      // Return Albums List as JSON
      res.json(albums);
    });
  }
);

// GET Route at '/albums/:description' that returns all Albums for a description from the database
app.get(
  "/albums/search/description/:description",
  function (req: Request, res: Response) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    console.log(
      "In GET /albums/search/description/:description Route for " +
        req.params.description
    );

    let dao = new MusicDAO();
    dao.readAlbumsByDescription(
      req.params.description,
      function (albums: Array<Album>) {
        // Return Albums List as JSON
        res.json(albums);
      }
    );
  }
);

// GET Route at '/albums' that returns all Albums from the database
app.get("/albums", function (req: Request, res: Response) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  console.log("In GET /albums Route");

  let dao = new MusicDAO();
  dao.readAllAlbums(function (albums: Array<Album>) {
    // Return Albums List as JSON
    res.json(albums);
  });
});

// GET Route at '/artists' that returns all Artists from the database
app.get("/artists", function (req: Request, res: Response) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  console.log("In GET /artists Route");

  let dao = new MusicDAO();
  dao.readAllArtists(function (artists: Array<Artist>) {
    // Return Artists List as JSON
    res.json(artists);
  });
});

// PUT ROUTE at '/albums' that updates an Album and its Tracks for an album ID to the database
app.put("/albums", (req: Request, res: Response) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  console.log("In PUT /albums Route for " + req.params.id);

  if (
    !req.body.id ||
    !req.body.title ||
    !req.body.artist ||
    !req.body.description ||
    !req.body.year
  ) {
    res.status(400).json({ error: "Invalid Album Posted" });
  }

  const album: Album = req.body;

  const dao = new MusicDAO();
  dao.updateAlbum(album, (affectedRows: any) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    if (affectedRows > 0) {
      res.status(200).json({
        success: "Updating Album success",
      });
    } else {
      res.status(409).json({
        success: "Updating Album fail",
      });
    }
  });
});

// DELETE ROUTE at '/albums/:id' that deletes an Album and its Tracks for an album ID to the database
app.delete("/albums/:id", function (req: Request, res: Response) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  console.log("In DELETE /albums/:id Route for " + req.params.id);

  let dao = new MusicDAO();
  dao.deleteAlbum(parseInt(req.params.id), function (affectedRows: any) {
    if (affectedRows > 0) {
      res.status(200).json({
        success: "Deleting Album success",
      });
    } else {
      res.status(409).json({
        success: "Deleting Album fail",
      });
    }
  });
});

app.listen(3000, () => {
  console.log("started");
});
