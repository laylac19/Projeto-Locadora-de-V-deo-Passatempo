import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {SidemenuModel} from "../../shared/models/sidemenu.model";

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {

    @Input() public configuracaoMenuLateral?: SidemenuModel;

    constructor(
        private router: Router
    ) {
    }

    public alternarVisibilidadeMenuLateral(): void {
        if(this.configuracaoMenuLateral) {
            this.configuracaoMenuLateral.visivel = !this.configuracaoMenuLateral.visivel;
            this.router.navigateByUrl('/Filmes');
        }
    }
}
