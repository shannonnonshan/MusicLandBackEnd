import express from 'express';
import playlistService from '../services/playlist.service.js';
import multer from 'multer';
import Playlist from '../models/playlist.model.js';
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
    const {name, deviceId} = req.body;
    const image = '/uploads/' + req.file.filename;

    const entity = {
        name: name,
        createBy: deviceId,
        coverImage: image
    }
     try {
        await playlistService.addNewPlaylist(entity);
        res.status(201).json({ message: 'Playlist created successfully', data: entity });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong', details: error.message });
        console.error('[Create Playlist Error]', error);
    }
})
route.post('/update', upload.single('image'), async function(req, res) {
    const {playlistId, name} = req.body;
    const image = '/uploads/' + req.file.filename;
    const entity = {
        name: name,
        coverImage: image
    }
     try {
        await playlistService.updatePlaylist(playlistId,entity);
        res.status(201).json({ message: 'Playlist updated successfully', data: entity });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong', details: error.message });
        console.error('[Update Playlist Error]', error);
    }
})
route.get('/getPlaylists', async function(req, res) {
    const {deviceId} = req.query;
    const playlist = await Playlist.find({createBy: deviceId}).lean();
    const playlistsWithCount = playlist.map(playlist => {
        const count = Array.isArray(playlist.songs) ? playlist.songs.length : 0;
        return { ...playlist, countSong: count };
    });
    res.json(playlistsWithCount);
})
route.get('/getPlaylistTracks', async function(req, res) {
    const {playlistId} = req.query;
    const playlist = await playlistService.getPlaylist(playlistId).lean();
    res.json(playlist);
})

route.post('/addSongToPlaylist', async function(req, res) {
    const {playlistId, songIds} = req.body;
     try {
        await playlistService.addSongToPlaylist(playlistId, songIds);
        res.status(201).json({ message: 'Add Song to Playlist successfully'});
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong', details: error.message });
        console.error('[Create Playlist Error]', error);
    }
    
})
route.post('/deleteSongInPlaylist', async function(req, res) {
    const {playlistId, songIds} = req.body;
     try {
        await playlistService.removeSongFromPlaylist(playlistId, songIds);
        res.status(201).json({ message: 'Delete Song In Playlist successfully'});
        console.log('Delete Success')
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong', details: error.message });
        console.error('[Delete Playlist Error]', error);
    }
    
})
route.get('/search', async (req, res) => {
  const { query,limit, deviceId } = req.query;
  if (!deviceId) return res.status(400).json({ error: 'Missing deviceId' });

  const results = await playlistService.getSuggestions(deviceId, query, limit);
  res.json(results);
});



export default route;