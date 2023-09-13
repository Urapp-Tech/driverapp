import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  // },
  {
    path: '',
    loadChildren: () =>
      import('./pages/sign-in/sign-in.module').then((m) => m.SignInPageModule),
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
    path: 'tasks',
    loadChildren: () =>
      import('./pages/tasks/tasks.module').then((m) => m.TasksPageModule),
  },
  {
    path: 'track-order',
    loadChildren: () =>
      import('./pages/track-order/track-order.module').then(
        (m) => m.TrackOrderPageModule
      ),
  },
  {
    path: 'set-location',
    loadChildren: () =>
      import('./pages/set-location/set-location.module').then(
        (m) => m.SetLocationPageModule
      ),
  },
  {
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
