

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const daysLc = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];

let colCop = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
});

const miles = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});


function aprendiz(cb){
	if(cb.checked){
		document.getElementById("baseIncome").hidden=true;
		document.getElementById("senaEtapasDiv").hidden=false;
	}else{
		document.getElementById("baseIncome").hidden=false;
		document.getElementById("senaEtapasDiv").hidden=true;
	}
	document.getElementById("hourDiv").hidden=false;
}


document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("senaEtapasDiv").hidden=true;
	let hourDiv = document.getElementById("hourDiv");
    generateHorario(hourDiv);
});


function generateHorario(hourDiv){
	if (hourDiv) {
            
		//form titles: 
		let dayTitle = document.createElement("div");
		dayTitle.className = "col";
		dayTitle.append("Dia:");

		let inTitle = document.createElement("div");
		inTitle.className = "col";
		inTitle.append("Inicio:");

		let outTitle = document.createElement("div");
		outTitle.className = "col";
		outTitle.append("Fin:");
		
		let hoursTitle = document.createElement("div");
		hoursTitle.className = "col";
		hoursTitle.append("Horas:");

		let headersRow = document.createElement("div");
		headersRow.className="row";

		headersRow.appendChild(dayTitle);
		headersRow.appendChild(inTitle);
		headersRow.appendChild(outTitle);
		headersRow.appendChild(hoursTitle);

		hourDiv.appendChild(headersRow);

		days.forEach(day => {

			//Formulario base para horario diurno: 

			let row = document.createElement("div");
			row.className="row";
			row.id = normalize(day)+"_row";

			//Dia de la semana
			let dayCol = document.createElement("div");
			dayCol.className = "col";
			dayCol.append(day+" Día:");

			//Hora de ingreso
			let dayInCol = rangeSelect(day, "In", "form-select");

			//Hora de salida 
			let dayOutCol = rangeSelect(day, "Out", "form-select");

			//Horas registradas
			let dayHoursCol = document.createElement("div");
			dayHoursCol.className = "col";
			let hours = document.createElement("input");
			hours.name = `${normalize(day)}_hours`;
			hours.id = `${normalize(day)}_hours`;
			hours.className = "form-control";
			hours.value = 0;
			hours.disabled = true;
			dayHoursCol.appendChild(hours);

			row.appendChild(dayCol);
			row.appendChild(dayInCol);
			row.appendChild(dayOutCol);
			row.appendChild(dayHoursCol);

			hourDiv.appendChild(row);

			//Formulario para horario nocturno: 

			let row2 = document.createElement("div");
			row2.className="row";
			row2.id = normalize(day)+"_row2";

			//Dia de la semana
			let dayCol2 = document.createElement("div");
			dayCol2.className = "col";
			dayCol2.append(day+" Noche:");

			//Hora de ingreso
			let dayInCol2 = rangeSelect(day, "In2", "form-select");

			//Hora de salida 
			let dayOutCol2 = rangeSelect(day, "Out2", "form-select");

			//Horas registradas
			let dayHoursCol2 = document.createElement("div");
			dayHoursCol2.className = "col";
			let hours2 = document.createElement("input");
			hours2.name = `${normalize(day)}_hours2`;
			hours2.id = `${normalize(day)}_hours2`;
			hours2.className = "form-control";
			hours2.value = 0;
			hours2.disabled = true;
			dayHoursCol2.appendChild(hours2);

			row2.appendChild(dayCol2);
			row2.appendChild(dayInCol2);
			row2.appendChild(dayOutCol2);
			row2.appendChild(dayHoursCol2);
			row2.hidden = true;
			hourDiv.appendChild(row2);

		});
	}
}


function rangeSelect(day, sufix, selectClass) {
	let dayInCol = document.createElement("div");
	dayInCol.className = "col";
	let entrySelect = createHourSelect(`${normalize(day)}_${sufix}`, `${normalize(day)}_${sufix}`, selectClass);
	dayInCol.appendChild(entrySelect);
	return dayInCol;
}

function createHourSelect(name, id, className) {
	let select = document.createElement("select");
	select.name = name;
	select.id = id;
	select.className = className;
	select.addEventListener("change", function() {
		setHours(this.id, this.value);
	});

	for (let i = 0; i < 24; i++) {
		let option = document.createElement("option");
		let hour = i.toString().padStart(2, "0");
		option.value = hour;
		option.textContent = `${hour}:00`;
		select.appendChild(option);
	}

	let option = document.createElement("option");
	option.value = 24;
	option.textContent = `23:59`;
	select.appendChild(option);

	return select;
}

function setHours(id, hour){
	console.log("Id:", id)
	console.log("Hour:", hour)
	id =  id.split("_");
	const day = id[0];
	const type= id[1]
	const index = daysLc.findIndex( e => e === day); 
	for (let i = index; i < daysLc.length; i++) {
		setHourById(daysLc[i]+"_"+type, hour);
	}
	calculateWeekHours();
}

function setHourById(id, value){
	let select = document.getElementById(id);
	select.value = value; 
}

function calculateWeekHours(){
	daysLc.forEach(
		day => {
			dayIn = document.getElementById(day+"_In").value;
			dayOut = document.getElementById(day+"_Out").value;
			dayHours = dayOut - dayIn;
			document.getElementById(day+"_hours").value = dayHours; 
		}
	)
}

function setNocturno(cb){
	if(cb.checked){
		daysLc.forEach(
			day => {
				document.getElementById(day+"_row").hidden=false;
				document.getElementById(day+"_row2").hidden=false;
			}
		)
	}else{
		daysLc.forEach(
			day => {
				document.getElementById(day+"_row").hidden=false;
				document.getElementById(day+"_row2").hidden=true;
			}
		)
	}
}

function normalize(str){
	return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}