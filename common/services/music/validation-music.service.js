module.exports = function valideMusicService(Music) {

    Music.valideMusic = function (idMusic, idAdmincare, cb) {

        Music.findOne({
            where:{
                id: idMusic
            }
        },(err, msc)=>{
            console.log(msc);
            if(msc != null){

                msc.updateAttributes({
                    musicEtat: "VALIDEE",
                    musicActionDate: Date.now(),
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
    
      
      Music.remoteMethod('valideMusic', {
        accepts: [
            { arg: 'idMusic', type: 'string', required: true},
            { arg: 'idAdmincare', type: 'string', required: true}
        ],
        http: { path: '/music-validation', verb: 'get' },
        returns: { arg: 'data', type: 'object' }
      });


}