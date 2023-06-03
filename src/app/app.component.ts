import { Component } from '@angular/core';
import { Instruccion } from './Models/instruccion';
import { ALU } from './Models/alu';
import { Memoria } from './Models/memoria';
import { AlmacenGeneral } from './Models/almacen-general';
import { ElementoProcesador } from './Enums/elemento-procesador';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // Elementos de la interfaz
  instrucciones: string = '';
  elementoActivo!: ElementoProcesador;
  habilitarBtnEjecutar: boolean = true;
  habilitarBtnPausar: boolean = false;
  habilitarBtnReanudar: boolean = false;

  // Elementos del procesador
  PC: Number = 1;
  MAR: Number = 1;
  MBR: Number = 1;
  IR: Instruccion | undefined;
  ALU: ALU = new ALU();
  memoria: Memoria = new Memoria();
  almacenGeneral: AlmacenGeneral = new AlmacenGeneral;

  hayLineaPorEjecutar() {}

  cargarYEjecutarPrograma() {
    this.habilitarBtnEjecutar = false;
    this.habilitarBtnPausar = true;
    this.guardarInstruccionesEnMemoria();
    this.ejecutarPrograma();
  }

  guardarInstruccionesEnMemoria() {
    this.memoria = new Memoria();
    let instruccionesArray = this.instrucciones.split('\n');
    instruccionesArray.forEach((instruccion) => {
      this.memoria.agregarInstruccion(instruccion);
    });
  }

  pausarPrograma() {
    this.habilitarBtnPausar = false;
    this.habilitarBtnReanudar = true;
  }

  reanudarPrograma() {
    this.habilitarBtnPausar = true;
    this.habilitarBtnReanudar = false;
  }

  ejecutarPrograma() {}
}
