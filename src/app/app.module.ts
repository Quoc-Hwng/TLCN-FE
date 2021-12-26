import { ModalDetailComponent } from './main/detail/modal-detail/modal-detail.component';
import { MessageComponent } from './components/message/message.component';
import { TopbarComponent } from './main/topbar/topbar.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

import { BodyHomeComponent } from './body-home/body-home.component';
// import {IvyCarouselModule} from 'angular-responsive-carousel';
import { ProductDisplayComponent } from './components/product-display/product-display.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CarouselModule} from 'primeng/carousel';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {ImageModule} from 'primeng/image';
import {LoginComponent} from './components/login/login.component';
import {DialogModule} from 'primeng/dialog';
import { HttpClientModule } from '@angular/common/http';
import { RestApiService } from './service/rest-api.service';
import { DataService } from './service/data.service';
import { RegisterComponent } from './components/register/register.component';
import { DetailComponent } from './main/detail/detail.component';
import { HomeComponent } from './main/home/home.component';
import { NavbarComponent } from './main/navbar/navbar.component';
import { FilterBarComponent } from './main/filter-bar/filter-bar.component';
import { FooterComponent } from './main/footer/footer.component';
import { CartComponent } from './main/cart/cart.component';
import { CheckoutComponent } from './main/checkout/checkout.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { FilterPipe } from './shared/filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import {SliderModule} from 'primeng/slider';
import { InformationComponent } from './main/information/information.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ChangePasswordComponent } from './main/information/changePassword/changePassword.component';
import { ProfileComponent } from './main/information/profile/profile.component';
import { OrderHistoryComponent } from './main/information/order-history/order-history.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/forgot-password/reset-password/reset-password.component';
import { AboutComponent } from './main/about/about.component';
import { NewComponent } from './main/New/New.component';
import { DetailCartComponent } from './main/information/order-history/detail-cart/detail-cart.component';
import { ToastrModule } from 'ngx-toastr';
import { RegisterEmailComponent } from './components/register/register-email/register-email.component';
import { OrderTrackingComponent } from './components/order-tracking/order-tracking.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { VoucherComponent } from './main/information/voucher/voucher.component';


@NgModule({
  declarations: [
    AppComponent,
    BodyHomeComponent,
    ProductDisplayComponent,
    LoginComponent,
    RegisterComponent,
    TopbarComponent,
    DetailComponent,
    HomeComponent,
    NavbarComponent,
    FilterBarComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    SearchProductComponent,
    FilterPipe,
    InformationComponent,
    PageNotFoundComponent,
    ProfileComponent,
    ChangePasswordComponent,
    OrderHistoryComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AboutComponent,
    NewComponent,
    DetailCartComponent,
    MessageComponent,
    RegisterEmailComponent,
    OrderTrackingComponent,
    ModalDetailComponent,
    VoucherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    NgbModule,
    CarouselModule,
    ButtonModule,
    ToastModule,
    FormsModule,
    NgbModule,
    SliderModule,
    DialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    NgxPayPalModule,
    ToastrModule.forRoot({
    }),
  ],
  providers: [RestApiService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
