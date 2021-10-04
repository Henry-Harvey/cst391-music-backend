// Application dependencies
import { Request, Response } from "express";

import { Color } from "./app/models/Color";
import { ColorDAO } from "./app/database/ColorDAO";

// Create instance of an Express Application on Port 3000
const express = require("express");
const app = express();
const port = 3000;

// Database configuration
const dbHost = "localhost";
const dbPort = 3306;
const dbUsername = "root";
const dbPassword = "root";

// Use the Port JSON Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// GET Route at '/' that returns a test string
app.get("/", function (req: Request, res: Response) {
  console.log("In GET / Route");
  // res.json("Express Color Index Test");
  res.send("Express Color Index Test");
});

// POST ROUTE at '/colors' that adds a Color to the database
app.post("/colors", function (req: Request, res: Response) {
  console.log("In POST /colors Route with Post of " + JSON.stringify(req.body));

  if (!req.body.name || !req.body.hex) {
    res.status(400).json({ error: "Invalid Color Posted" });
  }

  let color: Color = req.body;
  color.timestamp = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  let dao = new ColorDAO();
  dao.createColor(color, function (color: any) {
    if (isNaN(color.id)) {
      res.status(200).json({ error: "Creating Color failed" });
    } else {
      res.json(color);
    }
  });
});

// GET Route at '/colors/:id' that returns the Color for a color ID from the database
app.get("/colors/:id", function (req: Request, res: Response) {
  console.log("In GET /colors/:id Route for " + req.params.id);

  let dao = new ColorDAO();
  dao.readColor(req.params.id, function (color: Color) {
    res.json(color);
  });
});

// GET Route at '/colors' that returns all Colors from the database
app.get("/colors", function (req: Request, res: Response) {
  console.log("In GET /colors Route");

  let dao = new ColorDAO();
  dao.readAllColors(function (colors: Array<Color>) {
    res.json(colors);
  });
});

// PATCH ROUTE at '/colors' that updates a Color for a color ID to the database
app.patch("/colors", (req: Request, res: Response) => {
  console.log("In PUT /colors/:id Route for " + req.params.id);

  if (!req.body.id || !req.body.name || !req.body.hex) {
    res.status(400).json({ error: "Invalid Color Posted" });
  }

  const color: Color = req.body;
  color.timestamp = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  const dao = new ColorDAO();
  dao.updateColor(color, (affectedRows: any) => {
    if (affectedRows > 0) {
      res.status(200).json({
        success: "Updating Color success",
      });
    } else {
      res.status(409).json({
        success: "Updating Color fail",
      });
    }
  });
});

// DELETE ROUTE at '/colors/:id' that deletes a Color for a color ID to the database
app.delete("/colors/:id", function (req: Request, res: Response) {
  console.log("In DELETE /colors/:id Route for " + req.params.id);

  let dao = new ColorDAO();
  dao.deleteColor(req.params.id, function (affectedRows: any) {
    if (affectedRows > 0) {
      res.status(200).json({
        success: "Deleting Color success",
      });
    } else {
      res.status(409).json({
        success: "Deleting Color fail",
      });
    }
  });
});

app.listen(process.env.PORT, () => {
    console.log(server started on port ${process.env.PORT})
});
