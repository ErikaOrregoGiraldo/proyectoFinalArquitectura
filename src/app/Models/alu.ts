import { OperacionInstruccion } from "../Enums/operacion-instruccion";

export class ALU {
  operacionAEjecutar: OperacionInstruccion | undefined;

  sumar(operando1: Number, operando2: Number) {
    return operando1.valueOf() + operando2.valueOf();
  }

  restar(operando1: Number, operando2: Number) {
    return operando1.valueOf() - operando2.valueOf();
  }

  multiplicar(operando1: Number, operando2: Number) {
    return operando1.valueOf() * operando2.valueOf();
  }

  dividir(operando1: Number, operando2: Number) {
    return operando1.valueOf() / operando2.valueOf();
  }
}
