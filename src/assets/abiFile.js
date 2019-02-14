 const projectsABI = [
   {
     "constant": true,
     "inputs": [
       {
         "name": "",
         "type": "uint256"
       }
     ],
     "name": "proposals",
     "outputs": [
       {
         "name": "name",
         "type": "string"
       },
       {
         "name": "active",
         "type": "bool"
       },
       {
         "name": "countVotes",
         "type": "uint256"
       }
     ],
     "payable": false,
     "stateMutability": "view",
     "type": "function"
   },
   {
     "constant": false,
     "inputs": [
       {
         "name": "_name",
         "type": "string"
       }
     ],
     "name": "lookAtProposal",
     "outputs": [
       {
         "name": "",
         "type": "bool"
       },
       {
         "name": "",
         "type": "uint256"
       }
     ],
     "payable": false,
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "constant": true,
     "inputs": [],
     "name": "getVotes",
     "outputs": [
       {
         "name": "",
         "type": "uint256"
       }
     ],
     "payable": false,
     "stateMutability": "view",
     "type": "function"
   },
   {
     "constant": false,
     "inputs": [
       {
         "name": "_name",
         "type": "string"
       },
       {
         "name": "_voteCount",
         "type": "uint256"
       }
     ],
     "name": "payVotes",
     "outputs": [],
     "payable": false,
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "constant": false,
     "inputs": [
       {
         "name": "_name",
         "type": "string"
       }
     ],
     "name": "createProposal",
     "outputs": [],
     "payable": false,
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "constant": true,
     "inputs": [
       {
         "name": "",
         "type": "bytes32"
       }
     ],
     "name": "nameToId",
     "outputs": [
       {
         "name": "",
         "type": "uint256"
       }
     ],
     "payable": false,
     "stateMutability": "view",
     "type": "function"
   },
   {
     "constant": true,
     "inputs": [
       {
         "name": "",
         "type": "uint256"
       }
     ],
     "name": "assignmentList",
     "outputs": [
       {
         "name": "",
         "type": "uint256"
       }
     ],
     "payable": false,
     "stateMutability": "view",
     "type": "function"
   },
   {
     "constant": false,
     "inputs": [],
     "name": "endVoting",
     "outputs": [
       {
         "name": "",
         "type": "string"
       }
     ],
     "payable": false,
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "constant": false,
     "inputs": [
       {
         "name": "_assignmentId",
         "type": "uint256"
       }
     ],
     "name": "incrVotes",
     "outputs": [
       {
         "name": "",
         "type": "uint256"
       }
     ],
     "payable": false,
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [],
     "payable": false,
     "stateMutability": "nonpayable",
     "type": "constructor"
   },
   {
     "anonymous": false,
     "inputs": [
       {
         "indexed": false,
         "name": "countVotes",
         "type": "uint256"
       }
     ],
     "name": "NewIncrVotes",
     "type": "event"
   },
   {
     "anonymous": false,
     "inputs": [
       {
         "indexed": false,
         "name": "_name",
         "type": "string"
       }
     ],
     "name": "InvalidProposal",
     "type": "event"
   }
 ];
