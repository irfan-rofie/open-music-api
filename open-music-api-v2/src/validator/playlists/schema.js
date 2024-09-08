const Joi = require('joi');

const PostPlaylistsPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

const PostSongsPlaylistsPayloadSchema = Joi.object({
  songId: Joi.string().required(),
});

const DeleteSongsPlaylistsPayloadSchema = Joi.object({
  songId: Joi.string().required(),
});

module.exports = {
  PostPlaylistsPayloadSchema,
  PostSongsPlaylistsPayloadSchema,
  DeleteSongsPlaylistsPayloadSchema,
};
