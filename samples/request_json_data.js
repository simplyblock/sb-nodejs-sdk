var {SimplySign} = require("../util")

async function main(){

    // Test
    publicKey = "hmac_pub_1"
    privateKey = "hmac_priv_1"

    //Required Params
    data = {
        "hash": "hash2"
    }
    url = "http://local.simplyblock.io/testnet/v1/eth/verify_hash/"
    var objSimplySign = new SimplySign(privateKey, publicKey)
    var {response, body} = await objSimplySign.GatewayRequest(url, data)
    console.log(body)

}

main()