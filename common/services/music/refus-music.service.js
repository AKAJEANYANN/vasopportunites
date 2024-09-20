module.exports = function refusMusicService(Music) {

    Music.refusMusic = function (idMusic, idMessage, idAdmincare, cb) {

        Music.findOne({
            where:{
                id: idMusic
            }
        },(err, msc)=>{
            console.log(msc);
            if(msc != null){

                msc.updateAttributes({
                    musicEtat: "REFUSEE",
                    musicActionDate: Date.now(),
                    messageId: idMessage,
                    adminCareId: idAdmincare
                },(err, ms)=>{
                    if(err)cb(err, null)
                        else cb(null, ms)
                            
                })
            }else{
                cb({status: 401, message: "Veuillez bien verifier vos données"}, null)
            }
        })
        
    }
    
      
      Music.remoteMethod('refusMusic', {
        accepts: [
            { arg: 'idMusic', type: 'string', required: true},
            { arg: 'idMessage', type: 'string', required: true},
            { arg: 'idAdmincare', type: 'string', required: true}
        ],
        http: { path: '/refus-music', verb: 'get' },
        returns: { arg: 'data', type: 'object' }
      });


}