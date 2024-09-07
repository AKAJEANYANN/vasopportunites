'use strict';

module.exports = function(Customercare) {

    Customercare.connect = function (req ,cb) {


        var msisdn = req.body.number;
        var pass = req.body.password;
       

        Customercare.findOne({
            where:{
                
            }
        })

        
        
    };

    Customercare.remoteMethod('number',
    {
        accepts: [
            { arg: 'req', type: 'object', 'http': {source: 'req'}},
        ],
        http: { path: '/number', verb: 'post'},
        returns : { type: 'object', root: true } 
    });









    // Customercare.number = function (req ,cb) {

    //     // const message = "Votre code de connexion est : " ;

    //     var msisdn = req.body.numero;
    //     var numdemo = "0000000000";
       
    //     // var code = Math.floor(Math.random() * 9000) + 1000;
    //     // var code = (msisdn != numdemo) ?  Math.floor(Math.random() * 90000) + 1000 : 1111;
    //     // var code = result?  Math.floor(Math.random() * 9000) + 1000 : 1111;

    //     var code = 1111;


    //     if(msisdn != null && msisdn != undefined && msisdn != ""){

    //         Customercare.findOne({
    //             where: {
    //                 username : msisdn,
    //                 customercarePhone: msisdn,
    //             }
    //         }, (err, user) => {

    //             // cas 1 l'utilisateur existe: 
    //             if(user){
                    
    //                 // mettre a jour le MDP avec le code de 5 chiffre
    //                 user.updateAttributes({
    //                     password : `${code}`
    //                 },(err, use) => {
    //                     console.log(use);
    //                     if(err) cb(err, null)
    //                     else if(msisdn != numdemo ) {
    //                         // TODO : Envoyer SMS
    //                         // notify.sendSMS(message + code, msisdn);
                            
    //                         // Retourner une reponse
    //                         // cb(null, [message + code, use]);
    //                         cb(null,  use);

    //                     }
    //                     else {// Retourner une reponse
    //                         cb(null, user); 
    //                         }

    //                     })            
    //             }
    //             // cas 2 l'utilsiateur n'existe pas
    //             else {

    //                 // creer l'utilisateur avec son numero de tel 
    //                 Customercare.create(
    //                     {
    //                         username : msisdn,
    //                         customercarePhone: msisdn,
    //                         email : msisdn + '@vasopportunites.com',
    //                         password : `${code}`,
    //                     },
    //                     (err, user) => {
    //                         if(err) cb(err, null);

    //                         else if(msisdn != numdemo) { 
    //                             // TODO : Envoyer SMS
    //                             // notify.sendSMS(message + code, msisdn); 
    //                             // Retourner une reponse
    //                             cb(null, user); 
                                
                                
    //                         }
    //                         else {// Retourner une reponse
    //                             cb(null, user); 
    //                         }; 

    //                     });
    //             }
    //         })
    //     }
    //     else{
    //         cb({status: 401, message: "Veuillez entrer le numéro de téléphone"}, null)
    //     } 
        
    // };

    // Customercare.remoteMethod('number',
    // {
    //     accepts: [
    //         { arg: 'req', type: 'object', 'http': {source: 'req'}},
    //     ],
    //     http: { path: '/number', verb: 'post'},
    //     returns : { type: 'object', root: true } 
    // });

};
