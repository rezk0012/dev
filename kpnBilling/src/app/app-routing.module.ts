import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StationListComponent } from './components/station-list/station-list.component';
import { AddStationComponent } from './components/add-station/add-station.component';
import { StationDetailComponent } from './components/station-detail/station-detail.component';


const routes: Routes = [
  { path: '', component: StationListComponent },
  { path: 'add', component: AddStationComponent },
  { path: 'list', component: StationListComponent },
  { path: 'detail/:id', component: StationDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
