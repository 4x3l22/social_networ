import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login';
import { StartComponent } from './views/start/start';
import { authGuard } from './guards/authGuard';
import { HomeComponent } from './views/home/home';
import { PublicationsComponent } from './views/publications/publications';

export const routes: Routes = [
    { 
        path: 'start', 
        component: StartComponent,
        canActivate: [authGuard],
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'publications', component: PublicationsComponent }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
