import { useEffect, useMemo, useState } from "react";

export const useForm = (value = {}, formValidations = {}) => {
	const [formState, setFormState] = useState(value);
	const [formValidation, setFormValidation] = useState({});

	useEffect(() => {
		createFormValidations();
	}, [formState]);

	useEffect(() => {
		setFormState(value);
	}, [value]);

	const formValid = useMemo(() => {
		for (const formValidationValue of Object.keys(formValidation)) {
			if (formValidation[formValidationValue] !== null) {
				return false;
			}
			return true;
		}
	}, [formValidation]);

	const onChange = ({ target }) => {
		const { name, value } = target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	const onReset = () => {
		setFormState(value);
	};

	const createFormValidations = () => {
		const formCheckedValues = {};

		for (const formValidationField of Object.keys(formValidations)) {
			const [fn, errorMessage] = formValidations[formValidationField];

			formCheckedValues[`${formValidationField}Valid`] = fn(
				formState[formValidationField]
			)
				? null
				: errorMessage;
		}

		setFormValidation(formCheckedValues);
	};

	return {
		...formState,
		formState,
		onChange,
		onReset,
		...formValidation,
		formValid,
	};
};
