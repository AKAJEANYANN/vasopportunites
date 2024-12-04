module.exports = function numberService(Admincare) {

    Admincare.number = function (req ,cb) {

        // const message = "Votre code de connexion est : " ;


        var codeDial = req.body.dialCode;
        var msisdn = req.body.numero;
        var idOperator = req.body.operatorId;
       
        var code = "0000";


        if(msisdn != null && msisdn != undefined && msisdn != ""){

            Admincare.findOne({
                where: {
                    username : codeDial + msisdn,
                    adminCarePhone: codeDial + msisdn
                }
            }, (err, user) => {

                // cas 1 l'utilisateur existe: 
                if(user){
                    
                    // mettre a jour le MDP avec le code de 5 chiffre
                    user.updateAttributes({
                        password : `${code}`
                    },(err, use) => {

                        if(err) cb(err, null)
                        else{
                            // TODO : Envoyer SMS
                            // notify.sendSMS(message + code, msisdn);
                            
                            // Retourner une reponse
                            // cb(null, [message + code, use]);
                            cb(null,  use);
                        }

                        })            
                }
                // cas 2 l'utilsiateur n'existe pas
                else {

                    // creer l'utilisateur avec son numero de tel 
                    Admincare.create(
                        {
                            adminCareCode : codeDial,
                            username : codeDial + msisdn,
                            adminCarePhone: codeDial + msisdn,
                            adminCareName: "administrateur",
                            email : codeDial + msisdn + '@vasopportunites.com',
                            operatorId: idOperator,
                            password : `${code}`,
                        },
                        (err, user) => {
                            
                            if(err) cb(err, null);

                            else{ 
                                // TODO : Envoyer SMS
                                // notify.sendSMS(message + code, msisdn); 
                                // Retourner une reponse
                                cb(null, user); 
                                
                            } 

                        });
                }
            })
        }
        else{
            cb({status: 401, message: "Veuillez entrer le numéro de téléphone"}, null)
        } 
        
    };

    Admincare.remoteMethod('number',
    {
        accepts: [
            { arg: 'req', type: 'object', 'http': {source: 'req'}},
        ],
        http: { path: '/number', verb: 'post'},
        returns : { type: 'object', root: true } 
    });
    
}