import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-details',
  templateUrl: './poke-details.component.html',
  styleUrls: ['./poke-details.component.scss']
})
export class PokeDetailsComponent implements OnInit {

  pokemon:any ='';
  pokemonType =[];
  pokemonImg ='';

  constructor(private pokemonServices:PokemonService, private activateRouter:ActivatedRoute) {

    this.activateRouter.params.subscribe(params => {
      this.getPokemon(params['id']);
       }
     );
  }

  ngOnInit(): void {
  }

  getPokemon(id:number){
    this.pokemonServices.getPokemons(id).subscribe(res => {
      this.pokemon=res;
      this.pokemonImg =this.pokemon.sprites.front_default;
      this.pokemonType= res.types[0].type.name;

      console.log(res)
    }, err => {
      console.log(err)
    }

    );
  }
}
