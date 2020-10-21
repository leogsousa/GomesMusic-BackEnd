import express from "express";
import { MusicController } from "../controller/MusicController";
import { PlaylistController } from "../controller/PlaylistController";

export const playlistRouter = express.Router();

const playlistController = new PlaylistController();

playlistRouter.post("/create", playlistController.createPlaylist);
playlistRouter.post("/addMusicToPlaylist", playlistController.addMusicToPlaylist);