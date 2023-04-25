import { Component, OnInit, ViewChild, Injectable   } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';


@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss']
})
export class PokeTableComponent implements OnInit {


  //columnsas que se muestran
  displayedColumns: string[] = ["position","image","name"];

  // arreglo con la data que viene de la aip, se incializa el aray como vacio
  data: any[]=[];

  //configuración del dataSource
  dataSource = new MatTableDataSource<any>(this.data);

  //paginacion del las tablas
  @ViewChild(MatPaginator, { static: true }) paginator!:MatPaginator;

  //pokemons
  pokemons = [];
  filterValue: string = '';

  constructor(private pokeServices: PokemonService, private router:Router) {}

  ngOnInit(): void {
    const storedFilterValue = localStorage.getItem('filterValue');
    this.filterValue = storedFilterValue ? storedFilterValue.trim().toLowerCase() : '';
    console.log('valor almacenado', this.filterValue);
    this.applyFilter();
  }

  ngAfterViewInit() {
    this.getPokemons();
  }

  ngOnDestroy(): void {
    localStorage.removeItem('filterValue');
  }

  applyFilter() {
    this.dataSource.filter = this.filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    localStorage.setItem('filterValue', this.filterValue);
  }

  onFilterInputChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.filterValue = inputValue ? inputValue.trim().toLowerCase() : '';
    this.applyFilter();
  }


getPokemons(){

  let pokemonData;

    for(let i = 1; i <=150; i++){
      this.pokeServices.getPokemons(i).subscribe(
        res =>{

          pokemonData ={
            position: i,
            image: res.sprites.front_default,
            name: res.name
          };

          this.data.push(pokemonData);
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
          this.applyFilter();
      },
          err => {
            console.log(err);

          });
  }
}

reloadTable(){
  this.getPokemons();
}

// applyFilter(event: Event) {
//   const filterValue = (event.target as HTMLInputElement).value;
//   this.dataSource.filter = filterValue.trim().toLowerCase();

//   if (this.dataSource.paginator) {
//     this.dataSource.paginator.firstPage();
//   }
// }

getRow(row: any){
  this.router.navigateByUrl(`pokedetails/${row.position}`);

}

}
