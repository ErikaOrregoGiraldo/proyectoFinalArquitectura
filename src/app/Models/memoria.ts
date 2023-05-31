import { Instruccion } from "./instruccion";

export class Memoria {
  celdas: Array<Instruccion> = new Array<Instruccion>();

  agregarInstruccion(instruccion: String) {
    this.celdas.push(new Instruccion(instruccion));
  }

  obtenerInstruccion(direccion: Number) {
    return this.celdas[direccion.valueOf()];
  }
}
