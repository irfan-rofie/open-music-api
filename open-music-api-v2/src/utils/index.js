const mapDBToSongModel = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  album_id,
  created_at,
  updated_at,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId: album_id,
  createdAt: created_at,
  updatedAt: updated_at,
});

const mapDBToSongFilteredModel = ({
  id,
  title,
  performer,
}) => ({
  id,
  title,
  performer,
});

const mapDBToAlbumModel = ({
  id,
  name,
  year,
  created_at,
  updated_at,
}) => ({
  id,
  name,
  year,
  createdAt: created_at,
  updatedAt: updated_at,
  songs: {},
});

const mapDBToPlaylistModel = ({
  id,
  name,
  username,
}) => ({
  id,
  name,
  username,
});

const mapDBToPlaylistSongsModel = ({
  id,
  name,
  username,
}) => ({
  id,
  name,
  username,
  songs: [],
});

const mapDBToPlaylistActivitiesModel = ({
  id,
}) => ({
  playlistId: id,
  activities: [],
});

const mapDBToActivitiesModel = ({
  username,
  title,
  action,
  time,
}) => ({
  username,
  title,
  action,
  time,
});

module.exports = {
  mapDBToSongModel,
  mapDBToAlbumModel,
  mapDBToSongFilteredModel,
  mapDBToPlaylistModel,
  mapDBToPlaylistSongsModel,
  mapDBToPlaylistActivitiesModel,
  mapDBToActivitiesModel,
};
