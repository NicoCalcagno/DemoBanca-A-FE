import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Client } from '../client/client';
import { ClientService } from '../client/client.service';
import { Account } from './account';
import { AccountService } from './account.service';

@Component({
  selector: 'app-conto',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  isSubmitted = false;
  public accounts: Account[] = [];
  public accountToDelete: Account;
  public clients: Client[] = [];
  public accountAdd: Account;

  registrationForm: any;

  constructor(private accountService: AccountService,
    private clientService: ClientService, public fb: FormBuilder ) {
    this.registrationForm = this.fb.group({
      balance: ['', [Validators.required]],
      client: ['', [Validators.required]],
    });
    }

  changeClient(e: any) {
    this.client?.setValue(e.target.value, {
      onlySelf: true,
    });

  }
  // Access formcontrols getter
  get client() {
    return this.registrationForm.get('client');
  }

  // Access formcontrols getter
  get balance() {
    return this.registrationForm.get('balance');
  }

  ngOnInit() {
    this.getAccounts();
    this.getClients();
  }

  onSubmit(): void {
    console.log(this.registrationForm.value.client);
    console.log(this.registrationForm.value.balance);
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      false;
    } else {
      console.log(JSON.stringify(this.registrationForm.value));
      this.onAddAccount(this.registrationForm.value);
    }
  }

  public getAccounts(): void {
    this.accountService.getAllAccounts().subscribe(
      (response: Account[]) => {
        this.accounts = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getClients(): void {
    this.clientService.getAllClients().subscribe(
      (response: Client[]) => {
        this.clients = response;
        console.log(this.clients);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddAccount(account: Account) : void {
    console.log(account);

    this.accountService.addAccount(account).subscribe(
      (response) => {
        this.getAccounts();
      },
      (error: HttpErrorResponse) => {
        //console.log(this.accountToAdd);
        alert(error.message);
      }
    );
  }



  public onDeleteAccount(accountId: number): void {
    this.accountService.deleteAccount(accountId).subscribe(
      (response: void) => {
        this.getAccounts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenDeleteAccountModal(conto: Account): void {
    this.accountToDelete = conto;
  }

}
