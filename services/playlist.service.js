import Playlist from "../models/playlist.model";

export default {
    addNewPlaylist(entity){
        return Playlist.add(entity);
    },
    getPlaylist(id){
        return Playlist.findById(id);
    },
    getLatestPlaylists() {
        return Playlist.find().sort({ createdAt: -1 }).limit(3);
    },

    deletePlaylist(id){
        return Playlist.findByIdAndDelete(id);
    }
}