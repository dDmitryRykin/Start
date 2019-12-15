
let btnAdd = document.querySelector('.btn-success');

let nameSubject = document.getElementById('name_subject');

let timeSubject = document.getElementById('time_subject');

let arrSubjs = [];
//['Английский', 5], ['Матан', 3]]; ['a', 7], ['b',7], ['c', 7]
//['Биология', 2],['Зрение', 7],['Русский', 4],['Английский', 7], ['Матан', 3]
let showAdds = document.querySelector('.show_adds');

let nameListSubjs = document.querySelector('.name-list-subjs');
let positionNameListSubjs = 'on';

//Проверка - есть ли уже рассчитанные данные
let isSubjsShow = false;

let elem = '';

let table = document.querySelector('.table-sm');

let btnCleanTable = document.querySelector('.clean-table');

let btnCleanSubjs = document.querySelector('.clean-subjs');


function addSubjs (event) {
	event.preventDefault();
	if (nameSubject.value=='' || timeSubject.value == '') alert ('Необоходимо заполнить все поля');
	else if ( !(!isNaN(parseFloat(timeSubject.value)) && isFinite(timeSubject.value))) alert ('Время должно быть в цифрах');
	else {
		arrSubjs.push ([nameSubject.value, timeSubject.value]);
		showSubjs (2);
		nameSubject.value = '';
		timeSubject.value = '';
		
	}
}

btnAdd.addEventListener('click', addSubjs);

function showSubjs (arg) {
	/*let li = document.createElement('li');
	let nameSubj = nameSubject.value;
	let timeSubj = timeSubject.value;
	li.innerHTML = nameSubj + ' делаем ' + timeSubj + ' часов';
	showAdds.append(li);*/
	
	let check = arg;
	// if check 1 => start work, else check = 2 => add new subj

	if (check == 1) {
		for (let i=0; i<=arrSubjs.length-1; i++) {
			let li = document.createElement('li');
			li.innerHTML = arrSubjs[i][0] + ' - ' + arrSubjs[i][1] + ' раз в неделю';
			showAdds.append(li);
		}
	}
	
	if (check == 2) {
		let li = document.createElement('li');
		li.innerHTML = nameSubject.value + ' делаем ' + timeSubject.value  + ' раз в неделю';
		showAdds.append(li);
	}
	
	
}

let btnCalcAndShow = document.querySelector('.btn_calc_and_show');

function initWeek () {
	if (isSubjsShow == true) {
		if (confirm ('Пересчитать таблицу?')) {
			isSubjsShow = false, week = [[]], 
			table.innerHTML = '<thead> <tr> <th scope="col" class="bg-secondary">#</th> <th scope="col" colspan="2" class="bg-success">Понедельник</th> <th scope="col" colspan="2" class="bg-success">Вторник</th> <th scope="col" colspan="2" class="bg-success">Среда</th> <th scope="col" colspan="2" class="bg-success">Четверг</th> <th scope="col" colspan="2" class="bg-success">Пятница</th> <th scope="col" colspan="2" class="bg-danger">Суббота</th> <th scope="col" colspan="2" class="bg-danger">Воскресенье</th> </tr> </thead> <tbody> <tr> <th scope="row" class="table-secondary"></th> <th class="table-success">Предмет</th> <th class="table-success">Время</th> <th class="table-success">Предмет</th> <th class="table-success">Время</th> <th class="table-success">Предмет</th> <th class="table-success">Время</th> <th class="table-success">Предмет</th> <th class="table-success">Время</th> <th class="table-success">Предмет</th> <th class="table-success">Время</th> <th class="table-danger">Предмет</th> <th class="table-danger">Время</th> <th class="table-danger">Предмет</th> <th class="table-danger">Время</th> </tr>';
		}
	}
	if (isSubjsShow == false) {
		countWeek ();
		showWeek (week);
		locStor ();
	};
	
}

let week = [[]];

//Сортировка массива с данными о предметах
function compareNumeric(b, a) {
  return a[1]-b[1];
  ;
}

//i-номер занятия, k-номер строки
function countWeek () {
	arrSubjs.sort(compareNumeric);
	let arr = [1,2,3,4,5,6,7];
	for (let i = 0, k = 0; i<arrSubjs.length; i++) {
		let numberHoursSubjs = arrSubjs[i][1];
		if (arr.length == 0) arr = [1,2,3,4,5,6,7], k++, week.push ([]);
		if (arr.length >= numberHoursSubjs) {
			
			let getArr = getRandom(numberHoursSubjs, arr);
			for (let j=0; j<getArr.length; j++) {
				week[k][getArr[j]] = [arrSubjs[i][0], 1];
			}
		}
		else if (arr.length < numberHoursSubjs) {
			let difference = numberHoursSubjs - arr.length;
			let getArr = getRandom(arr.length, arr);
			for (let j=0; j<getArr.length; j++) {
				week[k][getArr[j]] = [arrSubjs[i][0], 1];
			}
			k++;
			week.push ([]);
			arr = [1,2,3,4,5,6,7];
			getArr = getRandom(difference, arr);
			for (let j=0; j<getArr.length; j++) {
				week[k][getArr[j]] = [arrSubjs[i][0], 1];
			}
		}
	}
};

function getRandom (number, arr) {
	let newArr = [];
	for (let i=0; i<number; i++) {
		let rand = Math.floor(Math.random() * arr.length);
		newArr.push(arr[rand]);
		arr.splice(rand, 1);
	};
	return newArr;
};



function showWeek (arr) {
		
		for (let j=0, k=1; j<arr.length; j++) {
			elem = "<tr id='test'>";
			elem += '<th scope="row" class="table-secondary">' + k + '</th>';
			k++
			for (let i=1; i<8; i++) {
				if (arr[j][i]) elem += '<td class="table-success">' + arr[j][i][0] + '</td></td><td class="table-success">' + arr[j][i][1] + '</td>\n';
				else elem += '<td class="table-success">' + ' ' + '</td></td><td class="table-success">' + ' ' + '</td>\n';
			}
			elem += '</tr>';
			table.insertAdjacentHTML('beforeend', elem);
		}
		isSubjsShow = true;	
}

btnCalcAndShow.addEventListener('click', initWeek);

function startInit () {
	if (arrSubjs.length>0) {
	arrSubjs = JSON.parse(localStorage.arrSubjs);
	week = JSON.parse(localStorage.week);
	showWeek (week);
	}
	showSubjs (1);
	
}

function locStor () {
	localStorage.setItem ('arrSubjs', JSON.stringify (arrSubjs) );
	localStorage.setItem ('week', JSON.stringify (week) );
}

function cleanTable (e) {
	e.preventDefault();
	table.innerHTML = '<thead> <tr> <th scope="col" class="bg-secondary">#</th> <th scope="col" colspan="2" class="bg-success">Понедельник</th> <th scope="col" colspan="2" class="bg-success">Вторник</th> <th scope="col" colspan="2" class="bg-success">Среда</th> <th scope="col" colspan="2" class="bg-success">Четверг</th> <th scope="col" colspan="2" class="bg-success">Пятница</th> <th scope="col" colspan="2" class="bg-danger">Суббота</th> <th scope="col" colspan="2" class="bg-danger">Воскресенье</th> </tr> </thead> <tbody> <tr> <th scope="row" class="table-secondary"></th> <th class="table-success">Предмет</th> <th class="table-success">Время</th> <th class="table-success">Предмет</th> <th class="table-success">Время</th> <th class="table-success">Предмет</th> <th class="table-success">Время</th> <th class="table-success">Предмет</th> <th class="table-success">Время</th> <th class="table-success">Предмет</th> <th class="table-success">Время</th> <th class="table-danger">Предмет</th> <th class="table-danger">Время</th> <th class="table-danger">Предмет</th> <th class="table-danger">Время</th> </tr>';
	isSubjsShow = false, week = [[]];
	showAdds.innerHTML = '';
	arrSubjs = [];
	localStorage.clear();
}

function chamgeNameListSubjs (e) {
	if (positionNameListSubjs == 'on') {
		nameListSubjs.innerHTML = '(показать)',
		positionNameListSubjs = 'off';
	}
	else {
		nameListSubjs.innerHTML = '(скрыть)',
		positionNameListSubjs = 'on';
	}	
}

nameListSubjs.addEventListener('click', chamgeNameListSubjs);

btnCleanTable.addEventListener('click', cleanTable);

startInit ();

/*Что нужно:
В конец добавил выполнение initWeek, чтобы при загрузке уже отобразилась неделя
1. Но каждый раз перезагружая, обновляется таблица. 
Сделать чтобы оставалась одна и та же и перезагружалась бы она только по кнопке "рассчитать"
2. Как-то впихать localStorage. Чтобы с него брались данные для первой загрузки.
И чтобы при изменения списка, изменения добавлялись бы в localStorage.
3. Разобраться с JSON
4. ту ду лист с простым добавлением нового элемента списка. Но так же, чтобы
можно было создать новый ту ду лист с новым названием и там записывать именно на эту тему
5. 
*/







