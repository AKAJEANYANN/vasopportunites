'use strict';
const notify = require("../../server/global/notify");
const numberService = require("../services/selfcare/number.service");


module.exports = function(Selfcare) {

    // Selfcare.afterRemote('login', function(ctx, accessToken, next) {
    //     if (!accessToken) {
    //       return next(new Error('Connexion échouée, aucun token d\'accès généré.'));
    //     }
    
    //     const Historiqueselfcare = Selfcare.app.models.historiqueSelfCare;
    //     const userId = accessToken.userId;
    //     const dateConnexion = new Date();
    
    //     // Créer un enregistrement dans la table Historiqueadmincare
    //     Historiqueselfcare.create({
    //       selfCareId: userId,
    //       dateSaving: dateConnexion
    //     }, function(err, record) {
    //       if (err) {
    //         console.log('Erreur lors de la création de l\'historique de connexion :', err);
    //         return next(err);
    //       }
    //       console.log('Historique de connexion enregistré pour l\'utilisateur avec ID:', userId);
    //       next();
    //     });
    //   });


    numberService(Selfcare)

};
