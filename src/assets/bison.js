const projectsAddress = '0xce09cfa333c808996ba51ae6f9785fa617503ce7';
var projectsContract;
var userAccount;
var subscription;

window.addEventListener('load', function () {
  if (typeof web3 !== 'undefined') {
    console.log('Web3 Detected! ' + web3.currentProvider.constructor.name);
    web3 = new Web3(web3.currentProvider);

    projectsContract = new web3.eth.Contract(projectsABI, projectsAddress);

    web3.eth.getAccounts((error, accounts) => {
      userAccount = accounts[0];
    });


    projectsContract.events.NewIncrVotes((error, result) => {

      // console.log('result');
      // console.log(result);
      // console.log(result.returnValues);
      // console.log(result.returnValues[0]);
      // updateToken(result.returnValues[0]);
      document.querySelector('body > app-root > app-hunter > mat-sidenav-container > mat-sidenav-content > mat-toolbar > span:nth-child(2)').innerHTML = '\n' +
        'BisonsUnchained: ' + result.returnValues[0];
    });

  } else {
    console.log('No Web3 Detected... using HTTP Provider');
    alert('Please install Metamask, you stupid! Visit https://metamask.io/');
    // window.web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/<APIKEY>"));
  }
});

function addToken(count) {
  // console.log(count);
  if (count === 0)
    return false;
  let index = 0;
  if (count > 1)
    index = 1;

  projectsContract.methods.incrVotes(index).send({
    from: userAccount
  }).on('transactionHash', (hash) => {
    console.log(hash);
  }).on('error', (error) => {
    return false;
  });
  return true;
}

// Adds a new Project to the Blockchain
function addProject(projectname) {
  projectsContract.methods.createProposal(projectname).send({
    from: userAccount
  }).on('transactionHash', (hash) => {
    console.log(hash);
  }).on('error', (error) => {
    return false;
  });
  return true;
}

// Vote woih amout of token on a given project
function voteOnProject(projectname, amount) {
  projectsContract.methods.payVotes(projectname, amount).send({
    from: userAccount
  }).on('transactionHash', (hash) => {
    console.log(hash);
  }).on('error', (error) => {
    return false;
  });
  return true;
}

// Returns all projects in an array!
function getAllProjects() {
  return projectsContract.methods.getProposalsLength().call({
    from: userAccount
  }).then((result) => {
    var Returnarray = [];
    for (var i = 0; i < result; i++) {
      projectsContract.methods.getProposal(i).call({
        from: userAccount
      }).then((result2) => {
        if (result2[1]) {
          Returnarray.push({name: result2[0], voters: result2[2]});
        }
        console.log('Item' + result2[0]);
        console.log('Item' + result2[1]);
        console.log('Item' + result2[2]);
      });
    }
    // console.log("Length ist: " + result);

    return Returnarray;
  });
}

function getTokencountfromBlockchain() {
  return projectsContract.methods.getVotes().call({
    from: userAccount
  }).then((result) => {
    console.log("You have " + result + " Votes available");
    return result;
  });
}
