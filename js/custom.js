$(function() {
 	'use strict';
	//Cookie Handling
	function createCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = '; expires='+date.toGMTString();
		}
		else var expires = '';
		document.cookie = name+'='+value+expires+'; path=/';
	}
	
	function readCookie(name) {
		var nameEQ = name + '=';
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
	//Unique ID handling
	function generateUUID(){
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (d + Math.random()*16)%16 | 0;
			d = Math.floor(d/16);
			return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		});
		return uuid;
	}
	//A/B Handling and cookie assignments
	var modArr = new Array('modA', 'modB'),
	modSel = modArr[Math.round(Math.random()*(modArr.length-1))],
	uID = readCookie('userID'),
	uG = readCookie('userGroup');
	if (uG) {
		createCookie('userGroup',uG,14);
		if (uG === 'modA') {
			$('.modimg img').attr('src', 'img/imga.png');
			$('.userGroup').val(uG);
		}else if (uG === 'modB') {
			$('.modimg img').attr('src', 'img/imgb.png');
			$('.userGroup').val(uG);
		}
	}else{
		createCookie('userGroup',modSel,14);
		if (modSel === 'modA') {
			$('.modimg img').attr('src', 'img/imga.png');
			$('.userGroup').val(modSel);
		}else if (modSel === 'modB') {
			$('.modimg img').attr('src', 'img/imgb.png');
			$('.userGroup').val(modSel);
		}
	}
	if (uID) {
		createCookie('userID',uID,14);
			$('.userID').val(uID);
	}else{
		var uuID = generateUUID();
		createCookie('userID',uuID,14);
			$('.userID').val(uuID);
	}
	//Form validation, honeypot check, and form submission
	$( 'input, button' ).focus(function() {
		$(document).foundation('abide', 'reflow');
		$( '#modForm' ).on('invalid.fndtn.abide', function () {
			
		})
		.on('valid.fndtn.abide', function () {
			if ($('.lname').val() !== '') {
			$('.ty').css('display', 'block');
			$( '#modForm' ).css('display', 'none');
		}else{
			$( '#modForm' ).css('display', 'none');
			$('.ty').css('display', 'block');
			
		}
		});
	});
	$( '.sub' ).click(function() {
		if ($('.name, .email').val() !== '') {
			if ($('#modForm').hasClass('error')) {
				
			}else{
				$( '#modForm' ).submit();
			}
		}
	});
	//Data handling from form to object to console
	$.fn.serializeObject = function() {
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};
	$(function() {
		$('#modForm').submit(function() {
			console.log(JSON.stringify($('form').serializeObject()));
			return false;
		});
	});
});