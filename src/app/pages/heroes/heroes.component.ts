import { Component, OnInit } from '@angular/core';
import { HeroModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroModel[]=[];
  cargando= false;
  
  constructor(private heroeService: HeroesService) { }

  ngOnInit() {
    this.cargando=true;
    this.heroeService.getHeroes().subscribe(resp =>{
      console.log(resp);
      this.heroes=resp;
      this.cargando=false;
    });
  }

  borrarHeroe(heroe: HeroModel, i: number){
    
    Swal.fire({
      title: 'Eliminar',
      text: `¿Desea borrar el héroe ${heroe.nombre}?`,
      showConfirmButton: true,
      showCancelButton:true
    }).then(resp =>{

      if (resp.value) {
        this.heroes.splice(i,1);
        this.heroeService.borrarHeroe(heroe.id).subscribe();
      }

    });
  }

}
