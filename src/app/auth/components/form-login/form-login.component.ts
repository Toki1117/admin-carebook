import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { formsFeedback } from 'src/app/shared/utils/feedback';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-form-login',
	templateUrl: './form-login.component.html',
	styleUrls: ['./form-login.component.scss'],
})
export class FormLoginComponent implements OnInit {
	token = null;
	form: FormGroup;
	feedback = formsFeedback;
	constructor(
		private authService: AuthService,
		private fb: FormBuilder,
		private router: Router
	) {}

	get email() {
		return this.form.get('email');
	}

	get password() {
		return this.form.get('password');
	}

	ngOnInit(): void {
		this.form = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]],
		});
	}

	submit() {
		this.authService.login(this.form.value).subscribe(() => {
			this.router.navigate(['dashboard']);
		});
	}
}
