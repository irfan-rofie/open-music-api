/* eslint-disable no-unused-vars */
const autoBind = require('auto-bind');

class PlaylistsHandler {
  constructor(playlistsService, songsService, validator) {
    this._playlistsService = playlistsService;
    this._songsService = songsService;
    this._validator = validator;

    autoBind(this);
  }

  async postPlaylistHandler(request, h) {
    this._validator.validatePlaylistsPayload(request.payload);
    const { name } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    const playlistId = await this._playlistsService.addPlaylist({ name, owner: credentialId });

    const response = h.response({
      status: 'success',
      message: 'Playlist berhasil ditambahkan',
      data: {
        playlistId,
      },
    });
    response.code(201);
    return response;
  }

  async getPlaylistsHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;

    const playlists = await this._playlistsService.getPlaylists({ owner: credentialId });

    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  async deletePlaylistHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistOwner(id, credentialId);
    await this._playlistsService.deletePlaylists(id);

    return {
      status: 'success',
      message: 'Playlist berhasil dihapus',
    };
  }

  async postSongPlaylistHandler(request, h) {
    this._validator.validateSongsPlaylistsPayload(request.payload);
    const { songId } = request.payload;
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._songsService.getSongById(songId);
    await this._playlistsService.verifyPlaylistAccess(id, credentialId);
    await this._playlistsService.addPlaylistSong(id, songId);
    await this._playlistsService.addPlaylistActivities({
      playlistId: id, songId, userId: credentialId, action: 'add',
    });

    const response = h.response({
      status: 'success',
      message: 'Playlist song berhasil ditambahkan',
    });
    response.code(201);
    return response;
  }

  async getSongPlaylistsHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(id, credentialId);
    const playlist = await this._playlistsService.getPlaylistSongs(id);

    return {
      status: 'success',
      data: {
        playlist,
      },
    };
  }

  async deleteSongPlaylistHandler(request, h) {
    this._validator.validateDeleteSongsPlaylistsPayload(request.payload);
    const { id } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._songsService.getSongById(songId);
    await this._playlistsService.verifyPlaylistAccess(id, credentialId);
    await this._playlistsService.addPlaylistActivities({
      playlistId: id, songId, userId: credentialId, action: 'delete',
    });
    await this._playlistsService.deletePlaylistSong(id, songId);

    return {
      status: 'success',
      message: 'Playlist song berhasil dihapus',
    };
  }

  async getActivitiesPlaylistsHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(id, credentialId);
    const playlistActivities = await this._playlistsService.getPlaylistsActivities(id);

    return {
      status: 'success',
      data: playlistActivities,
    };
  }
}

module.exports = PlaylistsHandler;
