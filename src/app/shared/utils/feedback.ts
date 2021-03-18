export const formsFeedback = {
	required: 'Requerido',
	pattern: 'Formato invalido',
	maxlength: (requiredLength: number, actualLength?: number) =>
		`No debe exceder mas de ${requiredLength} caracteres. ${
			!!actualLength ? `Longitud actual es ${actualLength}.` : ''
		}`,
	minlength: (requiredLength: number, actualLength?: number) =>
		`Debe digitar mas de ${requiredLength} caracteres. ${
			!!actualLength ? `Longitud actual es ${actualLength}.` : ''
		}`,
};

export const urlReg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w.-]*/?';
