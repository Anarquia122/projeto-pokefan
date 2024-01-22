import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { RecompensasComponent } from './recompensas/recompensas.component';
import { SegredoComponent } from './segredo/segredo.component';

export const routes: Routes = [
    { path:'', component:InicioComponent },
    { path:'pokedex', component:PokedexComponent },
    { path:'recompensas', component:RecompensasComponent },
    { path:'segredo', component:SegredoComponent }
];
