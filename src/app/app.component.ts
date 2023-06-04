import { Component } from '@angular/core';
import { Instruccion } from './Models/instruccion';
import { ALU } from './Models/alu';
import { Memoria } from './Models/memoria';
import { AlmacenGeneral } from './Models/almacen-general';
import { ElementoProcesador } from './Enums/elemento-procesador';
import { EjecutarTareaService } from './Services/ejecutar-tarea.service';
import { EstadoComputador } from './Enums/estado-computador';
import { OperacionInstruccion } from './Enums/operacion-instruccion';
import { VariableInstruccion } from './Enums/variable-instruccion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  // Elementos de la interfaz
  instruccionesIntroducidas: string = '';
  elementoActivo: ElementoProcesador;
  estadoComputador: EstadoComputador;

  // Elementos del procesador
  PC: number = 0;
  MAR: number = 0;
  MBR: Instruccion | undefined;
  IR: Instruccion | undefined;
  ALU: ALU = new ALU();
  memoria: Memoria = new Memoria();
  almacenGeneral: AlmacenGeneral = new AlmacenGeneral();

  constructor(private ejecutarTareaService: EjecutarTareaService) {
    this.estadoComputador = EstadoComputador.SIN_INICIAR;
    this.elementoActivo = ElementoProcesador.UNIDAD_CONTROL;
  }

  cargarYEjecutarInstrucciones() {
    this.estadoComputador = EstadoComputador.EN_EJECUCION;
    this.guardarInstruccionesEnMemoria();
    this.ejecutarInstruccionesGuardadas();
  }

  private guardarInstruccionesEnMemoria() {
    this.memoria = new Memoria();
    let instruccionesArray = this.instruccionesIntroducidas.split('\n');
    instruccionesArray.forEach((instruccion) => {
      this.memoria.agregarInstruccion(instruccion);
    });
  }

  private hayLineaPorEjecutar() {
    return this.PC < this.memoria.celdas.length;
  }

  private async ejecutarInstruccionesGuardadas() {
    await this.ejecutarTareaService.ejecutarTareaDespuesDeCiertoTiempo(() => {
      this.elementoActivo = ElementoProcesador.PC;
    })
    await this.ejecutarTareaService.ejecutarTareaDespuesDeCiertoTiempo(() => {
      this.elementoActivo = ElementoProcesador.MAR;
    })
    await this.ejecutarTareaService.ejecutarTareaDespuesDeCiertoTiempo(() => {
      this.elementoActivo = ElementoProcesador.BUS_DIRECCIONES;
    })
    await this.ejecutarTareaService.ejecutarTareaDespuesDeCiertoTiempo(() => {
      this.elementoActivo = ElementoProcesador.MEMORIA;
    })
    await this.ejecutarTareaService.ejecutarTareaDespuesDeCiertoTiempo(() => {
      this.elementoActivo = ElementoProcesador.BUS_DATOS;
    })
    await this.ejecutarTareaService.ejecutarTareaDespuesDeCiertoTiempo(() => {
      this.elementoActivo = ElementoProcesador.MBR;
    })
    await this.ejecutarTareaService.ejecutarTareaDespuesDeCiertoTiempo(() => {
      this.MBR = this.memoria.obtenerInstruccion(this.PC);
    })
    await this.ejecutarTareaService.ejecutarTareaDespuesDeCiertoTiempo(() => {
      this.elementoActivo = ElementoProcesador.IR;
    })
    await this.ejecutarTareaService.ejecutarTareaDespuesDeCiertoTiempo(() => {
      this.IR = this.MBR;
    })
    await this.ejecutarTareaService.ejecutarTareaDespuesDeCiertoTiempo(() => {
      this.elementoActivo = ElementoProcesador.UNIDAD_CONTROL;
    })
    await this.ejecutarTareaService.ejecutarTareaDespuesDeCiertoTiempo(() => {
      this.ejecutarInstruccion();
    })
    await this.ejecutarTareaService.ejecutarTareaDespuesDeCiertoTiempo(() => {
      this.elementoActivo = ElementoProcesador.UNIDAD_CONTROL;
    })
    if (this.hayLineaPorEjecutar()) {
      this.PC++;
      this.ejecutarInstruccionesGuardadas();
    }
  }

  private ejecutarInstruccion(): void {
    if (this.IR == undefined) {
      return;
    }
    const operacion = this.IR.operacion;
    const operando1: number | VariableInstruccion | undefined = this.IR.operando1;
    const operando2: number | VariableInstruccion | undefined = this.IR.operando2;
    const operando3: number | VariableInstruccion | undefined = this.IR.operando3;

    switch (operacion) {
      case OperacionInstruccion.LOAD:
        this.ejecutarInstruccionLoad(operando1, operando2);
        break;
      case OperacionInstruccion.ADD:
        this.ejecutarInstruccionMatematica(OperacionInstruccion.ADD, operando1, operando2, operando3);
        break;
      default:
        break;
    }
  }


  // Ejecucion de instrucciones
  // -------------------------------
  // -------------------------------
  // -------------------------------
  // -------------------------------
  private async ejecutarInstruccionLoad(variableAGuardar: number | VariableInstruccion | undefined, numero: number | VariableInstruccion | undefined): Promise<void> {
    debugger
    if (variableAGuardar == undefined || numero == undefined) {
      return;
    }
    await this.ejecutarTareaService.ejecutarTareaDespuesDeCiertoTiempo(() => {
      this.elementoActivo = ElementoProcesador.ALMACEN_GENERAL;
    })
    await this.ejecutarTareaService.ejecutarTareaDespuesDeCiertoTiempo(() => {
      switch(variableAGuardar) {
        case VariableInstruccion.A:
          this.almacenGeneral.A = numero;
          break;
        case VariableInstruccion.B:
          this.almacenGeneral.B = numero;
          break;
        case VariableInstruccion.C:
          this.almacenGeneral.C = numero;
          break;
        case VariableInstruccion.D:
          this.almacenGeneral.D = numero;
          break;
        case VariableInstruccion.E:
          this.almacenGeneral.E = numero;
          break;
        case VariableInstruccion.F:
          this.almacenGeneral.F = numero;
          break;
        case VariableInstruccion.G:
          this.almacenGeneral.G = numero;
          break;
        case VariableInstruccion.H:
          this.almacenGeneral.H = numero;
          break;
        default:
          break;
      }
    })
  }

  private async ejecutarInstruccionMatematica(tipoOperacion: OperacionInstruccion, primeraVariable: number | VariableInstruccion | undefined, segundaVariable: number | VariableInstruccion | undefined, variableDestino: number | VariableInstruccion | undefined): Promise<void> {
    if (primeraVariable == undefined || segundaVariable == undefined) {
      return;
    }
    switch(variableDestino) {
      case VariableInstruccion.A:
        this.almacenGeneral.A = await this.ejecutarOperacionALU(tipoOperacion, primeraVariable, segundaVariable);
        break;
      case VariableInstruccion.B:
        this.almacenGeneral.B = await this.ejecutarOperacionALU(tipoOperacion, primeraVariable, segundaVariable);
        break;
      case VariableInstruccion.C:
        this.almacenGeneral.C = await this.ejecutarOperacionALU(tipoOperacion, primeraVariable, segundaVariable);
        break;
      case VariableInstruccion.D:
        this.almacenGeneral.D = await this.ejecutarOperacionALU(tipoOperacion, primeraVariable, segundaVariable);
        break;
      case VariableInstruccion.E:
        this.almacenGeneral.E = await this.ejecutarOperacionALU(tipoOperacion, primeraVariable, segundaVariable);
        break;
      case VariableInstruccion.F:
        this.almacenGeneral.F = await this.ejecutarOperacionALU(tipoOperacion, primeraVariable, segundaVariable);
        break;
      case VariableInstruccion.G:
        this.almacenGeneral.G = await this.ejecutarOperacionALU(tipoOperacion, primeraVariable, segundaVariable);
        break;
      case VariableInstruccion.H:
        this.almacenGeneral.H = await this.ejecutarOperacionALU(tipoOperacion, primeraVariable, segundaVariable);
        break;
      default:
        break;
    }
  }

  private async ejecutarOperacionALU(operacion: OperacionInstruccion, numero1: number | VariableInstruccion | undefined, numero2: number | VariableInstruccion | undefined): Promise<number> {
    if (numero1 == undefined || numero2 == undefined) {
      return 0;
    }
    await this.ejecutarTareaService.ejecutarTareaDespuesDeCiertoTiempo(() => {
      this.elementoActivo = ElementoProcesador.ALU;
    })
    await this.ejecutarTareaService.ejecutarTareaDespuesDeCiertoTiempo(() => {
      this.elementoActivo = ElementoProcesador.ALMACEN_GENERAL;
    })
    const resultadoOperacion = this.ALU.ejecutarOperacion(operacion, numero1, numero2);
    return resultadoOperacion;
  }

  private async ejecutarInstruccionMove(variableOrigen: number | VariableInstruccion | undefined, variableDestino: number | VariableInstruccion | undefined): Promise<void> {
    if (variableOrigen == undefined || variableDestino == undefined) {
      return;
    }
    await this.ejecutarTareaService.ejecutarTareaDespuesDeCiertoTiempo(() => {
      this.elementoActivo = ElementoProcesador.ALMACEN_GENERAL;
    })
    switch(variableDestino) {
      case VariableInstruccion.A:
        this.almacenGeneral.A = variableOrigen;
        break;
      case VariableInstruccion.B:
        this.almacenGeneral.B = variableOrigen;
        break;
      case VariableInstruccion.C:
        this.almacenGeneral.C = variableOrigen;
        break;
      case VariableInstruccion.D:
        this.almacenGeneral.D = variableOrigen;
        break;
      case VariableInstruccion.E:
        this.almacenGeneral.E = variableOrigen;
        break;
      case VariableInstruccion.F:
        this.almacenGeneral.F = variableOrigen;
        break;
      case VariableInstruccion.G:
        this.almacenGeneral.G = variableOrigen;
        break;
      case VariableInstruccion.H:
        this.almacenGeneral.H = variableOrigen;
        break;
      default:
        break;
    }
  }


  // Getters de estado de la interfaz
  // -------------------------------
  // -------------------------------
  // -------------------------------
  // -------------------------------
  get habilitarBtnEjecutar(): boolean {
    return this.estadoComputador == EstadoComputador.SIN_INICIAR;
  }

  get habilitarBtnPausar(): boolean {
    return this.estadoComputador == EstadoComputador.EN_EJECUCION;
  }

  get habilitarBtnReanudar(): boolean {
    return this.estadoComputador == EstadoComputador.PAUSADO;
  }

  get unidadControlEstaActiva(): boolean {
    return this.elementoActivo == ElementoProcesador.UNIDAD_CONTROL;
  }

  get memoriaEstaActiva(): boolean {
    return this.elementoActivo == ElementoProcesador.MEMORIA;
  }

  get aluEstaActiva(): boolean {
    return this.elementoActivo == ElementoProcesador.ALU;
  }

  get almacenGeneralEstaActivo(): boolean {
    return this.elementoActivo == ElementoProcesador.ALMACEN_GENERAL;
  }

  get pcEstaActivo(): boolean {
    return this.elementoActivo == ElementoProcesador.PC;
  }

  get marEstaActivo(): boolean {
    return this.elementoActivo == ElementoProcesador.MAR;
  }

  get mbrEstaActivo(): boolean {
    return this.elementoActivo == ElementoProcesador.MBR;
  }

  get irEstaActivo(): boolean {
    return this.elementoActivo == ElementoProcesador.IR;
  }

  get busDatosEstaActivo(): boolean {
    return this.elementoActivo == ElementoProcesador.BUS_DATOS;
  }

  get busDireccionesEstaActivo(): boolean {
    return this.elementoActivo == ElementoProcesador.BUS_DIRECCIONES;
  }

  get busControlEstaActivo(): boolean {
    return this.elementoActivo == ElementoProcesador.BUS_CONTROL;
  }
}
