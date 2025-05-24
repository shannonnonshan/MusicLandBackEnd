import Song from "../models/song.model";

export default {
    addSongToPlaylist(id, playlistId){
        return Song.findByIdAndUpdate(id, {playlistId: playlistId})
    },
    removeSongFromPlaylist(id){
        return Song.findByIdAndUpdate(id, {playlistId: null});
    }
};