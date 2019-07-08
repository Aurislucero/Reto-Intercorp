import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class FirestoreServiceService {

  public client = {
    name: '',
    lastname: '',
    age: 0,
    birthdate: '',
  };
  public averageClients : number;
  public total : number;
// promedio de edad 
  public ageClient = new BehaviorSubject(0);
  currentageClient = this.ageClient.asObservable()
// desviacion standar
  public sd = new BehaviorSubject(0);
  currentSd = this.sd.asObservable()


  constructor(public firestore: AngularFirestore) { }
  sendValueClient(name:string,lastname:string,age:number,birthdate:number){
    const newRegister ={
      ...this.client,
      name:name,
      lastname:lastname,
      age:age,
      birthdate:birthdate,
    };
    console.log(newRegister);
    this.firestore.collection('register').add(newRegister);
  }

  getvalueclient() {
    return this.firestore.collection('register').valueChanges();
  }

 averageAritmeticClients(data){
  let ageClient = 0;
  for(let i=0;i<data.length;i++){ageClient += parseInt(data[i].age);}
  this.averageClients =  ageClient/data.length;  
  this.ageClient.next(Math.round(this.averageClients));
  return this.averageClients;
 }

 standarDesviation(data){
  const average = this.averageAritmeticClients(data);
  const powAverage = Math.round(average);
  console.log(powAverage);
  const sdNumerator = data.map(ele=> Math.pow(ele.age-powAverage,2))
  const sumsdNumerator = sdNumerator.reduce((ele1,ele2)=>ele1+ele2)
  const sdTotal= Math.round(Math.sqrt(sumsdNumerator / data.length))
  this.total = sdTotal
  this.sd.next(this.total)
  // console.log(this.total)
  // console.log(sdTotal 
 }

}


