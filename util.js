const Crypto = require("crypto")
const request = require('request')
const fs = require("fs")


function SimplySign(privateKey, publicKey){
    this.privateKey = privateKey
    this.publicKey = publicKey
    this.data = null
    this.signedData = null
}

SimplySign.prototype.GenerateSignature = function(data){
    
    // Convert to String
    this.data = JSON.stringify(data)

    // Replace values
    this.data = this.data.replace(":", ": ")
    this.data = this.data.replace(/"/g, '\'');

    // Genearte Signed Data
    this.signedData = Crypto.createHmac('sha384', this.privateKey).update(this.data).digest('hex')
    return this.signedData
}

SimplySign.prototype.GatewayRequest = async function(uri, data, files=null){

    return new Promise((resolve, reject) => {

        // Generate Data
        var signedData = this.GenerateSignature(data)
        
        if (files != null){

            // Read Files - 
            Object.keys(files).forEach(function(key) {
                files[key] = fs.createReadStream(files[key])
            });

            // Create Request Data
            var requestData = Object.assign(data, files)
            requestData["signed_data"] = signedData
            requestData["public_key"] = this.publicKey


            // Create Options
            var options = {
                uri: uri,
                method: 'POST',
                formData: requestData
            };

        }else{

            // Create Request Data
            var requestData = {
                'public_key': this.publicKey,
                'signed_data': signedData,
                'data': data
            }

            // Create Options
            var options = {
                uri: uri,
                method: 'POST',
                json: requestData
            };

        }

        // Request
        request(options, function (error, response, body) {
            if (error) {
                reject(error)
            }else{
                resolve({response, body})
            }
        });

        
    })

}


module.exports = {
    SimplySign
}