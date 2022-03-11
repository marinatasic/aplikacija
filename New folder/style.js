var json = jQuery.getJSON("./myList.json").responseJSON;
var items = [];
var lastClickId = null;
$(document).ready(function () {
	$.getJSON("myList.json", function (data) {
		var myList_data = "";
		$.each(data, function (key, value) {
			items.push(value);
			myList_data += `<tr id="contact_${value.id}">`;
			myList_data += "<td><div class=row_data>" + value.ime + "</div></td>";
			myList_data += "<td><div class=row_data>" + value.prezime + "</div></td>";
			myList_data += "<td><div class=row_data>" + value.br_telefona + "</div></td>";
			myList_data += "<td><div class=row_data>" + value.godina_rodjenja + "</div></td>";
			myList_data += "<td><img src=" + value.img + "/></td>";
			myList_data += '<td><button class="btn-edit">Edit' + "</button></td>";
			myList_data += '<td><button class="btn-del" id="del">Delete' + "</button></td>";
            myList_data += "</tr>";

            
		});
		$("#myList_table").append(myList_data);
	});
});

//kada se klikne na edit da se popuni forma

$(document).on("click", ".btn-edit", function (event) {

	$(".form").show();
	let row = $(event.currentTarget).parent().parent().attr("id");
	console.log(items);

	var n = row.split("_");
	var formNew = document.getElementsByClassName("form");
	console.log(n[1]);
	var id = n[1];
	lastClickId = id;
	for (var i = 0; i < items.length; i++) {
		if (items[i].id == id) {
			$("#fime").val(items[i].ime);
			$("#fprezime").val(items[i].prezime);
			$("#fbr_telefona").val(items[i].br_telefona);
			$("#fgodina_rodjenja").val(items[i].godina_rodjenja);
			$("#url").val(items[i].img);
		}
	}

});
//azuriraj tako sto uporedis da li je last click jednak id

$(document).on("click", "#update", function (event) {
	for (var i = 0; i < items.length; i++) {
		if (lastClickId == items[i].id) {
			items[i].ime = $(".form").find("#fime").val();
			items[i].prezime = $(".form").find("#fprezime").val();
			items[i].br_telefona = $(".form").find("#fbr_telefona").val();
			items[i].godina_rodjenja = $(".form").find("#fgodina_rodjenja").val();
			items[i].img = $(".form").find("#url").val();
		}
	}
	//preko not ne obuhvatam taj deo
	$("#myList_table").find("tr:not(.header)").remove();
	for (var i = 0; i < items.length; i++) {

		var _ime = items[i].ime;
		var _prezime = items[i].prezime;
		var _br = items[i].br_telefona;
		var _age = items[i].godina_rodjenja;
		var _img = items[i].img;

		let tr = `<tr id="contact_${i}"><td>${_ime}</td><td>${_prezime}</td><td>${_br}</td><td>${_age}</td><td><img src='${_img}'/></td><td><button class="btn-edit">Edit</button></td><td><button class="btn-del">Delete</button></td></tr>`;

		$("#myList_table").append(tr);
	}
});

//brisanje reda
$(document).on("click", ".btn-del", function (event) {

	if (confirm('Do you want to delete this row?')) {

		let id = $(this).closest("tr").attr("id");
		$(this).closest("tr").remove();

		var x = id.split("_");
		console.log(x[1]);
		var r = x[1];

		for (var i = 0; i < items.length; i++) {
			if (items[i].id == r) {
				let removed = items.splice(i, 1);

			}
		}

	}
});


//dodati novi red
$(document).ready(function () {
	$("#add").click(function () {


		var name = $("#fime").val();
		var lname = $("#fprezime").val();
		var num = $("#fbr_telefona").val();
		var age = $("#fgodina_rodjenja").val();
		var nimg = $("#url").val();


		var max_id = 0;
		for (var i = 0; i < items.length; i++) {
			if (items[i].id >= max_id) {
				max_id = items[i].id;
			}

		}
		max_id++;
		let markup = `<tr id="contact_${max_id}"><td>${name}</td><td>${lname}</td><td>${num}</td><td>${age}</td><td><img src='${nimg}'/></td><td><button class="btn-edit">Edit</button></td><td><button class="btn-del">Delete</button></td></tr>`;
		$("#myList_table").append(markup);
		let student = {
			id: max_id,
			ime: name,
			prezime: lname,
			br_telefona: num,
			godina_rodjenja: age,
			img: nimg
		};
		items.push(student);


	});
});
//search in table
$(document).ready(function () {
	$("#myInput").on("keyup", function () {
		var value = $(this).val().toLowerCase();

		var selectedstudents = $("input[name='searchs']:checked").val();
		var filterItems = items.filter(function (item) {

			if (selectedstudents) {
				return item[selectedstudents].toLowerCase().includes(value);
			}
		})

		var myList_data = "";
		$.each(filterItems, function (key, value) {

			myList_data += `<tr id="contact_${value.id}">`;
			myList_data += "<td><div class=row_data>" + value.ime + "</div></td>";
			myList_data += "<td><div class=row_data>" + value.prezime + "</div></td>";
			myList_data += "<td><div class=row_data>" + value.br_telefona + "</div></td>";
			myList_data += "<td><div class=row_data>" + value.godina_rodjenja + "</div></td>";
			myList_data += "<td><img src=" + value.img + "/></td>";
			myList_data += '<td><button class="btn-edit">Edit' + "</button></td>";
			myList_data += '<td><button class="btn-del" id="del">Delete' + "</button></td>";
            myList_data += "</tr>";
		
        });
		$("#myList_table").find("tr:not(.header)").empty();

		$("#myList_table").append(myList_data);


	})

})