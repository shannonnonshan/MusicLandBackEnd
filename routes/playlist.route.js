import express from 'express';

const route = express.Router();
route.get('/', async (req, res) => {
    const playlists = [
        { id: 1, name: 'Wy Thanh' },
        { id: 2, name: 'Camstletoe' },
        { id: 3, name: 'Chesse' }
    ];
    const songs = [
        { id: 1, playlistId: 1, title: 'Song A' },
        { id: 2, playlistId: 1, title: 'Song B' },
        { id: 3, playlistId: 2, title: 'Song C' },
        { id: 4, playlistId: 3, title: 'Song D' },
        { id: 5, playlistId: 1, title: 'Song E' },
        ];
    const playlistsWithCount = playlists.map(playlist => {
    const count = songs.filter(song => song.playlistId === playlist.id).length;
    return { ...playlist, countSong: count };
    });

    res.json(playlistsWithCount);
});
export default route;