import { OperacionInstruccion } from "../Enums/operacion-instruccion";

export class ALU {
  operacionAEjecutar: OperacionInstruccion | undefined;
  operando1: Number = 0;
  operando2: Number = 0;

  ejecutarOperacion(tipoOperacion: OperacionInstruccion, operando1: Number, operando2: Number) {
    this.operacionAEjecutar = tipoOperacion;
    this.operando1 = operando1;
    this.operando2 = operando2;

    switch (this.operacionAEjecutar) {
      case OperacionInstruccion.ADD:
        return this.sumar(operando1, operando2);
      case OperacionInstruccion.SUB:
        return this.restar(operando1, operando2);
      case OperacionInstruccion.MUL:
        return this.multiplicar(operando1, operando2);
      case OperacionInstruccion.DIV:
        return this.dividir(operando1, operando2);
      default:
        return 0;
    }
  }

  sumar(operando1: Number, operando2: Number): Number {
    return operando1.valueOf() + operando2.valueOf();
  }

  restar(operando1: Number, operando2: Number): Number {
    return operando1.valueOf() - operando2.valueOf();
  }

  multiplicar(operando1: Number, operando2: Number): Number {
    return operando1.valueOf() * operando2.valueOf();
  }

  dividir(operando1: Number, operando2: Number): Number {
    try {
      return operando1.valueOf() / operando2.valueOf();
    } catch (error) {
      return 0;
    }
  }
}
