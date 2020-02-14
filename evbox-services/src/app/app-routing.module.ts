import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketFormComponent } from './components/ticket-form/ticket-form.component';
import { TsFormComponent } from './components/ts-form/ts-form.component';
import { MenuComponent } from './components/menu/menu.component';


const routes: Routes = [
  {path:'tickets', component:TicketFormComponent}, 
  {path:'troubleshooting', component: TsFormComponent}, 
  {path:'', component:MenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
