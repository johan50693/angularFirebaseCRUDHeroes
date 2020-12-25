import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url= 'https://angularlogin-aae0b.firebaseio.com';

  constructor(private http: HttpClient) { 

  }

  crearHeroe(heroe: HeroModel){
    return this.http.post(`${this.url}/heroes.json`,heroe).pipe(
      map( (resp: any) =>{
        heroe.id= resp.name;
        return heroe;
      })
    );
  }

  actualizarHeroe(heroe: HeroModel){

    const heroeTemp={
      ...heroe
    }

    delete heroeTemp.id;
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`,heroeTemp);
  }

  getHeroes(){
    return this.http.get(`${this.url}/heroes.json`).pipe(
      map(resp => {
        // console.log(resp);
        return this.createArreglo(resp);
      })
    );
  }

  getHeroe(id: string){
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  borrarHeroe(id: string){
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  private createArreglo(heroeObj: object){

    const heroes : HeroModel[]=[];
    if(heroeObj === null){ return [];}

    Object.keys(heroeObj).forEach( key => {
      // console.log(key);
      const heroe= heroeObj[key];
      heroe.id=key;
      heroes.push(heroe);
    });

    return heroes;
  }

}
