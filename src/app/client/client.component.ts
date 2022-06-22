import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Client } from './client';
import { ClientService } from './client.service';
import { AccountService } from '../account/account.service';
import { Account } from '../account/account';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  public clients: Client[] = [];
  public editClient!: Client;
  public deleteClient!: Client;
  public assignClient!: Client;
  public account!: Account;

  constructor(private clientService: ClientService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.getAllClients();
  }


  public getAllClients(): void  {
    this.clientService.getAllClients().subscribe(
      (response: Client[]) => {
        this.clients = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onAddClient(addForm: NgForm): void{
    this.clientService.addClient(addForm.value).subscribe(
      (response: Client) => {
        this.getAllClients();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onEditClient(client: Client): void{
    this.clientService.updateClient(client).subscribe(
      (response: Client) => {
        console.log(response);
        this.getAllClients();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onOpenEditModal(client: Client): void {
    this.editClient = client;
  }

  public onDeleteClient(idClient: number): void{
    this.clientService.deleteClient(idClient).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllClients();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAssignClient(client: Client): void{
    console.log(this.account);
    this.accountService.addAccount(this.account).subscribe(
      (response) => {
        console.log(response);
        this.getAllClients();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }


  public onOpenDeleteModal(client: Client): void{
    this.deleteClient = client;
  }

  public onOpenAssignModal(client: Client): void{
    this.assignClient = client;
  }
}
