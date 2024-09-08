const InvariantError = require('../../exceptions/InvariantError');
const {
  PostPlaylistsPayloadSchema,
  PostSongsPlaylistsPayloadSchema,
  DeleteSongsPlaylistsPayloadSchema,
} = require('./schema');

const PlaylistsValidator = {
  validatePlaylistsPayload: (payload) => {
    const validationResult = PostPlaylistsPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateSongsPlaylistsPayload: (payload) => {
    const validationResult = PostSongsPlaylistsPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateDeleteSongsPlaylistsPayload: (payload) => {
    const validationResult = DeleteSongsPlaylistsPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PlaylistsValidator;
