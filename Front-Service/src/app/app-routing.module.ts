import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './_helpers';
import { NavbarsComponent } from './_nav/navbars/navbars.component';

const routes: Routes = [
    {
      path: '',
      component: NavbarsComponent,
      canActivate: [AuthGuard],
      children: [
        { path: 'home', component: HomeComponent },
      ]
    },

    { path: 'login', component: LoginComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
