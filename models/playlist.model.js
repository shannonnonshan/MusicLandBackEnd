import { mongoose } from '../utils/db.js';

const { Schema, model } = mongoose;

const PlaylistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  // description: {
  //   type: String,
  // },
  coverImage: {
    type: String,
  },
  songs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Song', 
    }
  ],
  deviceId: {
    type: String,
    required: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { collection: 'Playlist' });

const Playlist = model('Playlist', PlaylistSchema);

export { Playlist };
