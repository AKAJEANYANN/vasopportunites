'use strict';

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



    // rechercher un abonné a travers un customer

    Customercare.search = function(req, cb){ 

        const Historiquecustomself = Customercare.app.models.historiqueCustomSelf;
        const Selfcare = Customercare.app.models.selfCare;

        const dateConnexion = new Date();

        var msisdn = req.body.numero;
        var idcust = req.body.customercareId;

        Selfcare.findOne({ 
            where:{
                username: msisdn,
                selfCarePhone: msisdn
            }

        }, (err, self) =>{

            if(self){

                Historiquecustomself.create({
                    customerCareId: idcust,
                    selfCareId: self.id,
                    dateSaving: dateConnexion
                },(err, histo)=>{})

                cb(null, self);

            }
        })
    };
   
    Customercare.remoteMethod('search',
    {
        accepts: { arg: 'req', type: 'object', 'http': {source: 'req'}},
        http: { path: '/search', verb: 'get'},
        returns : { type: 'object', root: true } 
    });

};
