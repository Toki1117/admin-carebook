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
	@Input() item: { name: string; urlPicture: string } = {
		name: 'Usuario Misterioso',
		urlPicture: 'assets/images/icon/staff.png',
	};

	initials: string;

	ngOnChanges() {
		this.initials = this.getInitialsFromName(this.item);
	}

	getInitialsFromName(user) {
		if (user.name) {
			return user.name
				.split(' ')
				.map((word) => word.charAt(0).toUpperCase())
				.join('')
				.slice(0, 2);
		}
	}
}
