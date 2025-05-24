import { mongoose } from '../utils/db.js';

const { Schema, model } = mongoose;

const PlaylistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  coverImage: String,
  deviceId: {
    type: String,
    required: true,
  },
}, {
  collection: 'Playlist',
  timestamps: true, 
});


const Playlist = model('Playlist', PlaylistSchema);

export default Playlist;
