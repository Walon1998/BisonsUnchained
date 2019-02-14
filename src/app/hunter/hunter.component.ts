import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {AccountService} from '../account.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatSelectionList} from '@angular/material';
import {WEB3} from './web3';
import Web3 from 'web3';
import {ABIFile} from './ABIFile';

@Component({
  selector: 'app-hunter',
  templateUrl: './hunter.component.html',
  styleUrls: ['./hunter.component.scss']
})
export class HunterComponent implements OnInit {
  private privateKey: string;
  private publicKey: string;
  Tokencount: number;

  @ViewChild('list') list: MatSelectionList;

  Tasks: Array<string> = ['Trail Maintenance', 'Camera Set-Up', 'Sensor Set-Up', 'Track Monitoring'];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  private projectsContract: any;

  constructor(private accountService: AccountService,
              private breakpointObserver: BreakpointObserver,
              @Inject(WEB3) private web3: Web3) {
  }


  async ngOnInit() {
    this.privateKey = this.accountService.getprivateKey();
    this.publicKey = this.accountService.getPublicKey();
    this.accountService.updatedTokencount();
    this.Tokencount = this.accountService.getTokenCount();
    console.log(Web3.givenProvider);

    if ('enable' in this.web3.currentProvider) {
      await this.web3.currentProvider.enable();
    }
    const accounts = await this.web3.eth.getAccounts();
    console.log(accounts);

    if (typeof this.web3 !== 'undefined') {
      console.log('Web3 Detected! ' + this.web3.currentProvider.constructor.name);
      // TODO Philipp
      // const projectsAddress = '0x1611d14ADc2A1a1d5947303DB2180e43AA0f1D5E'; // bleibt die Adresse auch bei Updates des Contracts...?
      const projectsAddress = '0x66c0289d738e7d26ba52c644da712268af34c9dd';
      // this.projectsContract = this.web3.eth.contract(projectsABI).at(projectsAddress); // initalize contract
      // let abi = JSON.parse(ABIFile);

      this.projectsContract = new this.web3.eth.Contract(ABIFile, projectsAddress); // initalize contract

      // this.projectsContract.incr.sendTransaction(0, {
      //   from: this.web3.eth.accounts[0],
      //   gas: 4000000
      // }, function(error, result) { // get callback from function which is your transaction key
      //   if (!error) {
      //     console.log(result);
      //   } else {
      //     console.log(error);
      //   }
      // });

      // this.web3.eth.getAccounts(console.log);
      // this.projectsContract.methods.incrVotes(0).send({
      //   from: '0x9529dE56b77967f95A356b804572DE1045BA4095'
      // }).on('transactionHash', (hash) => {
      //   // receipt example
      //   console.log(hash);
      // });

      // testContract.methods.incrVotes(0).call().then((result) => {
      //   console.log("Return value of call: " + result);
      // });

    } else {
      console.log('No Web3 Detected... using HTTP Provider');
      alert('Please install Metamask, you stupid! Visit https://metamask.io/');
      // window.web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/<APIKEY>'));
    }

  }

  // Adds count tokens to the given Account
  addToken(count: number): boolean {
    console.log('Add 100');
    // TODO: Philipp
    // dummy code, funktioniert soweit
    /* projectsContract.createToken(1, (error, result) => {
       if (!error) {
         console.log(JSON.stringify(result));
         return true;
       } else {
         console.error(error);
         return false;
       }
     });*/

    // how to get the return value??????????????????????????????????????????????????????????????????????
    this.projectsContract.incrVotes.call(0, (error, result) => {
      if (!error) {
        console.log(result);
        console.log(result[0]);
        console.log(result > 0);
        console.log(JSON.stringify(result));
      } else {
        console.error(error);
      }
    });
    return false;
  }

  Send(length: number) {
    if (this.addToken(length)) {
      alert('Congratulations, you\'ve earned' + length + 'VoteToken');
      this.accountService.updatedTokencount();
      this.Tokencount = this.accountService.getTokenCount();
    } else {
      alert('Error');
    }


    this.list.deselectAll();

  }
}
