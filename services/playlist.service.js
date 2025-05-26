import Playlist from "../models/playlist.model.js";
export default {
    addNewPlaylist(entity){
        const playlist = new Playlist(entity);
        return playlist.save();
        },
    getPlaylist(id){
        return Playlist.findById(id);
    },
    getLatestPlaylists() {
        return Playlist.find().sort({ createdAt: -1 }).limit(3);
    },
    deletePlaylist(id){
        return Playlist.findByIdAndDelete(id);
    },
    addSongToPlaylist(id, songId){
         return Playlist.findByIdAndUpdate(
            id,
            { $addToSet: { songs: { $each: songId } } },
            { new: true }
        );
    }
}