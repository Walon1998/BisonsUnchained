import {Component, OnInit} from '@angular/core';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-hunter',
  templateUrl: './hunter.component.html',
  styleUrls: ['./hunter.component.scss']
})
export class HunterComponent implements OnInit {
  private pirvateKey: string;
  private publicKey: string;

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.pirvateKey = this.accountService.getprivateKey();
    this.publicKey = this.accountService.getPublicKey();
  }

  add(count: number): boolean {
    console.log('Add 100');
    return true;
  }

}
