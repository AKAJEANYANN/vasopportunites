'use strict';

const countMusicByStatusService = require("../services/music/count-music-by-status.service");
const refusMusicService = require("../services/music/refus-music.service");
const validationMusicService = require("../services/music/validation-music.service");

module.exports = function(Music) {

  countMusicByStatusService(Music)

  validationMusicService(Music)

  refusMusicService(Music)
  
};
