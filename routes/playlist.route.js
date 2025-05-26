import express from 'express';
import playlistService from '../services/playlist.service.js';
import multer from 'multer';
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
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads'); // thư mục bạn muốn lưu
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });
route.post('/create', upload.single('image'), async function(req, res) {
    const {name, description} = req.body;
    const image = req.file ? req.file.filename : null;
    const entity = {
        name,
        description,
        coverImage: image
    }
     try {
        await playlistService.addNewPlaylist(entity);
        res.status(201).json({ message: 'Playlist created successfully', data: entity });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong', details: error.message });
    }
})

route.get('/detailPlaylist', async function(req, res) {
    const {id} = req.query;
    const playlist = await playlistService.getPlaylist(id);
    res.json(playlist.songs);
})


export default route;