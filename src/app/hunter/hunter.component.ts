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
  @ViewChild('list') list: MatSelectionList;

  Tasks: Array<string> = ['Task1', 'Task2', 'Task3', 'Task4'];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private accountService: AccountService, private breakpointObserver: BreakpointObserver) {
  }


  ngOnInit() {
    this.privateKey = this.accountService.getprivateKey();
    this.publicKey = this.accountService.getPublicKey();
  }

  // Adds count tokens to the given Account
  add(count: number): boolean {
    console.log('Add 100');
    return false;
  }

  Send(length: number) {
    if (this.add(length)) {
      alert('Congratulations, you\'ve earned' + length + 'VoteToken');
    } else {
      alert('Error');
    }


    this.list.deselectAll();

  }
}
