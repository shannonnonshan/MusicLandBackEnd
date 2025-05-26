import Playlist from "../models/playlist.model.js";
export default {
    async addNewPlaylist(entity){
    return await Playlist.create(entity);
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