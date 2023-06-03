import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EjecutarTareaService {

  constructor() { }

  ejecutarTareaDespuesDeCiertoTiempo(tarea: CallableFunction) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        tarea();
        resolve(undefined);
      }, 2000);
    });
  }
}
