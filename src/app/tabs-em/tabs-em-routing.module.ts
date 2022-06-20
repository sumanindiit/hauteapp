import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsEmPage } from './tabs-em.page';

const routes: Routes = [
  {
    path: 'tabs-em',
    component: TabsEmPage,
    children: [
      {
        path: 'em-home',
        loadChildren: () => import('../employee/em-home/em-home.module').then(m => m.EmHomePageModule)
      },
      {
        path: 'em-appliedjobs',
        loadChildren: () => import('../employee/em-appliedjobs/em-appliedjobs.module').then(m => m.EmAppliedjobsPageModule)
      },
      {
        path: 'messages',
        loadChildren: () => import('../messages/messages.module').then(m => m.MessagesPageModule)
      },
      {
        path: 'em-notifications',
        loadChildren: () => import('../employee/em-notifications/em-notifications.module').then(m => m.EmNotificationsPageModule)
      },
      {
        path: 'em-profile',
        loadChildren: () => import('../employee/em-profile/em-profile.module').then(m => m.EmProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/employee/em-home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/employee/em-home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsEmPageRoutingModule {}
