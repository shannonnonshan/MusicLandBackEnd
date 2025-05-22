
import playlistRoute from '../routes/playlist.route.js';
import songRoute from '../routes/song.route.js';
export default function (app) {
    app.use('/api/playlist', playlistRoute);
    app.use('/api/song',songRoute);
}

