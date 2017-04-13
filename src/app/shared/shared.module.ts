import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { TabBarComponent } from './tab-bar/tab-bar.component';
import { AutoGrowDirective } from './auto-grow/auto-grow.directive';
import { SearchInputComponent } from './search-input/search-input.component';
import { SearchInputNotificationService } from './search-input/search-input-change-notification.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { routing } from '../app.routing';
import { Ng2Bs3ModalModule} from 'ng2-bs3-modal/ng2-bs3-modal';
import { MaterialModule , MdInputModule} from '@angular/material';
import { FormsModule,ReactiveFormsModule} from '@angular/forms'; 
import 'hammerjs';


@NgModule({
    imports: [CommonModule, routing,Ng2Bs3ModalModule,MaterialModule , MdInputModule,FormsModule,ReactiveFormsModule],
    exports: [NavBarComponent, FooterComponent, TabBarComponent, AutoGrowDirective,
        SearchInputComponent, SpinnerComponent],

    declarations: [NavBarComponent, FooterComponent, TabBarComponent, AutoGrowDirective,
        SearchInputComponent, SpinnerComponent],
    providers: [SearchInputNotificationService]

})

export class SharedModule { }
