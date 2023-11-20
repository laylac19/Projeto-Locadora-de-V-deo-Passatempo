import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class MensagensUtil {

    constructor(
        private snackBar: MatSnackBar,
    ) {
    }

    mensagemErro(message: string): void {
        this.snackBar.open(message, '', {duration: 5000});
    }

    mensagemSucesso(message: string): void {
        this.snackBar.open(message, '', {duration: 5000});
    }
}
