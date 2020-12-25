import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe= new HeroModel();

  constructor(private heroeService: HeroesService,private route: ActivatedRoute) { }

  ngOnInit() {
    const id= this.route.snapshot.paramMap.get('id');

    if (id != 'nuevo') {
      this.heroeService.getHeroe(id).subscribe((resp:HeroModel) => {
        this.heroe=resp;
        this.heroe.id=id;
      });
    }
  }

  guardar(formulario:NgForm){
    if(formulario.invalid){ 
      console.log("El formulario es invalido");
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Cargando',
      icon: 'info',
      allowOutsideClick: false,
    })

    Swal.showLoading();
    
    let peticion: Observable<any>;

  if(this.heroe.id){
    // actualizar heroe
    peticion= this.heroeService.actualizarHeroe(this.heroe);
  }else{
    // Crear heroe
    peticion=this.heroeService.crearHeroe(this.heroe);
  }

  peticion.subscribe(resp =>{
    Swal.fire({
      title: this.heroe.nombre,
      text: 'Actualizado correctamente',
      icon: 'success'
    })
  });

  }

}
