import { mongoose } from '../utils/db.js';

const { Schema, model } = mongoose;

const PlaylistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  coverImage: String,
  songs: {type: [String], default: []},
  createBy: {
    type: String,
    required: true,
  },
}, {
  collection: 'Playlist',
  timestamps: true, 
});


const Playlist = model('Playlist', PlaylistSchema);

export default Playlist;
