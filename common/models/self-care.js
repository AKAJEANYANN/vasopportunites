'use strict';
const notify = require("../../server/global/notify")


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


    Selfcare.number = function (req ,cb) {

        // const message = "Votre code de connexion est : " ;

        const Historiqueselfcare = Selfcare.app.models.historiqueSelfCare;


        var codeDial = req.body.dialCode;
        var msisdn = req.body.numero;
        var idOperator = req.body.operatorId;
        var numdemo = "0000000000";
       
        // var code = Math.floor(Math.random() * 9000) + 1000;
        // var code = (msisdn != numdemo) ?  Math.floor(Math.random() * 90000) + 1000 : 1111;
        // var code = result?  Math.floor(Math.random() * 9000) + 1000 : 1111;

        var code = 1111;


        if(msisdn != null && msisdn != undefined && msisdn != ""){

            Selfcare.findOne({
                where: {
                    username : codeDial + msisdn,
                    selfCarePhone: codeDial + msisdn
                }
            }, (err, user) => {

                // cas 1 l'utilisateur existe: 
                if(user){
                    
                    // mettre a jour le MDP avec le code de 5 chiffre
                    user.updateAttributes({
                        password : `${code}`
                    },(err, use) => {


                        Historiqueselfcare.create({
                            dateSaving: Date.now(),
                            selfCareId: use.id
                        },(err, histoself)=>{
                            //console.log(histoself);
                        })


                        if(err) cb(err, null)
                        else if((codeDial + msisdn) != numdemo ) {
                            // TODO : Envoyer SMS
                            // notify.sendSMS(message + code, msisdn);
                            
                            // Retourner une reponse
                            // cb(null, [message + code, use]);
                            cb(null,  use);

                        }
                        else {// Retourner une reponse
                            cb(null, user); 
                            }

                        })            
                }
                // cas 2 l'utilsiateur n'existe pas
                else {

                    // creer l'utilisateur avec son numero de tel 
                    Selfcare.create(
                        {
                            selfCareCode : codeDial,
                            username : codeDial + msisdn,
                            selfCarePhone: codeDial + msisdn,
                            email : codeDial + msisdn + '@vasopportunites.com',
                            operatorId: idOperator,
                            password : `${code}`,
                        },
                        (err, user) => {

                            Historiqueselfcare.create({
                                dateSaving: Date.now(),
                                selfCareId: user.id
                            },(err, histoself)=>{
                                // console.log(histoself);
                            })
                            
                            if(err) cb(err, null);

                            else if((codeDial + msisdn) != numdemo) { 
                                // TODO : Envoyer SMS
                                // notify.sendSMS(message + code, msisdn); 
                                // Retourner une reponse
                                cb(null, user); 
                                
                            }
                            else {// Retourner une reponse
                                cb(null, user); 
                            }; 

                        });
                }
            })
        }
        else{
            cb({status: 401, message: "Veuillez entrer le numéro de téléphone"}, null)
        } 
        
    };

    Selfcare.remoteMethod('number',
    {
        accepts: [
            { arg: 'req', type: 'object', 'http': {source: 'req'}},
        ],
        http: { path: '/number', verb: 'post'},
        returns : { type: 'object', root: true } 
    });

};
