import { Component, OnInit } from '@angular/core';
import { FirestoreServiceService } from '../../firestore-service.service';
import { Chart }from 'Chart.js'

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  
  // public yearDeath :number;
  public Barchart: any = null;
  public average : number;
  public sd :number;
  clients :any;
  arrayDeathDate:number;
 public dayDeath : number;

  constructor(public firestore:FirestoreServiceService) {
    
  this.firestore.currentDeath.subscribe(date => {
    
    this.clients = date;
    console.log(date);
  })
   
    this.firestore.getvalueclient().subscribe((data)=>{
      this.clients = data;
      console.log(this.clients);
      
      this.getaverages();
      this.getSd()
      this.ageOfClient(this.clients);
      this.sdOfClient(this.clients);
      this.getDeathDate(this.clients)
    })
   }


  
  ngOnInit() {
// Bar chart:
// this.Barchart= new Chart('barChart', {
//   type: 'bar',
// data: {
//  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//  datasets: [{
//      label: 'clientes con la misma edad',
//      data: [9,7 , 3, 5, 2, 10],
//      backgroundColor: [
//          'rgba(255, 99, 132, 0.2)',
//          'rgba(54, 162, 235, 0.2)',
//          'rgba(255, 206, 86, 0.2)',
//          'rgba(75, 192, 192, 0.2)',
//          'rgba(153, 102, 255, 0.2)',
//          'rgba(255, 159, 64, 0.2)'
//      ],
//      borderColor: [
//          'rgba(255,99,132,1)',
//          'rgba(54, 162, 235, 1)',
//          'rgba(255, 206, 86, 1)',
//          'rgba(75, 192, 192, 1)',
//          'rgba(153, 102, 255, 1)',
//          'rgba(255, 159, 64, 1)'
//      ],
//      borderWidth: 2
//  }]
// }, 
// options: {
//  title:{
//      text:"Frecuencia de edades",
//      display:true
//  },
//  scales: {
//      yAxes: [{
//          ticks: {
//              beginAtZero:true
//          }
//      }]
//  }
// }
// });
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

  getDeathDate(data){
    
    const yearDate = data.map((date)=>{
    
    const fecha = new Date();
    const milisegPassed =fecha.getTime();
    const birthday_arr = date.birthdate.split("-");
    const birthday_date = new Date(birthday_arr[0], birthday_arr[1] , birthday_arr[2]);
    const getTime =birthday_date.getTime()
    console.log(birthday_date);
    const days = 1000*60*60*24
    const today = milisegPassed/days;
    const bday =  getTime/days;
    console.log(bday); 
   const myDays = today-bday
    const daysIn74 = 74.6 * 365.25;  //tengos los dias en 74 años
    // console.log(daysIn74);
    const dayStillLive =  daysIn74 - myDays //dias que viviré aun
    // console.log(dayStillLive);
    const yearsStillLive = Math.round(dayStillLive/365) ;
    // console.log(yearsStillLive);
    const yearToday = fecha.getFullYear();
    // console.log(yearToday);
    const yearDateDeath = yearToday + yearsStillLive;
   
  
      return yearDateDeath;
   
  })
  this.dayDeath= yearDate;
  // console.log(this.dayDeath);
  
   
  }
  
  
    


}
