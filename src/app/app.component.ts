import { Component } from '@angular/core';
import { Instruccion } from './Models/instruccion';
import { ALU } from './Models/alu';
import { Memoria } from './Models/memoria';
import { AlmacenGeneral } from './Models/almacen-general';
import { ElementoProcesador } from './Enums/elemento-procesador';
import { EstadoComputador } from './Enums/estado-computador';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  PC: Number = 1;
  MAR: Number = 1;
  MBR: Number = 1;
  IR: Instruccion | undefined;
  ALU: ALU = new ALU;
  memoria: Memoria = new Memoria;
  almacenGeneral: AlmacenGeneral = new AlmacenGeneral;
  elementoActivo!: ElementoProcesador;
  estado!: EstadoComputador;

  hayLineaPorEjecutar(){}

  ejecutarLinea(){}

  asignarInstrucciones(instrucciones: string){
    let instruccionesArray = instrucciones.split('\n');
    instruccionesArray.forEach((instruccion) => {
      this.memoria.agregarInstruccion(instruccion);
    });
  }

  cargarPrograma(){}
}
