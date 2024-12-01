'use strict';

module.exports = function(Selfcarehasmediaoportail) {
    Selfcarehasmediaoportail.searching = function (req, cb) {

        var idMediaOportail = req.body.mediaOportailId
        var idSelfCareOportail = req.body.selfCareOportailId
        var Vlike = req.body.like

        Selfcarehasmediaoportail.findOne({
            where:{
                mediaOportailId: idMediaOportail,
                selfCareOportailId: idSelfCareOportail
            }
        },(err, selfhasmed)=>{

            if(selfhasmed != null){

                selfhasmed.updateAttributes({
                    like: Vlike
                },(err, selfhasm)=>{
                    if(err)cb(err, null)
                        else cb(null, selfhasm)
                })
            }else{
                Selfcarehasmediaoportail.create({
                    mediaOportailId: idMediaOportail,
                    selfCareOportailId: idSelfCareOportail,
                    like: Vlike
                },(err, selfmed)=>{
                    if(err)cb(err, null)
                        else cb(null, selfmed)
                })
            }
        })
        
    }
    
      
    Selfcarehasmediaoportail.remoteMethod('searching', {
        accepts: [
            { arg: 'req', type: 'object', 'http': {source: 'req'}},
        ],
        http: { path: '/searching', verb: 'post' },
        returns: { arg: 'data', type: 'object' }
      });

};
