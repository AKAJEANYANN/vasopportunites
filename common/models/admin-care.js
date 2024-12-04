'use strict';

const numberService = require("../services/admincare/number.service");

module.exports = function(Admincare) {

    
    Admincare.afterRemote('login', function(ctx, accessToken, next) {
        if (!accessToken) {
          return next(new Error('Connexion échouée, aucun token d\'accès généré.'));
        }
    
        const Historiqueadmincare = Admincare.app.models.historiqueAdminCare;
        const userId = accessToken.userId;
        const dateConnexion = new Date();
    
        // Créer un enregistrement dans la table Historiqueadmincare
        Historiqueadmincare.create({
          adminCareId: userId,
          dateSaving: dateConnexion
        }, function(err, record) {
          if (err) {
            console.log('Erreur lors de la création de l\'historique de connexion :', err);
            return next(err);
          }
          console.log('Historique de connexion enregistré pour l\'utilisateur avec ID:', userId);
          next();
        });
      });




      numberService(Admincare)
};
