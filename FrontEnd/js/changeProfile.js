let currentNickName;
let currentEmail;
let emailCheckPass = false; // 이메일 인증 여부
let passPass = false; // 패스워드 정규식에 맞는지

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()\-=_+[\]{}|\\;:'",.<>/?]{8,20}$/;

window.onload = async () => {

    try {
        // 유저 정보 요청
        const { data } = await axios.get("http://127.0.0.1:8080/mypage/getUser", {
            withCredentials: true,
        });

        email.innerText = data.email;
        currentEmail = data.email;
        nickName.value = data.nickname;
        currentNickName = data.nickname;

        // imgpath 불러오기
        userImg.src = imgPath +"/"+ data.img;

    } catch (error) {
        console.log(error);
    }



    // 닉네임 변경 버튼 클릭
    changeNickName.onclick = async () => {
        try {
            // 변경할 닉네임이 공백일 경우
            if (nickName.value.trim() == "") {
                nickNameResultDiv.innerText = "닉네임 공백 불가";
                nickNameResultDiv.style.color = "red";
                return;
            }

            // 변경할 닉네임이 기존 닉네임과 동일할 경우
            if (nickName.value.trim() == currentNickName) {
                nickNameResultDiv.innerText = "변경된 값이 없습니다.";
                nickNameResultDiv.style.color = "red";
                return;
            }

            const nickname = { nickname: nickName.value.trim() };

            const { data } = await axios.post("http://127.0.0.1:8080/mypage/changeNickName", nickname, {
                withCredentials: true,
            });

            // 변경 성공
            if (data.result == "0") {
                alert("닉네임 변경 완료");
                nickName.value = data.nickname;
            } else {
                alert("닉네임 변경 실패");
                nickName.value = currentNickName;
            }



        } catch (error) {
            console.log(error);
        }


    }

    // 비밀번호 변경 버튼 클릭(이메일 인증할 수 있는 영역 보여주기)
    showMailCodeInput.onclick = () => {
        // 이메일 인증 인풋, 버튼 보여주기
        showMailCodeInput.style.display = "none";
        codeInput.style.display = "block";
        sendMailBtn.style.display = "block";
    }

    // 비밀번호 변경 버튼 클릭(서버에 요청)
    changePassword.onclick = async () => {
        if (!passPass) {
            alert("비밀번호 형식에 맞지 않음");
            return;
        }

        try {
            const password = { password: passwordInput.value };

            const { data } = await axios.post("http://127.0.0.1:8080/mypage/changePassword", password, {
                withCredentials: true,
            });

            if (data == "0") {
                alert("비밀번호 변경 완료");
            } else {
                alert("비밀번호 변경 실패");
            }

        } catch (error) {
            console.log(error);
        }
    }





    // 이메일 인증 버튼 클릭(서버에서 메일 보낼 수 있게)
    sendMailBtn.onclick = async () => {
        const email = { email: currentEmail };

        try {
            const { data } = await axios.post("http://127.0.0.1:8080/mail/sendemail", email, {
                withCredentials: true,
            });
            if (data == "0") {
                alert("인증코드를 보냈습니다.");
                sendMailBtn.style.display = "none";
                codeBtn.style.display = "block";
            } else if (data == "1") {
                alert("오류");
            } else {
                alert("오류");
            }
        } catch (error) {
            console.log(error);
        }

    }

    // 인증코드 버튼 클릭(서버에 인증코드 전송 결과 확인)
    codeBtn.onclick = async () => {
        if (codeInput.value == "") {
            codeResultDiv.innerText = "인증코드를 입력하세요.";
            codeResultDiv.style.display = "block";
            codeResultDiv.style.color = "red";
            return;
        }

        const emailCode = { email: currentEmail, code: codeInput.value };
        try {
            const { data } = await axios.post("http://127.0.0.1:8080/mail/checkcode", emailCode, {
                withCredentials: true,
            });
            if (data == "0") {
                // 인증코드 일치
                emailCheckPass = true;
                codeResultDiv.innerText = "인증되었습니다.";
                codeResultDiv.style.color = "blue";

                codeInput.style.display = "none";
                codeBtn.style.display = "none";

                // 변경할 비밀번호 입력할 인풋 보여주기
                passwordInput.style.display = "block";
                codeResultDiv.style.display = "block";
                changePassword.style.display = "block";

            } else if (data == "1") {
                // 인증코드 불일치
                emailCheckPass = false;
                codeResultDiv.innerText = "인증코드가 틀렸습니다.";
                codeResultDiv.style.color = "red";

            } else {
                alert("오류");
            }

        } catch (error) {
            console.log(error);
        }


    }


    // 패스워드 입력할때마다 실행되는 함수
    passwordInput.oninput = () => {
        passPass = false;

        // 비밀번호 형식이라면
        if (passwordRegex.test(passwordInput.value)) {
            passPass = true;
            console.log(passwordInput.value);
            codeResultDiv.innerText = "비밀번호 형식입니다.";
            codeResultDiv.style.color = "blue";
        } else {
            codeResultDiv.innerText = "비밀번호는 최소 8자 최대 20자이어야 하고, 영문 대소문자와 숫자를 포함해야 합니다.";
            codeResultDiv.style.color = "red";
        }
    }



    // 프로필 수정 버튼 클릭
    changeProfileImg.onclick = async () => {

        try {
            const form = new FormData();
            form.append("img", fileInput.files[0]);

            const { data } = await axios.post("http://127.0.0.1:8080/mypage/changeImg", form, {
                withCredentials: true,
                "Content-Type": "multipart/form-data"
            });

            // 수정 성공
            if (data == "0") {
                alert("성공");
            } else { // 실패
                alert("실패");
            }

        } catch (error) {
            console.log(error);
        }
    }



    // 내가 쓴 글 버튼 클릭
    myFreeBoard.onclick = () => {
        window.location.href = "../../freeboard/freeboard.html?page=my";
    }

    // 좋아요한 글 클릭
    likeFreeBoard.onclick = () => {
        window.location.href = "../../freeboard/freeboard.html?page=likes";
    }

    // 파일 선택하면 화면에 이미지 보여주게 함
    fileInput.onchange = displayImage;

}



function displayImage() {
    const input = document.querySelector("#fileInput");
    const imgPreview = document.querySelector("#userImg");

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = function (e) {
        imgPreview.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }
