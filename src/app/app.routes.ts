import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { AboutComponent } from './home/about/about.component';
import { ContactComponent } from './home/contact/contact.component';
import { MenuComponent } from './home/menu/menu.component';
import { ItemComponent } from './home/menu/item/item.component';
import { CategoriesComponent } from './home/menu/categories/categories.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CartComponent } from './home/cart/cart.component';
import { OffersComponent } from './home/menu/offers/offers.component';
import { AdminSignInComponent } from './admin/admin-sign-in/admin-sign-in.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AddProductComponent } from './admin/admin-home/add-product/add-product.component';
import { AddOfferComponent } from './admin/admin-home/add-offer/add-offer.component';
import { AdminOrdersComponent } from './admin/admin-home/admin-orders/admin-orders.component';
import { AdminContactComponent } from './admin/admin-home/admin-contact/admin-contact.component';
import { AdminCanService } from './services/admin-can.service';
import { HttpClient } from '@angular/common/http';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: HomePageComponent, title: 'Home' },
      {
        path: 'menu',
        component: MenuComponent,
        title: 'Menu',
        children: [
          { path: '', component: CategoriesComponent, title: 'Menu' },
          {
            path: 'offers/:id',
            component: OffersComponent,
            title: 'Offers',
          },
          { path: ':id', component: ItemComponent, title: 'Menu' },
        ],
      },
      { path: 'about', component: AboutComponent, title: 'About' },
      { path: 'contact', component: ContactComponent, title: 'Contact' },
      { path: 'cart', component: CartComponent, title: 'Cart' },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    title: 'Admin',

    children: [
      {
        path: '',
        component: AdminHomeComponent,
        title: 'Admin Home',
        canActivate: [AdminCanService],
        children: [
          {
            path: 'add-product',
            component: AddProductComponent,
            title: 'Add-Product',
          },
          {
            path: 'add-offer',
            component: AddOfferComponent,
            title: 'Add-Offer',
          },
          {
            path: 'admin-orders',
            component: AdminOrdersComponent,
            title: 'Admin Orders',
          },
          {
            path: 'admin-contact',
            component: AdminContactComponent,
            title: 'Admin-Contact',
          },
        ],
      },
      {
        path: 'sign-in',
        component: AdminSignInComponent,
        title: 'Admin Sign-In',
      },
    ],
  },
  { path: '**', component: NotFoundComponent, title: '404' },
];
