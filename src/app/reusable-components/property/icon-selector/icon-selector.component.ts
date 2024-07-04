import { Component, forwardRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';

import { BehaviorSubject, of } from 'rxjs';
import { delay, flatMap, tap } from 'rxjs/operators';

const CUSTOM_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => IconSelectorComponent),
  multi: true,
};



@Component({
  selector: 'app-icon-selector',
  templateUrl: './icon-selector.component.html',
  styleUrls: ['./icon-selector.component.scss'],
  providers: [CUSTOM_VALUE_ACCESSOR],

})
export class IconSelectorComponent implements OnInit, ControlValueAccessor {




  private selectedIcon: string;
  private disabled: boolean;
  private onChange: Function;
  private onTouched: Function;

  // 




  // selectedIcon;

  dialogVis = true
  iconSelected = true;


  icons = [
    "activity-outline",

    "alert-circle-outline",

    "alert-triangle-outline",

    "archive-outline",

    "arrow-circle-down-outline",

    "arrow-circle-up-outline",

    "arrow-circle-left-outline",

    "arrow-circle-right-outline",

    "arrow-down-outline",

    "arrow-up-outline",

    "arrow-left-outline",

    "arrow-right-outline",

    "arrow-downward-outline",

    "arrow-upward-outline",

    "arrow-back-outline",

    "arrow-forward-outline",

    "arrow-ios-downward-outline",

    "arrow-ios-upward-outline",

    "arrow-ios-back-outline",

    "arrow-ios-forward-outline",

    "arrowhead-down-outline",

    "arrowhead-up-outline",

    "arrowhead-left-outline",

    "arrowhead-right-outline",

    "at-outline",

    "attach-2-outline",

    "attach-outline",

    "award-outline",

    "backspace-outline",

    "bar-chart-2-outline",

    "bar-chart-outline",

    "battery-outline",

    "behance-outline",

    "bell-off-outline",

    "bell-outline",

    "bluetooth-outline",

    "book-open-outline",

    "book-outline",

    "bookmark-outline",

    "briefcase-outline",

    "browser-outline",

    "brush-outline",

    "bulb-outline",

    "calendar-outline",

    "camera-outline",

    "car-outline",

    "cast-outline",

    "charging-outline",

    "checkmark-circle-2-outline",

    "checkmark-circle-outline",

    "checkmark-outline",

    "checkmark-square-2-outline",

    "checkmark-square-outline",

    "chevron-down-outline",

    "chevron-left-outline",

    "chevron-right-outline",

    "chevron-up-outline",

    "clipboard-outline",

    "clock-outline",

    "close-circle-outline",

    "close-outline",

    "close-square-outline",

    "cloud-download-outline",

    "cloud-upload-outline",

    "code-download-outline",

    "code-outline",

    "collapse-outline",

    "color-palette-outline",

    "color-picker-outline",

    "compass-outline",

    "copy-outline",

    "corner-down-left-outline",

    "corner-down-right-outline",

    "corner-left-down-outline",

    "corner-left-up-outline",

    "corner-right-down-outline",

    "corner-right-up-outline",

    "corner-up-left-outline",

    "corner-up-right-outline",

    "credit-card-outline",

    "crop-outline",

    "cube-outline",

    "diagonal-arrow-left-down-outline",

    "diagonal-arrow-left-up-outline",

    "diagonal-arrow-right-down-outline",

    "diagonal-arrow-right-up-outline",

    "done-all-outline",

    "download-outline",

    "droplet-off-outline",

    "droplet-outline",

    "edit-2-outline",

    "edit-outline",

    "email-outline",

    "expand-outline",

    "external-link-outline",

    "eye-off-2-outline",

    "eye-off-outline",

    "eye-outline",

    "facebook-outline",

    "file-add-outline",

    "file-outline",

    "file-remove-outline",

    "file-text-outline",

    "film-outline",

    "flag-outline",

    "flash-off-outline",

    "flash-outline",

    "flip-outline",

    "flip-2-outline",

    "folder-add-outline",

    "folder-outline",

    "folder-remove-outline",

    "funnel-outline",

    "gift-outline",

    "github-outline",

    "globe-2-outline",

    "globe-outline",

    "google-outline",

    "grid-outline",

    "hard-drive-outline",

    "hash-outline",

    "headphones-outline",

    "heart-outline",

    "home-outline",

    "image-outline",

    "inbox-outline",

    "info-outline",

    "keypad-outline",

    "layers-outline",

    "layout-outline",

    "link-2-outline",

    "link-outline",

    "linkedin-outline",

    "list-outline",

    "loader-outline",

    "lock-outline",

    "log-in-outline",

    "log-out-outline",

    "map-outline",

    "maximize-outline",

    "menu-2-outline",

    "menu-arrow-outline",

    "menu-outline",

    "message-circle-outline",

    "message-square-outline",

    "mic-off-outline",

    "mic-outline",

    "minimize-outline",

    "minus-circle-outline",

    "minus-outline",

    "minus-square-outline",

    "monitor-outline",

    "moon-outline",

    "more-horizontal-outline",

    "more-vertical-outline",

    "move-outline",

    "music-outline",

    "navigation-2-outline",

    "navigation-outline",

    "npm-outline",

    "options-2-outline",

    "options-outline",

    "pantone-outline",

    "paper-plane-outline",

    "pause-circle-outline",

    "people-outline",

    "percent-outline",

    "person-add-outline",

    "person-delete-outline",

    "person-done-outline",

    "person-outline",

    "person-remove-outline",

    "phone-call-outline",

    "phone-missed-outline",

    "phone-off-outline",

    "phone-outline",

    "pie-chart-outline",

    "pin-outline",

    "play-circle-outline",

    "plus-circle-outline",

    "plus-outline",

    "plus-square-outline",

    "power-outline",

    "pricetags-outline",

    "printer-outline",

    "question-mark-circle-outline",

    "question-mark-outline",

    "radio-button-off-outline",

    "radio-button-on-outline",

    "radio-outline",

    "recording-outline",

    "refresh-outline",

    "repeat-outline",

    "rewind-left-outline",

    "rewind-right-outline",

    "save-outline",

    "scissors-outline",

    "search-outline",

    "settings-2-outline",

    "settings-outline",

    "share-outline",

    "shake-outline",

    "shield-off-outline",

    "shield-outline",

    "shopping-bag-outline",

    "shopping-cart-outline",

    "shuffle-2-outline",

    "shuffle-outline",

    "skip-back-outline",

    "skip-forward-outline",

    "slash-outline",

    "smartphone-outline",

    "smiling-face-outline",

    "speaker-outline",

    "square-outline",

    "star-outline",

    "stop-circle-outline",

    "sun-outline",

    "swap-outline",

    "sync-outline",

    "text-outline",

    "thermometer-minus-outline",

    "thermometer-outline",

    "thermometer-plus-outline",

    "toggle-left-outline",

    "toggle-right-outline",

    "trash-2-outline",

    "trash-outline",

    "trending-down-outline",

    "trending-up-outline",

    "tv-outline",

    "twitter-outline",

    "umbrella-outline",

    "undo-outline",

    "unlock-outline",

    "upload-outline",

    "video-off-outline",

    "video-outline",

    "volume-down-outline",

    "volume-mute-outline",

    "volume-off-outline",

    "volume-up-outline",

    "wifi-off-outline",

    "wifi-outline",

  ]


  evaicons = new BehaviorSubject<string[]>(undefined).pipe(flatMap(_ => of([...this.icons]))).pipe(tap(_ => {
    console.log('evaIcons', _)
  }), delay(0))


  selectIcon(icon) {
    this.selectedIcon = icon;
    this.setLevel(this.selectedIcon)
  }



  toggleSelection() {
    this.iconSelected = !this.iconSelected;
  }
  @ViewChild('dialogTmpl', { static: false }) dialogTpl: TemplateRef<any>;

  constructor(private dialogService: NbDialogService) {

    this.onChange = (_: any) => { };
    this.onTouched = () => { };
    this.disabled = false;


  }

  public isActive(value: string): boolean {
    return value === this.selectedIcon;
  }

  public setLevel(value: string): void {
    this.selectedIcon = value;
    this.onChange(this.selectedIcon);
    this.onTouched();
  }

  writeValue(obj: any): void {
    this.selectedIcon = obj;
  }

  registerOnChange(fn: any): void {
    console.log('debugger', fn)

    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    console.log('debugger', fn)

    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }


  ngOnInit(): void {

    console.log('icon-selecto', this.selectedIcon)

  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }


}
