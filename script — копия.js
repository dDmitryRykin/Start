let btnAdd = document.querySelector('.btn-success');

let nameSubject = document.getElementById('name_subject');

let timeSubject = document.getElementById('time_subject');

let arrSubjs = [];
//['Английский', 1]
let showAdds = document.querySelector('.show_adds');

function addSubjs (event) {
	event.preventDefault();
	arrSubjs.push ([nameSubject.value, timeSubject.value]);
	showSubjs ();
	nameSubject.value = '';
	timeSubject.value = '';
	
}

btnAdd.addEventListener('click', addSubjs);


function showSubjs () {
	let li = document.createElement('li');
	let nameSubj = nameSubject.value;
	let timeSubj = timeSubject.value;
	li.innerHTML = nameSubj + ' делаем ' + timeSubj + ' часов';
	showAdds.append(li);
}





let btnCalcAndShow = document.querySelector('.btn_calc_and_show');

function initWeek () {
	countWeek ();
	showWeek (week);
}

let week = [];

function countWeek (event) {
	let arr = getRandom(arrSubjs[0][1]);
	for (let i=0; i<arr.length; i++) {
		week[arr[i]] = [arrSubjs[0][0], 1];
	}
};

function getRandom (number) {
	let arr = [1,2,3,4,5,6,7];
	let newArr = [];
	for (let i=0; i<number; i++) {
		let rand = Math.floor(Math.random() * arr.length);
		newArr.push(arr[rand]);
		arr.splice(rand, 1);
		};
	return newArr;
};

function showWeek (arr) {
	console.log(arr[1][0]);
	let table = document.querySelector('.table-sm');
	let tr = document.createElement('tr');
	tr.innerHTML = '<th scope="row" class="table-secondary">' + '1' + '</th>';
	for (let i=1; i<8; i++) {
		if (arr[i]) tr.innerHTML += '<td class="table-success">' + arr[i][0] + '</td></td><td class="table-success">' + arr[i][1] + '</td>';
		else tr.innerHTML += '<td class="table-success">' + ' ' + '</td></td><td class="table-success">' + ' ' + '</td>';
	}
	//let test = '<th scope="row" class="table-secondary">' + '1' + '</th><td class="table-success">' + arr[1][0] + '</td><td class="table-success">' + arr[1][1] + '</td><td class="table-success">' + arr[2][0] + '</td><td class="table-success">' + arr[2][1] + '</td><td class="table-success">' + arr[3][0] + '</td><td class="table-success">' + arr[3][1] + '</td><td class="table-success">' + arr[4][0] + '</td><td class="table-success">' + arr[4][1] + '</td><td class="table-success">' + arr[5][0] + '</td><td class="table-success">' + arr[5][1] + '</td><td class="table-danger">' + arr[6][0] + '</td><td class="table-danger">' + arr[6][1] + '</td><td class="table-danger">' + arr[7][0] + '</td><td class="table-danger">' + arr[7][1] + '</td>';
	//tr.innerHTML = test;
	table.append(tr);
	
}

btnCalcAndShow.addEventListener('click', initWeek);



