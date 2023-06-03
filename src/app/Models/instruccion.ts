import { OperacionInstruccion } from "../Enums/operacion-instruccion";
import { VariableInstruccion } from "../Enums/variable-instruccion";

export class Instruccion {
  operacion: OperacionInstruccion | undefined;
  operando1: Number | VariableInstruccion | undefined;
  operando2: Number | VariableInstruccion | undefined;
  operando3: Number | VariableInstruccion | undefined;
  textoInstruccion: String;

  constructor(textoInstruccion: String) {
    this.textoInstruccion = textoInstruccion;
    this.descomponerInstruccion();
  }

  descomponerInstruccion() {
    let instruccionArray = this.textoInstruccion.split(" ");
    this.operacion = this.obtenerOperacion(instruccionArray[0]);
    this.operando1 = this.obtenerOperando(instruccionArray[1]);
    this.operando2 = this.obtenerOperando(instruccionArray[2]);
    this.operando3 = this.obtenerOperando(instruccionArray[3]);
  }

  obtenerOperacion(operacion: string) {
    switch (operacion.toUpperCase()) {
      case "LOAD":
        return OperacionInstruccion.LOAD;
      case "MUL":
        return OperacionInstruccion.MUL;
      case "ADD":
        return OperacionInstruccion.ADD;
      case "SUB":
        return OperacionInstruccion.SUB;
      case "DIV":
        return OperacionInstruccion.DIV;
      case "MOD":
        return OperacionInstruccion.MOD;
      case "MOVE":
        return OperacionInstruccion.MOVE;
      default:
        return undefined;
    }
  }

  obtenerOperando(operando: string) {
    if (operando == undefined) {
      return undefined;
    }
    switch (operando.toUpperCase()) {
      case "A":
        return VariableInstruccion.AX;
      case "B":
        return VariableInstruccion.BX;
      case "C":
        return VariableInstruccion.CX;
      case "D":
        return VariableInstruccion.DX;
      case "E":
        return VariableInstruccion.EX;
      case "F":
        return VariableInstruccion.FX;
      case "G":
        return VariableInstruccion.GX;
      case "H":
        return VariableInstruccion.HX;
      default:
        return Number(operando);
    }
  }

  toString() {
    return this.textoInstruccion;
  }
}
