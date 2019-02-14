// const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

var testResult;
const projectsAddress = '0xba955f4e0cf4d8dc8b98a6be515a240280358cff';
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

    // subscription = web3.eth.subscribe('logs', {
    //   address: projectsAddress,
    //   topics: ['0x12345...']
    // }, (error, result) => {
    //   if (!error)
    //     console.log(result);
    // });

    projectsContract.events.NewIncrVotes((error, result) => {

      console.log('result');
      console.log(result);
      console.log(result.returnValues);
      console.log(result.returnValues[0]);
      // updateToken(result.returnValues[0]);
      document.querySelector('body > app-root > app-hunter > mat-sidenav-container > mat-sidenav-content > mat-toolbar > span:nth-child(2)').innerHTML = '\n' +
        'BisonsUnchained: ' + result.returnValues[0];
    });

  } else {
    console.log('No Web3 Detected... using HTTP Provider');
    alert('Please install Metamask, you stupid! Visit https://metamask.io/');
    window.web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/<APIKEY>"));
  }
});

function getBalance() {
  var address, wei, balance
  address = document.getElementById("address").value
  try {
    web3.eth.getBalance(address, function (error, wei) {
      if (!error) {
        var balance = web3.fromWei(wei, 'ether');
        document.getElementById("output").innerHTML = balance + " ETH";
      }
    });
  } catch (err) {
    document.getElementById("output").innerHTML = err;
  }
}

function addToken(count) {
  console.log(count);
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
  return projectsContract.Proposals.call({
    from: userAccount
  }).then((result) => {
    console.log("You have " + result + " Votes available");
    return result;
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
