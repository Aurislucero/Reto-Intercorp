import { Component, OnInit } from '@angular/core';
import { FirestoreServiceService } from '../../firestore-service.service';
import { Chart }from 'Chart.js'

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  public Barchart: any = null;
  public average : number;
  public sd :number;
  clients :any;

  constructor(public firestore:FirestoreServiceService) {
    this.firestore.getvalueclient().subscribe((data)=>{
      this.clients = data;
      this.getaverages();
      this.getSd()
      this.ageOfClient(this.clients);
      this.sdOfClient(this.clients);
      
    })
   }

  ngOnInit() {
// Bar chart:
this.Barchart= new Chart('barChart', {
  type: 'bar',
data: {
 labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
 datasets: [{
     label: 'clientes con la misma edad',
     data: [9,7 , 3, 5, 2, 10],
     backgroundColor: [
         'rgba(255, 99, 132, 0.2)',
         'rgba(54, 162, 235, 0.2)',
         'rgba(255, 206, 86, 0.2)',
         'rgba(75, 192, 192, 0.2)',
         'rgba(153, 102, 255, 0.2)',
         'rgba(255, 159, 64, 0.2)'
     ],
     borderColor: [
         'rgba(255,99,132,1)',
         'rgba(54, 162, 235, 1)',
         'rgba(255, 206, 86, 1)',
         'rgba(75, 192, 192, 1)',
         'rgba(153, 102, 255, 1)',
         'rgba(255, 159, 64, 1)'
     ],
     borderWidth: 2
 }]
}, 
options: {
 title:{
     text:"Frecuencia de edades",
     display:true
 },
 scales: {
     yAxes: [{
         ticks: {
             beginAtZero:true
         }
     }]
 }
}
});
  }



  ageOfClient(data) {
    const newData = [
      ...data
      ];
    this.firestore.averageAritmeticClients(newData); 
  };

  sdOfClient(data){
    const newData2 = [
      ...data
      ];
    this.firestore.standarDesviation(newData2);
  }
  getaverages() {
    this.firestore.currentageClient.subscribe((average) => {
     console.log(average);
     this.average = average;
      });
  };
  getSd(){
    this.firestore.currentSd.subscribe((sd)=>{
      console.log(sd)
      this.sd = sd;
    })
  }

}
