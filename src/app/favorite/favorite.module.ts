import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FavoritePageRoutingModule } from './favorite-routing.module';
import { FavoritePage } from './favorite.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritePageRoutingModule
  ],
  declarations: [FavoritePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FavoritePageModule {}
