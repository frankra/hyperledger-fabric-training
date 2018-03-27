'use strict';
/*
* Copyright IBM Corp All Rights Reserved
*
* SPDX-License-Identifier: Apache-2.0
*/
/*
 * Chaincode query
 */

const Fabric_Client = require('fabric-client');
const path = require('path');
const util = require('util');
const os = require('os');

const Query = {

  execute(chaincodeId, fcn, args) {
    //
    let fabric_client = new Fabric_Client();

    // setup the fabric network
    let channel = fabric_client.newChannel('mychannel');
    let peer = fabric_client.newPeer('grpc://localhost:7051');
    channel.addPeer(peer);

    //
    let member_user = null;
    let store_path = path.join(__dirname, 'hfc-key-store');
    console.log('Store path:' + store_path);
    let tx_id = null;

    // create the key value store as defined in the fabric-client/config/default.json 'key-value-store' setting
    return Fabric_Client.newDefaultKeyValueStore({
      path: store_path
    }).then((state_store) => {
      // assign the store to the fabric client
      fabric_client.setStateStore(state_store);
      let crypto_suite = Fabric_Client.newCryptoSuite();
      // use the same location for the state store (where the users' certificate are kept)
      // and the crypto store (where the users' keys are kept)
      let crypto_store = Fabric_Client.newCryptoKeyStore({ path: store_path });
      crypto_suite.setCryptoKeyStore(crypto_store);
      fabric_client.setCryptoSuite(crypto_suite);

      // get the enrolled user from persistence, this user will sign all requests
      return fabric_client.getUserContext('user1', true);
    }).then((user_from_store) => {
      if (user_from_store && user_from_store.isEnrolled()) {
        console.log('Successfully loaded user1 from persistence');
        member_user = user_from_store;
      } else {
        throw new Error('Failed to get user1.... run registerUser.js');
      }

      // queryCar chaincode function - requires 1 argument, ex: args: ['CAR4'],
      // queryAllCars chaincode function - requires no arguments , ex: args: [''],
      const request = {
        //targets : --- letting this default to the peers assigned to the channel
        chaincodeId: chaincodeId,
        fcn: fcn,
        args: args
      };

      // send the query proposal to the peer
      return channel.queryByChaincode(request);
    }).then((query_responses) => {
      console.log("Query has completed, checking results");
      // query_responses could have more than one  results if there multiple peers were used as targets
      if (query_responses && query_responses.length == 1) {
        if (query_responses[0] instanceof Error) {
          throw query_responses[0];
        } else {
          return query_responses[0].toString();
        }
      } else {
        return null;
      }
    })
  }
};

module.exports = Query;