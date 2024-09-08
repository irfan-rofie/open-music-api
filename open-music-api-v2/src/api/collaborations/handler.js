const autoBind = require('auto-bind');

class CollaborationsHandler {
  constructor(collaborationsService, playlistsService, usersService, validator) {
    this._collaborationsService = collaborationsService;
    this._playlistService = playlistsService;
    this._usersService = usersService;
    this._validator = validator;

    autoBind(this);
  }

  async postCollaborationHandler(request, h) {
    this._validator.validatePostCollaborationPayload(request.payload);
    const { playlistId, userId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistService.verifyPlaylistOwner(playlistId, credentialId);
    await this._usersService.verifyUserById(userId);
    // eslint-disable-next-line max-len
    const collaborationId = await this._collaborationsService.postCollaboration({ playlistId, userId });

    const response = h.response({
      status: 'success',
      message: 'Collaboration berhasil ditambahkan',
      data: {
        collaborationId,
      },
    });
    response.code(201);
    return response;
  }

  // eslint-disable-next-line no-unused-vars
  async deleteCollaborationHandler(request, h) {
    this._validator.validateDeleteCollaborationPayload(request.payload);
    const { playlistId, userId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistService.verifyPlaylistOwner(playlistId, credentialId);
    await this._collaborationsService.deleteCollaboration({ playlistId, userId });

    return {
      status: 'success',
      message: 'Collaboration song berhasil dihapus',
    };
  }
}

module.exports = CollaborationsHandler;
