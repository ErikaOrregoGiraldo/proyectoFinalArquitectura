import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'proyectoFinalArquitectura';
  instructions: string = '';

  getInstructions(): string[][] {
    let operandsInstruction: string[][] = [];
    let lineInstruction = this.instructions.split(';');
    lineInstruction.forEach((line) => {
      operandsInstruction.push(line.trim().split(' '));
    });
    return operandsInstruction;
  }

  processInstruction() {
    const instructions = this.getInstructions();
    instructions.forEach((instruction) => {
      if (instruction.length > 1) {
        if (instruction[0] === 'SUM') {
          this.suma(instruction);
        } else if (instruction[0] === 'RES') {
          this.resta(instruction);
        } else {
          console.log('No existe la instrucción');
        }
      }
    });
  }

  suma(instruction: string[]) {
    const resultado = parseFloat(instruction[1]) + parseFloat(instruction[2]);
    console.log('El resultado de la suma es ' + resultado);
  }

  resta(instruction: string[]) {
    const resultado = parseFloat(instruction[1]) - parseFloat(instruction[2]);
    console.log('El resultado de la resta es ' + resultado);
  }
}
