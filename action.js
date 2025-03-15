


const priceM3 = [0, 1014.25, 2028.50, 2873.71, 3380.84, 5240.30, 5578.39];

const basicCharge = [0, 5346.40, 10692.78, 15148.10, 17821.30, 39919.72, 48830.36];

const postobon = 28;

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



function calcYear() {
	
}


function aprendiz(cb){
	if(cb.checked){
		document.getElementById("baseIncome").hidden=true;
		document.getElementById("aditionalIncome").hidden=true;
		document.getElementById("senaEtapaLectivaDiv").hidden=false;
		document.getElementById("senaEtapaPracticaDiv").hidden=false;
	}else{
		document.getElementById("baseIncome").hidden=false;
		document.getElementById("aditionalIncome").hidden=false;
		document.getElementById("senaEtapaLectivaDiv").hidden=true;
		document.getElementById("senaEtapaPracticaDiv").hidden=true;
	}
	document.getElementById("hourDiv").hidden=false;
}


document.addEventListener("DOMContentLoaded", function() {

	document.getElementById("senaEtapaLectivaDiv").hidden=true;
	document.getElementById("senaEtapaPracticaDiv").hidden=true;
	
	let hourDiv = document.getElementById("hourDiv");
    generateHorario(hourDiv);
	document.getElementById("lunes2_row").hidden=true;
});


function generateHorario(hourDiv){
	if (hourDiv) {
            
		//form titles: 
		let dayTitle = document.createElement("div");
		dayTitle.className = "col";
		dayTitle.append("Dia:");

		let inTitle = document.createElement("div");
		inTitle.className = "col";
		inTitle.append("Entrada:");


		let outTitle = document.createElement("div");
		outTitle.className = "col";
		outTitle.append("Salida:");
		
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

			let row = document.createElement("div");
			row.className="row";
			row.id = normalize(day)+"_row";

			//Dia de la semana
			let dayCol = document.createElement("div");
			dayCol.className = "col";
			dayCol.append(day+":");

			//Hora de ingreso
			let dayInCol = document.createElement("div");
			dayInCol.className = "col";

			let entrySelect = createHourSelect(`${normalize(day)}_In`, `${normalize(day)}_In`, "form-select");
			dayInCol.appendChild(entrySelect);

			//Hora de salida 
			let dayOutCol = document.createElement("div");
			dayOutCol.className = "col";

			let exitSelect = createHourSelect(`${normalize(day)}_Out`, `${normalize(day)}_Out`, "form-select");
			dayOutCol.appendChild(exitSelect);

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
		});
	}
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
		document.getElementById("lunes2_row").hidden=false;
	}else{
		document.getElementById("lunes2_row").hidden=true;
	}
}

function normalize(str){
	return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function showForm(){
	document.getElementById('waterForm').hidden = false;
	document.getElementById('hideButton').hidden = true;
	document.getElementById('infograpy').hidden = true;
}