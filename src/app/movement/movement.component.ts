import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Account } from '../account/account';
import { AccountService } from '../account/account.service';
import { Movement } from './movement';
import { MovementService } from './movement.service';

@Component({
  selector: 'app-movimenti',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.css']
})
export class MovementComponent implements OnInit {
  public movements: Movement[] = [];
  public movementToDelete: Movement;
  public accounts: Account[] = [];
  isSubmitted = false;

  registrationForm: any;

  constructor(private movementService: MovementService,
    private accountService: AccountService, public fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      type: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      accountId: ['', [Validators.required]],
  });
  }

  ngOnInit(): void {
    this.getAllMovements();
    this.getAllAccounts();
  }



  changeAccount(e: any) {
    this.accountId?.setValue(e.target.value, {
      onlySelf: true,
    });
    console.log(e.target.value);
  }

  selectAccount(index: number) {
    this.accountId?.setValue(index);
    console.log("accountId: "+this.accountId);
  }

 // Access formcontrols getter
  get accountId() {
    return this.registrationForm.get('account');
  }

  // Access formcontrols getter
  get type() {
    return this.registrationForm.get('type');
  }
   // Access formcontrols getter
  get amount() {
    return this.registrationForm.get('amount');
  }




  public getAllAccounts() {
    this.accountService.getAllAccounts().subscribe(
      (response: Account[]) => {
        this.accounts = response;
        console.log(this.accounts);
      },

      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  onSubmit(): void {

  console.log(JSON.stringify(this.registrationForm.value.accountId));
  console.log(this.registrationForm.value.type);
  console.log(this.registrationForm.value.amount);

  this.isSubmitted = true;
  if (!this.registrationForm.valid) {
    false;
  } else {
    console.log(JSON.stringify(this.registrationForm.value));
    this.selectAccount(Number(JSON.stringify(this.registrationForm.value.accountId)));
    console.log("Esatto: "+this.registrationForm.value);
    this.onAddMovement(this.registrationForm.value);
  }
}

  public getAllMovements(): void{
    this.movementService.getAllMovements().subscribe(
      (response: Movement[]) => {
        this.movements = response;
      },

      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddMovement(addMovement: Movement): void{
    console.log(addMovement);
    this.movementService.addMovement(addMovement).subscribe(
      (response) => {
        console.log(response);
        this.getAllMovements();

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteMovement(movementId: number): void{
    this.movementService.deleteMovement(movementId).subscribe(
      (response) => {
        console.log(response);
        this.getAllMovements();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenDeleteMovementModal(movement: Movement): void{
    this.movementToDelete = movement;
  }

}
