import {Component} from '@angular/core';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {FormsModule} from '@angular/forms';

/**
 * @title Clipboard overview
 */
@Component({
  selector: 'cdk-clipboard-overview-example',
  templateUrl: '../home/home.component.html',
  standalone: true,
  imports: [FormsModule, ClipboardModule],
})
export class CdkClipboardOverviewExample {}