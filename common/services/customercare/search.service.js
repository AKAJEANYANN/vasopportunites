module.exports = function searchService(Customercare) {

    // rechercher un abonné a travers un customer

    Customercare.search = function(req, cb){ 

        const Historiquecustomself = Customercare.app.models.historiqueCustomSelf;
        const Selfcare = Customercare.app.models.selfCare;

        const dateConnexion = new Date();

        var codeDial = req.body.dialCode;
        var msisdn = req.body.numero;
        var idcust = req.body.customercareId;
        var idOperator = req.body.operatorId;
        var code = 1111;

        Selfcare.findOne({ 
            where:{
                username: codeDial + msisdn,
                selfCarePhone: codeDial + msisdn
            }

        }, (err, self) =>{
            console.log(self);

            if(self){

                Historiquecustomself.create({
                    customerCareId: idcust,
                    selfCareId: self.id,
                    dateSaving: dateConnexion
                },(err, histo)=>{
                    console.log(histo);
                })

                if(err) cb(err, null)
                    else
                        cb(null, self);

            }else{

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
                        console.log(user);

                        Historiquecustomself.create({
                            customerCareId: idcust,
                            selfCareId: user.id,
                            dateSaving: dateConnexion
                        },(err, histoself)=>{
                            console.log(histoself);
                        })
                        
                        if(err) cb(err, null)
                            else
                                cb(null, user); 
                        
                    });
            }
        })
    };
   
    Customercare.remoteMethod('search',
    {
        accepts: { arg: 'req', type: 'object', 'http': {source: 'req'}},
        http: { path: '/search', verb: 'post'},
        returns : { type: 'object', root: true } 
    });
    
}