import {Injectable} from '@angular/core';
import {Account} from './account';
import {AccountDatabase} from './accountdatabase';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private publicKey: string;
  private privateKey: string;
  private Accounts: Array<Account> = AccountDatabase;

  constructor() {
  }

  public login(name: string, password: string): boolean {
    for (const entry of this.Accounts) {
      if (name === entry.name && password === entry.password) {
        this.publicKey = entry.publickey;

        this.privateKey = entry.privatekey;
        return true;
      }
    }
    return false;
  }

  public getprivateKey(): string {
    return this.privateKey;
  }

  public getPublicKey(): string {
    return this.publicKey;
  }
}
