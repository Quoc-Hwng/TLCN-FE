import { NewComponent } from './main/New/New.component';
import { CheckoutComponent } from './main/checkout/checkout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyHomeComponent } from './body-home/body-home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './main/cart/cart.component';
import { DetailComponent } from './main/detail/detail.component';
import { HomeComponent } from './main/home/home.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { InformationComponent } from './main/information/information.component';
import { ProfileComponent } from './main/information/profile/profile.component';
import { ChangePasswordComponent } from './main/information/changePassword/changePassword.component';
import { OrderHistoryComponent } from './main/information/order-history/order-history.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/forgot-password/reset-password/reset-password.component';
import { AboutComponent } from './main/about/about.component';
import { RegisterEmailComponent } from './components/register/register-email/register-email.component';
import { OrderTrackingComponent } from './components/order-tracking/order-tracking.component';
import { ReadNewComponent } from './main/New/read-new/read-new.component';


const routes: Routes = [
  { path: 'new', component: NewComponent },
  { path: 'about', component: AboutComponent },
  { path: 'checkout', component:CheckoutComponent  },
  { path: 'cart', component:CartComponent  },
  { path: 'homes', component: HomeComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: '', component: BodyHomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'registerEmail/:token', component: RegisterEmailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchProductComponent },
  { path: 'information', component: InformationComponent, children: [
    { path: 'profile', component: ProfileComponent},
    { path: 'changPassword', component: ChangePasswordComponent},
    { path: 'history', component: OrderHistoryComponent},
  ]},
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'resetPassword/:token', component: ResetPasswordComponent },
  { path: 'tracking', component: OrderTrackingComponent},
  { path: 'news/:id', component: ReadNewComponent },
  { path: '**', component: PageNotFoundComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
