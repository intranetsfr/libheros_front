import { Routes } from '@angular/router';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './users/auth/auth.component';
import { guardGuard } from './auth/guard.guard';
import { SubscribeComponent } from './users/subscribe/subscribe.component';

export const routes: Routes = [
    { path: '', component: HomeComponent,canActivate: [guardGuard],},
    { path: 'auth', component: AuthComponent },
    { path: 'subscribe', component: SubscribeComponent },
    { path: '**', component: NotfoundComponent }, 
];
