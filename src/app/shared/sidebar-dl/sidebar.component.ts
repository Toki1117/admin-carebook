import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  OnChanges,
  Renderer2,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-sidebar-dl',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarDLComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() isShowing: boolean;
  @Input() title: string;
  @Input() warningTitle: string;
  @Input() warningText: string;
  @Input() size: 'xLarge' | 'large' | 'small' = 'large';

  @Output() onHide = new EventEmitter();

  sidebarSize = {
    small: '228px',
    large: '500px',
    xLarge: '850px',
  };

  rightSidebarClass = 'right-bar-enabled';

  sidebarWidth = '500px';

  constructor(
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.sidebarWidth = this.getSize(this.size);
    this.changeLayoutWidth(this.sidebarWidth);
  }

  ngAfterViewInit() {}

  ngOnChanges() {
    if (this.isShowing) {
      this.show();
    } else {
      this.hide();
      this.renderer.removeClass(document.body, this.rightSidebarClass);
    }
    this.sidebarWidth = this.getSize(this.size);
  }

  /**
   * Toggle the sidebar
   */
  public toggleRightSideBar() {
    if (document.body.classList.contains(this.rightSidebarClass)) {
      this.renderer.removeClass(document.body, this.rightSidebarClass);
    } else {
      this.renderer.addClass(document.body, this.rightSidebarClass);
    }
  }

  /**
   * Shows the sidebar
   */
  public show() {
    setTimeout(() => {
      this.isShowing = true;
      this.renderer.addClass(document.body, this.rightSidebarClass);
    }, 100);
  }

  /**
   * Hide the sidebar
   */
  public hide() {
    if (document.body.classList.contains(this.rightSidebarClass)) {
      this.isShowing = false;
      this.renderer.removeClass(document.body, this.rightSidebarClass);
      this.onHide.emit();
    }
  }

  getSize(size) {
    if (size) {
      return this.sidebarSize[size];
    } else {
      return this.sidebarWidth;
    }
  }

  /**
   * Change the given layout
   * @param layout layout name
   */
  public changeLayout(layout: string) {
    // this.layoutType = layout;
    // switch (this.layoutType) {
    //   case LAYOUT_DETACHED:
    //     this.disableSidebarTheme = true;
    //     this.disableWidth = true;
    //     this.disabledisableSidebarWidth = false;
    //     break;
    //   case LAYOUT_VERTICAL:
    //     this.disableSidebarTheme = false;
    //     this.disableWidth = false;
    //     this.disabledisableSidebarWidth = false;
    //     break;
    //   case LAYOUT_HORIZONTAL:
    //     this.disableSidebarTheme = true;
    //     this.disableWidth = false;
    //     this.disabledisableSidebarWidth = true;
    //     break;
    // }
    // this.eventService.broadcast('changeLayout', layout);
  }

  /**
   * Change the width
   * @param layout width type
   */
  public changeLayoutWidth(width: string) {
    // this.layoutWidth = width;
    // this.eventService.broadcast('changeLayoutWidth', width);
  }

  /**
   * Change the side bar theme
   * @param theme name
   */
  public changeSidebarTheme(theme: string) {
    // this.leftSidebarTheme = theme;
    // if (this.layoutType === LAYOUT_VERTICAL) {
    //   setTimeout(() => {
    //     this.eventService.broadcast('changeLeftSidebarTheme', theme);
    //   }, 100);
    // }
  }

  /**
   * Change the side bar width
   * @param type type of sidebar
   */
  public changeLeftSidebarType(type: string) {
    // this.leftSidebarWidth = type;
    // setTimeout(() => {
    //   if (this.layoutType === LAYOUT_VERTICAL || this.layoutType === LAYOUT_DETACHED) {
    //     this.eventService.broadcast('changeLeftSidebarType', type);
    //   }
    // }, 100);
  }

  /**
   * Reset everything
   */
  public reset() {
    // this.changeLayout(LAYOUT_VERTICAL);
    // this.changeLayoutWidth('fluid');
    // this.changeLeftSidebarType(SIDEBAR_WIDTH_FIXED);
    // this.changeSidebarTheme(SIDEBAR_THEME_DEFAULT);
  }
}
