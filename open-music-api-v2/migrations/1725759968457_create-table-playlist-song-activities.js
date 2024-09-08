exports.up = (pgm) => {
  pgm.createTable('playlist_song_activities', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    song_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    action: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    time: {
      type: 'TEXT',
      notNull: true,
    },
  });
  pgm.addConstraint('playlist_song_activities', 'fk_playlistsongactivities.playlistid_playlists.id', 'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE');

  pgm.addConstraint('playlist_song_activities', 'fk_playlistsongactivities.songid_songs.id', 'FOREIGN KEY(song_id) REFERENCES songs(id) ON DELETE CASCADE');

  pgm.addConstraint('playlist_song_activities', 'fk_playlistsongactivities.userid_users.id', 'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('playlist_song_activities', 'fk_playlistsongactivities.userid_users.id');

  pgm.dropConstraint('playlist_song_activities', 'fk_playlistsongactivities.songid_songs.id');

  pgm.dropConstraint('playlist_song_activities', 'fk_playlistsongactivities.playlistid_playlists.id');

  pgm.dropTable('playlist_song_activities');
};
