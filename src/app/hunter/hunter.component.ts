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

  constructor(private accountService: AccountService, private breakpointObserver: BreakpointObserver) {
  }


  ngOnInit() {
    this.privateKey = this.accountService.getprivateKey();
    this.publicKey = this.accountService.getPublicKey();
    this.accountService.updatedTokencount();
    this.Tokencount = this.accountService.getTokenCount();
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
    projectsContract.incrVotes.call(0, (error, result) => {
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
