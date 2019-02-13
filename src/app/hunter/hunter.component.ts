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

  Tasks: Array<string> = ['Trail Maintenance', 'Camera Set-up', 'Sensor Set-Up', 'Track Monitoring'];

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
  add(count: number): boolean {
    console.log('Add 100');
    // TODO: Phillipe
    return false;
  }

  Send(length: number) {
    if (this.add(length)) {
      alert('Congratulations, you\'ve earned' + length + 'VoteToken');
      this.accountService.updatedTokencount();
      this.Tokencount = this.accountService.getTokenCount();
    } else {
      alert('Error');
    }


    this.list.deselectAll();

  }
}
