import { OperacionInstruccion } from "../Enums/operacion-instruccion";

export class ALU {
  operacionAEjecutar: OperacionInstruccion | undefined;
  operando1: Number = 0;
  operando2: Number = 0;

  sumar(operando1: Number, operando2: Number) {
    this.operando1 = operando1;
    this.operando2 = operando2;
    return operando1.valueOf() + operando2.valueOf();
  }

  restar(operando1: Number, operando2: Number) {
    this.operando1 = operando1;
    this.operando2 = operando2;
    return operando1.valueOf() - operando2.valueOf();
  }

  multiplicar(operando1: Number, operando2: Number) {
    this.operando1 = operando1;
    this.operando2 = operando2;
    return operando1.valueOf() * operando2.valueOf();
  }

  dividir(operando1: Number, operando2: Number) {
    this.operando1 = operando1;
    this.operando2 = operando2;
    return operando1.valueOf() / operando2.valueOf();
  }
}
