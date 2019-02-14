import {Component, OnInit, ViewChild} from '@angular/core';
import {AccountService} from '../account.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatSelectionList} from '@angular/material';

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

  constructor(private accountService: AccountService, private breakpointObserver: BreakpointObserver) {
  }


  ngOnInit() {
    this.privateKey = this.accountService.getprivateKey();
    this.publicKey = this.accountService.getPublicKey();
    this.accountService.updatedTokencount();
    this.Tokencount = this.accountService.getTokenCount();

    if (typeof web3 !== 'undefined') {
      console.log('Web3 Detected! ' + web3.currentProvider.constructor.name);
      // TODO Philipp
      // const projectsAddress = '0x1611d14ADc2A1a1d5947303DB2180e43AA0f1D5E'; // bleibt die Adresse auch bei Updates des Contracts...?
      const projectsAddress = '0xbbf289d846208c16edc8474705c748aff07732db';
      this.projectsContract = web3.eth.contract(projectsABI).at(projectsAddress); // initalize contract
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
