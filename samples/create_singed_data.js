var {SimplySign} = require("../util")

// Required Data
var publicKey = "hmac_pub_1"
var privateKey = "hmac_priv_1"
var data = {
    "address": "0x00390f23598C7B01ea4ab5dA509c5495a32CFB03"
}

// Generate Signature
var objSimplySign = new SimplySign(privateKey, publicKey)
var signedData = objSimplySign.GenerateSignature(data)
console.log(signedData)