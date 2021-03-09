import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-avatar-image',
  templateUrl: './avatar-image.component.html',
  styleUrls: ['./avatar-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarImageComponent implements OnChanges {
  @Input() user: any;

  initials: string;

  ngOnChanges() {
    this.initials = this.getInitialsFromName(this.user);
  }

  getInitialsFromName(user) {
    if (user.lastName && user.firstName) {
      return (
        user.firstName.charAt(0).toUpperCase() +
        user.lastName.charAt(0).toUpperCase()
      );
    } else if (user.name) {
      return user.name
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase())
        .join('')
        .slice(0, 2);
    }
  }
}
