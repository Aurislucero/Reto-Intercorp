import { Component, OnInit } from '@angular/core';
import { FirestoreServiceService } from '../../firestore-service.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {
  clients :any;

  constructor(public firestore:FirestoreServiceService) {
    this.firestore.getvalueclient().subscribe((data)=>{
      this.clients = data;
      console.log(this.clients);
    })
   }

  ngOnInit() {
  }

}
