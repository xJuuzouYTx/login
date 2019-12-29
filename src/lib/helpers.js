const bcrypt = require('bcryptjs');
const helpers = {};

helpers.encryptPass = async (password)=>{
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};  
helpers.comparePass = async (password, savedPassword)=>{
    try{
        return await bcrypt.compare(password, savedPassword);
    }catch(e){
        console.log(e);
    }
};
module.exports = helpers;