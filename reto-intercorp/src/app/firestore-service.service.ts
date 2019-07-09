import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {  BehaviorSubject } from 'rxjs';


interface clients {
  name: string,
  lastname: string,
   age:number,
  birthdate:number,
  death:number
  }

@Injectable({
  providedIn: 'root'
})


export class FirestoreServiceService {
  public client1 : clients[] = [];
  public client = {
    name: '',
    lastname: '',
    age: 0,
    birthdate: '',
    death :'',
  };
  public dayDeath :number;
  public averageClients : number;
  public total : number;
// promedio de edad 
  public ageClient = new BehaviorSubject(0);
  currentageClient = this.ageClient.asObservable()
// desviacion standar
  public sd = new BehaviorSubject(0);
  currentSd = this.sd.asObservable()
//fecha de muerte
private death = new  BehaviorSubject(0) ;
currentDeath = this.death.asObservable();


  constructor(public firestore: AngularFirestore) { }
  sendValueClient(name:string,lastname:string,age:number,birthdate:number){
    const newRegister ={
      ...this.client,
      name:name,
      lastname:lastname,
      age:age,
      birthdate:birthdate,
      // death:death,
    };
    
    this.firestore.collection('register').add(newRegister);
  
  }
  // showNewObject(arrayObject){
  //   this.producto.push(arrayObject);
  //   this.tablaPedido.next(this.producto);
  //   this.sumTotal();
  //   // sumTotal();
  //   // console.log("estoy en un servidor",this.order);
    
  // }

  
  
  // cantidad(objProd,cantidad){
  //   this.producto=this.producto.map(elem=>{
  //    if(elem.nombre === objProd.nombre){
  //      const newObj={
  //       ...elem,
  //       cantidad: parseInt(cantidad),
  //       subtotal: parseInt(cantidad)*elem.precio
  //      }
  //     return newObj ;
  //    }
  //    return elem;
  //  })
  //  console.log("aqui thisproducto",this.producto);
  //  this.tablaPedido.next(this.producto)
  //   this.sumTotal();
  //   }


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
  // console.log(powAverage);
  const sdNumerator = data.map(ele=> Math.pow(ele.age-powAverage,2))
  const sumsdNumerator = sdNumerator.reduce((ele1,ele2)=>ele1+ele2)
  const sdTotal= Math.round(Math.sqrt(sumsdNumerator / data.length))
  this.total = sdTotal
  this.sd.next(this.total)
  // console.log(this.total)
  // console.log(sdTotal )
 }


}


