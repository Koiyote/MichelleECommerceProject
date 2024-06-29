import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NaviBarComponent } from './navi-bar/navi-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import {NgOptimizedImage} from "@angular/common";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import {ProductService} from "./services/product.service";
import { ProductViewComponent } from './components/product-view/product-view.component';
import {HttpClientModule} from "@angular/common/http";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FooterComponent } from './footer/footer.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';




const Routes: Routes = [
  {path: 'search/:keyword', component: ProductViewComponent},
  { path: 'product-category/:id', component: ProductViewComponent},
  { path: 'product-category', component: ProductViewComponent},
  {path: '**', component: ProductViewComponent},
  { path: '', redirectTo: '/products', pathMatch:  'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    NaviBarComponent,
    ProductViewComponent,
    ProductViewComponent,
    SearchBarComponent,
    FooterComponent,
    ProductCategoryMenuComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    NgOptimizedImage,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterModule.forRoot(Routes),
    HttpClientModule,
    MatGridTile,
    MatGridList

  ],
  providers: [
    ProductService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
