import { mongoose } from '../utils/db.js';

const { Schema, model } = mongoose;

const SongSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  liked: {
    type: Boolean,
    default: false,
  },
  thumbnail: {
    type: String,
    required: false,
  },
  uri: {
    type: String,
    required: false,
  },
}, { collection: 'Song' });

const Song = model('Song', SongSchema);

export { Song };
