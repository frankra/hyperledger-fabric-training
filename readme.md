# How to Build Smart Contracts with 
# Hyperledger Fabric: 

# A Best Practice Guide 
## CPL261

### Pre-requisites:
- Docker [Windows](https://docs.docker.com/docker-for-windows/edge-release-notes/) [Mac](https://docs.docker.com/docker-for-mac/edge-release-notes/)
- Docker Compose (Should be installed with Docker)
- Node [Windows/Mac/Linux](https://nodejs.org/en/download/)

### Setup
- Clone this repository
- Switch to `SAP Internet`, or any other connection outside of our SAP Proxy
- Navigate to `hyperledger-fabric-stub/fabcar` and execute `./startFabric.sh` (This will download a bunch of docker containers and set them up)
- Once the `startFabric` command is one, run `npm i`
- Finally to start the server you have to run `npm start`

### Chaincode
