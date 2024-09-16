import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ModuleWithProviders } from "@angular/core";
import { ProfileComponent } from "./profile/profile.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { AuthGuard } from "./guards/auth.guard";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: TodoListComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(APP_ROUTES);