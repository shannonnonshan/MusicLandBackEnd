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
            { $addToSet: { songs: { $each: [songId] } } },
            { new: true }
        );
    },
    removeSongFromPlaylist(id, songId) {
    return Playlist.findByIdAndUpdate(
        id,
        { $pull: { songs: songId } },
        { new: true }
    );
    },
    async getSuggestions(deviceId,query, limit = 10) {
    if (!query) return [];
    try {
        const suggestions = await Playlist.find({
        createBy: deviceId, 
        name: { $regex: query, $options: 'i' }, 
        })
        .limit(limit)
        .select('name coverImage songs')
        const result = suggestions.map((playlist) => ({
        ...playlist.toObject(), // hoặc .lean() ở trên thay vì toObject()
        countSong: playlist.songs.length,
        }));
        return result;
    } catch (error) {
        console.error('Error while fetching suggestions:', error);
        return [];
    }
        
    },
    updatePlaylist(id, entity) {
        return Playlist.findByIdAndUpdate(id, entity);
    }
}