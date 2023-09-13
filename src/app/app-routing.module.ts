import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authenticationGuard } from './guards/authentication.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  // },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tasks',
  },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./pages/sign-in/sign-in.module').then((m) => m.SignInPageModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./pages/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordPageModule
      ),
  },
  {
    path: 'new-password',
    loadChildren: () =>
      import('./pages/new-password/new-password.module').then(
        (m) => m.NewPasswordPageModule
      ),
  },
  {
    path: 'otp',
    loadChildren: () =>
      import('./pages/otp/otp.module').then((m) => m.OtpPageModule),
  },
  {
    canActivate: [authenticationGuard],
    path: 'tasks',
    loadChildren: () =>
      import('./pages/tasks/tasks.module').then((m) => m.TasksPageModule),
  },
  {
    canActivate: [authenticationGuard],
    path: 'track-order',
    loadChildren: () =>
      import('./pages/track-order/track-order.module').then(
        (m) => m.TrackOrderPageModule
      ),
  },
  {
    canActivate: [authenticationGuard],
    path: 'set-location',
    loadChildren: () =>
      import('./pages/set-location/set-location.module').then(
        (m) => m.SetLocationPageModule
      ),
  },
  {
    canActivate: [authenticationGuard],
    path: 'task-location',
    loadChildren: () =>
      import('./pages/task-location/task-location.module').then(
        (m) => m.TaskLocationPageModule
      ),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
