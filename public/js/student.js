
function emailIsValid(email){
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
function save(){
	let name = document.getElementById('name').value;
	let email = document.getElementById('email').value;
	let phone = document.getElementById('phone').value;
	let addr = document.getElementById('addr').value;
	let gender='';
	if(document.getElementById('male').checked){
		gender = document.getElementById('male').value;
	}else if(document.getElementById('female').checked){
		gender = document.getElementById('female').value;
	}
	if(_.isEmpty(name)){
		document.getElementById('name-error').innerHTML = 'Vui lòng nhập họ và tên';
	}else if(name.length <=2){
		document.getElementById('name-error').innerHTML = 'Không được nhỏ hơn 2 ký tự';
		name = ''; //Nếu name rỗng thì ko có lưu email trên database
	}
	else{
		document.getElementById('name-error').innerHTML = '';
	}

	if(_.isEmpty(email)){
		email =''; //Nếu email rỗng thì ko có lưu email trên database
		document.getElementById('email-error').innerHTML = 'Vui lòng nhập email';
	}else if(!emailIsValid(email)){
		email = ''; //Nếu email rỗng thì ko có lưu email trên database
		document.getElementById('email-error').innerHTML = 'Email không đúng định dạng';
	}else{
		document.getElementById('email-error').innerHTML = '';
	}
	

	if(_.isEmpty(phone)){
		phone = ''; //Nếu phone rỗng thì ko có lưu email trên database
		document.getElementById('phone-error').innerHTML = 'Vui lòng nhập số điện thoại';
	}
	else{
		document.getElementById('phone-error').innerHTML = '';
	}

	if(_.isEmpty(addr)){
		addr = ''; //Nếu address rỗng thì ko có lưu email trên database
		document.getElementById('addr-error').innerHTML = "Vui lòng nhập địa chỉ";
	}
	else{
		document.getElementById('addr-error').innerHTML = '';
	}

	if(_.isEmpty(gender)){
		gender =''; //Nếu gender rỗng thì ko có lưu email trên database
		document.getElementById('gender-error').innerHTML = 'Vui lòng nhập giới tính';
	}
	else{
		document.getElementById('gender-error').innerHTML = '';
	}

	if(name && email && phone && addr && gender){
		//Lưu vào trong danh sách sinh viên
		let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];

		students.push({
			name:name,
			email:email,
			phone:phone,
			addr:addr,
			gender:gender,
		});	
		localStorage.setItem('students',JSON.stringify(students));
		this.renderListStudent();
	}
}
function renderListStudent(){
	let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : []; //Đảm bảo biến student luôn luôn là mảng
	// if(students.length == 0) {
	// 	// document.getElementById('list-student').style.display = 'none';
	// 	return false;
	// }
	// document.getElementById('list-student').style.display = 'block';
	let TableContent = `
					<tr>
					<td>STT</td>
					<td>Họ Tên</td>
					<td>Email</td>
					<td>Điện Thoại</td>
					<td>Giới tính</td>
					<td>Địa Chỉ</td>
					<td>Hình Ảnh</td>
					<td>Chức Năng</td>
					</tr>`;

 	students.forEach((student, index) =>{
					let studentId = index; //đưa lên đầu để stt bắt đầu bằng 0 trong mảng
					let genderLablel = parseInt(student.gender) == 1 ? 'Nam' : 'Nữ';
					index++;
					TableContent += `
					<tr>
					<td>${index}</td>
					<td>${student.name}</td>
					<td>${student.email}</td>
					<td>${student.phone}</td>
					<td>${genderLablel}</td>
					<td>${student.addr}</td>
					<td>Hình Ảnh</td>
					<td>
						<a href='#'>Sửa</a> | <a href='#' onclick='deleteStudent(${studentId})'>Xóa</a>
					</td>
					</tr>`
				})
				document.getElementById('gr-students').innerHTML = TableContent;
}
function deleteStudent(id){
	let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
	students.splice(id,1);
	localStorage.setItem('students', JSON.stringify(students));
	renderListStudent();
}