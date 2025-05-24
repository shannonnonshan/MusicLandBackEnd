
import playlistRoute from '../routes/playlist.route.js';
import songRoute from '../routes/song.route.js';
import playlistService from '../services/playlist.service.js';
export default function (app) {
    app.get('/api/home', async function(req, res){
        const playlists = playlistService.getLatestPlaylists();
        const playlistsWithCount = await Promise.all(
                playlists.map(async (playlist) => {
                    const countSong = await Song.countDocuments({ playlistId: playlist._id });

                    return {
                    ...playlist.toObject(),
                    countSong,
                    };
                })
            );
        res.json(playlistsWithCount);
    })
    app.use('/api/playlist', playlistRoute);
    app.use('/api/song',songRoute);
}

