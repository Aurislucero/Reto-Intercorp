import { Component, OnInit } from '@angular/core';
import { FirestoreServiceService } from '../../firestore-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-new-client',
  templateUrl: './register-new-client.component.html',
  styleUrls: ['./register-new-client.component.css']
})
export class RegisterNewClientComponent implements OnInit {

  constructor(public firestore:FirestoreServiceService , private router: Router) {
 
   }

  ngOnInit() {
   
  }

  sendNewRegister(name:string, lastname:string, age:number , birthdate: number) {
    this.firestore.sendValueClient(name,lastname , age , birthdate);
    alert('se envió correctamente');
    return this.router.navigateByUrl('/');
    
    // console.log(name,lastname,age,birthdate);
    
    
 
    }

}
