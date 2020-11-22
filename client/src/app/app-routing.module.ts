import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorTestComponent } from './core/error-test/error-test.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { HomeComponent } from './Home/Home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'test-error', component: ErrorTestComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'shop' , loadChildren: () => import('./shop/shop.module').then(module => module.ShopModule)},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
