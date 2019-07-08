import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterNewClientComponent } from './data/register-new-client/register-new-client.component';
import {StatisticsComponent} from './data/statistics/statistics.component';
import {ListClientComponent} from './data/list-client/list-client.component';


const routes: Routes = [
  { path: '', component: RegisterNewClientComponent },
  { path: 'listClientcomponent', component: ListClientComponent },
  { path: 'statisticscomponent', component: StatisticsComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
