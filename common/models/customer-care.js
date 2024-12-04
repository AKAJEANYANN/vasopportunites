'use strict';

const numberService = require("../services/customercare/number.service");
const searchService = require("../services/customercare/search.service");

module.exports = function(Customercare) {

    Customercare.afterRemote('login', function(ctx, accessToken, next) {
        if (!accessToken) {
          return next(new Error('Connexion échouée, aucun token d\'accès généré.'));
        }
    
        const Historiquecustomercare = Customercare.app.models.historiqueCustomerCare;
        const userId = accessToken.userId;
        const dateConnexion = new Date();
    
        // Créer un enregistrement dans la table Historiquecustomercare
        Historiquecustomercare.create({
          customerCareId: userId,
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



    searchService(Customercare)
    numberService(Customercare)

};
