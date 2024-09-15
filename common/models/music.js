'use strict';

module.exports = function(Music) {

    Music.countMusicByStatus = async function(idOperator, cb) {
        try {
          const currentDate = new Date();
          const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));  // Début de la journée
          const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999)); // Fin de la journée
    
          // Compter les clients en attente
          const pendingMusic = await Music.count({ musicEtat: 'EN_ATTENTE', musicSupprime: false, operatorId: idOperator });
    
          // Compter les Music validés aujourd'hui
          const validatedMusic = await Music.count({
            musicEtat: 'VALIDEE',
            musicActionDate: { between: [startOfDay, endOfDay] },
            operatorId: idOperator
          });
    
          // Compter les Music rejetés aujourd'hui
          const rejectedMusic = await Music.count({
            musicEtat: 'REFUSEE',
            musicActionDate: { between: [startOfDay, endOfDay] },
            operatorId: idOperator
          });
    
          // Retourner les résultats
          const result = {
            pendingMusic: pendingMusic,
            operation:{
                date: currentDate,
                validate: validatedMusic,
                reject: rejectedMusic
            }
          };
    
          cb(null, result);
        } catch (err) {
          cb(err);
        }
      };
    
      
      Music.remoteMethod('countMusicByStatus', {
        accepts: 
            { arg: 'idOperator', type: 'string'},
        http: { path: '/count-music-by-status', verb: 'get' },
        returns: { arg: 'data', type: 'object' }
      });



};
