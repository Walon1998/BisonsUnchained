import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {AccountService} from '../account.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatSelectionList} from '@angular/material';
declare var updateToken: any;
declare var getTokencountfromBlockchain: any;
declare var web3: any;
declare var addToken: any;

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
              private breakpointObserver: BreakpointObserver) {
  }


  ngOnInit() {
    this.privateKey = this.accountService.getprivateKey();
    this.publicKey = this.accountService.getPublicKey();
    // this.accountService.updatedTokencount();

    getTokencountfromBlockchain().then((result) => {
      this.Tokencount = result;
      console.log(this.Tokencount);
    });


    // console.log(Web3.givenProvider);


    // const accounts = await this.web3.eth.getAccounts();
    // console.log(accounts);

    if (typeof web3 !== 'undefined') {

    } else {
      console.log('No Web3 Detected... using HTTP Provider');
      alert('Please install Metamask, you stupid! Visit https://metamask.io/');
    }

  }

  // Adds count tokens to the given Account
  // addToken(count: number): boolean {
  //   return addTokenJs(count);
  //   console.log('Add 100');
  //   // dummy code, funktioniert soweit
  //   /* projectsContract.createToken(1, (error, result) => {
  //      if (!error) {
  //        console.log(JSON.stringify(result));
  //        return true;
  //      } else {
  //        console.error(error);
  //        return false;
  //      }
  //    });*/
  //
  //   // how to get the return value??????????????????????????????????????????????????????????????????????
  //   this.projectsContract.incrVotes.call(0, (error, result) => {
  //     if (!error) {
  //       console.log(result);
  //       console.log(result[0]);
  //       console.log(result > 0);
  //       console.log(JSON.stringify(result));
  //     } else {
  //       console.error(error);
  //     }
  //   });
  //   return false;
  // }

  Send(length: number) {
    if (addToken(length)) {
      alert('Congratulations, you\'ve earned ' + length + ' VoteToken');
      this.accountService.updatedTokencount();
      this.Tokencount = this.accountService.getTokenCount();
    } else {
      alert('Error');
    }


    this.list.deselectAll();

  }

}
