import express from 'express';
import songService from '../services/song.service';
const route = express.Router();

route.post('/addSongToPlaylist', async function(req, res) {
    const {id, playlistid} = req.body;
    await songService.addSongToPlaylist(id, playlistid);
    res.status(200).json({ message: 'Song added to playlist successfully' });
})

route.post('/');
export default route;