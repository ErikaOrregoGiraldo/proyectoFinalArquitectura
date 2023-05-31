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
  }

  descomponerInstruccion() {
    let instruccionArray = this.textoInstruccion.split(" ");
    this.operacion = this.obtenerOperacion(instruccionArray[0]);
    this.operando1 = this.obtenerOperando(instruccionArray[1]);
    this.operando2 = this.obtenerOperando(instruccionArray[2]);
    this.operando3 = this.obtenerOperando(instruccionArray[3]);
  }

  obtenerOperacion(operacion: string) {
    switch (operacion) {
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
    switch (operando) {
      case "AX":
        return VariableInstruccion.AX;
      case "BX":
        return VariableInstruccion.BX;
      case "CX":
        return VariableInstruccion.CX;
      case "DX":
        return VariableInstruccion.DX;
      case "EX":
        return VariableInstruccion.EX;
      case "FX":
        return VariableInstruccion.FX;
      case "GX":
        return VariableInstruccion.GX;
      case "HX":
        return VariableInstruccion.HX;
      default:
        return Number(operando);
    }
  }
}
