var {SimplySign} = require("../util")

async function main(){

    // Test
    publicKey = "hmac_pub_1"
    privateKey = "hmac_priv_1"
    url = "http://127.0.0.1:8000/v1/eth/contract/build/"
    filePath = "/home/lenovo/Documents/simplyblock/ethereum-service/contracts/DappToken.sol"

    //Required Params
    data = {
        "contract_name" : "abc"
    }
    files = {
        "contract" : filePath
    }
    
    var objSimplySign = new SimplySign(privateKey, publicKey)
    var {response, body} = await objSimplySign.GatewayRequest(url, data, files)
    console.log(body)

}

main()