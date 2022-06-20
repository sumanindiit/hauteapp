import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tabs-em',
    loadChildren: () => import('./tabs-em/tabs-em.module').then(m => m.TabsEmPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'getstarted',
    loadChildren: () => import('./getstarted/getstarted.module').then( m => m.GetstartedPageModule)
  },
 
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'subscription',
    loadChildren: () => import('./subscription/subscription.module').then( m => m.SubscriptionPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'post-job',
    loadChildren: () => import('./post-job/post-job.module').then( m => m.PostJobPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'add-payment-card',
    loadChildren: () => import('./add-payment-card/add-payment-card.module').then( m => m.AddPaymentCardPageModule)
  },
  {
    path: 'payment-succesfull',
    loadChildren: () => import('./payment-succesfull/payment-succesfull.module').then( m => m.PaymentSuccesfullPageModule)
  },
  {
    path: 'myapplicants',
    loadChildren: () => import('./myapplicants/myapplicants.module').then( m => m.MyapplicantsPageModule)
  },
  {
    path: 'edit-job',
    loadChildren: () => import('./edit-job/edit-job.module').then( m => m.EditJobPageModule)
  },

  {
    path: 'changepassword',
    loadChildren: () => import('./changepassword/changepassword.module').then( m => m.ChangepasswordPageModule)
  },
  {
    path: 'companyinformation',
    loadChildren: () => import('./companyinformation/companyinformation.module').then( m => m.CompanyinformationPageModule)
  },
  {
    path: 'pushnotifications',
    loadChildren: () => import('./pushnotifications/pushnotifications.module').then( m => m.PushnotificationsPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'mysubscription',
    loadChildren: () => import('./mysubscription/mysubscription.module').then( m => m.MysubscriptionPageModule)
  },
  {
    path: 'packages',
    loadChildren: () => import('./packages/packages.module').then( m => m.PackagesPageModule)
  },
  {
    path: 'applicantdetails',
    loadChildren: () => import('./applicantdetails/applicantdetails.module').then( m => m.ApplicantdetailsPageModule)
  },
  {
    path: 'basicinformation',
    loadChildren: () => import('./basicinformation/basicinformation.module').then( m => m.BasicinformationPageModule)
  },
  {
    path: 'resume',
    loadChildren: () => import('./resume/resume.module').then( m => m.ResumePageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'chat/:threadId',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'add-card',
    loadChildren: () => import('./add-card/add-card.module').then( m => m.AddCardPageModule)
  },
  {
    path: 'jobdetails',
    loadChildren: () => import('./jobdetails/jobdetails.module').then( m => m.JobdetailsPageModule)
  },
  {
    path: 'em-home',
    loadChildren: () => import('./employee/em-home/em-home.module').then( m => m.EmHomePageModule)
  },
  {
    path: 'em-appliedjobs',
    loadChildren: () => import('./employee/em-appliedjobs/em-appliedjobs.module').then( m => m.EmAppliedjobsPageModule)
  },
  {
    path: 'searchjobs',
    loadChildren: () => import('./searchjobs/searchjobs.module').then( m => m.SearchjobsPagodule)
  },
  {
    path: 'em-subscription',
    loadChildren: () => import('./employee/em-subscription/em-subscription.module').then( m => m.EmSubscriptionPageModule)
  },
  {
    path: 'my-jobs',
    loadChildren: () => import('./my-jobs/my-jobs.module').then( m => m.MyJobsPageModule)
  },
  {
    path: 'em-all-jobs',
    loadChildren: () => import('./employee/em-all-jobs/em-all-jobs.module').then( m => m.EmAllJobsPageModule)
  },
  {
    path: 'em-basic-information',
    loadChildren: () => import('./employee/em-basic-information/em-basic-information.module').then( m => m.EmBasicInformationPageModule)
  },
  {
    path: 'em-job-details/:jobId',
    loadChildren: () => import('./employee/em-job-details/em-job-details.module').then( m => m.EmJobDetailsPageModule)
  },
  {
    path: 'em-profile',
    loadChildren: () => import('./employee/em-profile/em-profile.module').then( m => m.EmProfilePageModule)
  },
  {
    path: 'em-notifications',
    loadChildren: () => import('./employee/em-notifications/em-notifications.module').then( m => m.EmNotificationsPageModule)
  },
  {
    path: 'em-pushnotifications',
    loadChildren: () => import('./employee/em-pushnotifications/em-pushnotifications.module').then( m => m.EmPushnotificationsPageModule)
  },
  {
    path: 'em-resume',
    loadChildren: () => import('./employee/em-resume/em-resume.module').then( m => m.EmResumePageModule)
  },
  {
    path: 'em-my-subscription',
    loadChildren: () => import('./employee/em-my-subscription/em-my-subscription.module').then( m => m.EmMySubscriptionPageModule)
  },
  {
    path: 'em-packages',
    loadChildren: () => import('./employee/em-packages/em-packages.module').then( m => m.EmPackagesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
