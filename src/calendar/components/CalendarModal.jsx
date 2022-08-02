import { useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addHours } from "date-fns";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(true);
	const [formValues, setFormValues] = useState({
		title: "Alex",
		notes: "Salgado",
		start: new Date(),
		end: addHours(new Date(), 2),
	});

	const onChange = ({ target }) => {
		setFormValues({
			...formValues,
			[target.name]: target.value,
		});
	};

	const onCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<Modal
			isOpen={isModalOpen}
			onRequestClose={onCloseModal}
			style={customStyles}
			className="modal"
			overlayClassName="modal-background"
			closeTimeoutMS={200}
		>
			<h1> Nuevo evento </h1>
			<hr />
			<form className="container">
				<div className="form-group mb-2">
					<label>Fecha y hora inicio</label>
					<DatePicker
						className="form-control"
						name="title"
						placeholder="Fecha inicio"
						selected={formValues.start}
						onChange={onChange}
					/>
				</div>

				<div className="form-group mb-2">
					<label>Fecha y hora fin</label>
					<DatePicker
						className="form-control"
						name="title"
						placeholder="Fecha inicio"
						selected={formValues.start}
						onChange={onChange}
					/>
				</div>

				<hr />
				<div className="form-group mb-2">
					<label>Titulo y notas</label>
					<input
						type="text"
						className="form-control"
						placeholder="Título del evento"
						name="title"
						autoComplete="off"
						value={formValues.title}
						onChange={onChange}
					/>
					<small id="emailHelp" className="form-text text-muted">
						Una descripción corta
					</small>
				</div>

				<div className="form-group mb-2">
					<textarea
						type="text"
						className="form-control"
						placeholder="Notas"
						rows="5"
						name="notes"
						value={formValues.notes}
						onChange={onChange}
					></textarea>
					<small id="emailHelp" className="form-text text-muted">
						Información adicional
					</small>
				</div>

				<button
					type="submit"
					className="btn btn-outline-primary btn-block"
				>
					<i className="far fa-save"></i>
					<span> Guardar</span>
				</button>
			</form>
		</Modal>
	);
};
