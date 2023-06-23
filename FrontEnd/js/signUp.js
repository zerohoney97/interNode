// 이메일, 패스워드 정규식에 따라 true/false 변경하기
let emailPass = false; // 이메일 정규식에 맞는지
let emailDupPass = false; // 이메일 중복확인 여부
let emailCheckPass = false; // 이메일 인증 통과했는지
let passPass = false; // 패스워드 정규식에 맞는지

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()\-=_+[\]{}|\\;:'",.<>/?]{8,20}$/;

window.onload = async () => {










  // 이메일 중복확인 버튼 클릭
  duplicatedBtn.onclick = async () => {
    if (!emailPass) {
      emailResultDiv.innerText = "이메일 형식이 아닙니다.";
      emailResultDiv.style.color = "red";
      return;
    }

    const email = { email: emailInput.value };

    try {
      const { data } = await axios.post(url + "/signUp/checkemail", email, {
        withCredentials: true,
      });

      // 사용 불가능한 이메일
      if (data == "1") {
        emailDupPass = false;
        emailResultDiv.innerText = "사용 불가능한 이메일입니다.";
        emailResultDiv.style.color = "red";

        emailInput.innerText = "";
      } else if (data == "0") {
        // 사용 가능한 이메일
        emailDupPass = true;
        emailResultDiv.innerText = "사용 가능한 이메일입니다.";
        emailResultDiv.style.color = "blue";

        document
          .querySelector(".input-confirm-num-field")
          .classList.add("flex");
        codeInput.disabled = true;
      } else {
        alert("오류");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 이메일 인증하기 버튼 클릭(서버에서 메일 보낼 수 있게)
  sendMailBtn.onclick = async () => {
    const email = { email: emailInput.value };
    if (!emailDupPass) {
      alert("이메일 중복확인을 해주세요.");
      return;
    }

    if (emailCheckPass) {
      alert("이미 인증된 이메일입니다.");
    } else {
      try {
        alert("인증코드 전송 시도");
        const { data } = await axios.post(url + "/mail/sendemail", email, {
          withCredentials: true,
        });
        if (data == "0") {
          alert("인증코드를 보냈습니다.");
          sendMailBtn.style.display = "none";
          codeBtn.style.display = "block";
          codeInput.disabled = false;
        } else if (data == "1") {
          alert("오류남. 이메일을 확인해주세요.");
        } else {
          alert("오류");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 인증코드 버튼 클릭(서버에 인증코드 전송 결과 확인)
  codeBtn.onclick = async () => {
    if (codeInput.value == "") {
      codeResultDiv.innerText = "인증코드를 입력하세요.";
      codeResultDiv.style.color = "red";
    } else if (!emailDupPass) {
      codeResultDiv.innerText = "이메일 중복확인부터 해주세요.";
      codeResultDiv.style.color = "red";
    } else {
      const emailCode = { email: emailInput.value, code: codeInput.value };
      try {
        const { data } = await axios.post(url + "/mail/checkcode", emailCode, {
          withCredentials: true,
        });
        if (data == "0") {
          // 인증코드 일치
          emailCheckPass = true;
          codeResultDiv.innerText = "인증되었습니다.";
          codeResultDiv.style.color = "blue";
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
  };

  // 회원가입 버튼 클릭
  signUpBtn.onclick = async () => {
    if (nicknameInput.value.trim() == "") {
      nicknameResultDiv.innerText = "닉네임을 작성해주세요";
      nicknameResultDiv.style.color = "red";
      alert("닉네임을 작성해주세요");
      return;
    }

    if (!passPass) {
      passwordResultDiv.innerText =
        "비밀번호는 영문 대소문자, 숫자 포함하여 8~20자로 작성해주세요.";
      passwordResultDiv.style.color = "red";
      alert("비밀번호는 영문 대소문자, 숫자 포함하여 8~20자로 작성해주세요.");
      return;
    }

    if (emailPass && emailDupPass && emailCheckPass) {
      try {
        const user = {
          email: emailInput.value,
          password: passwordInput.value,
          nickname: nicknameInput.value,
        };
        const { data } = await axios.post(url + "/signUp/", user, {
          withCredentials: true,
        });
        if (data == "0") {
          alert("회원가입 완료");
          window.location.href =
            "/login";
        } else {
          alert("다시 시도해주세요.");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("이메일 중복확인 및 인증을 진행해주세요.");
    }
  };

  // 닉네임 input에 입력하면
  nicknameInput.oninput = () => {
    if (nicknameInput.value.trim() == "") {
      nicknameResultDiv.innerText = "닉네임을 작성해주세요";
      nicknameResultDiv.style.color = "red";
    } else {
      nicknameResultDiv.innerText = "";
    }
  };

  // 비밀번호 input에 입력하면
  passwordInput.oninput = () => {
    passPass = false;

    // 비밀번호 형식이라면
    if (passwordRegex.test(passwordInput.value)) {
      passPass = true;
      passwordResultDiv.innerText = "비밀번호 형식입니다.";
      passwordResultDiv.style.color = "blue";
    } else {
      passwordResultDiv.innerText =
        "비밀번호는 최소 8자 최대 20자이어야 하고, 영문 대소문자와 숫자를 포함해야 합니다.";
      passwordResultDiv.style.color = "red";
    }
  };

  // 이메일 input에 입력하면
  emailInput.oninput = () => {
    emailPass = false;
    emailDupPass = false;
    emailCheckPass = false;

    // 이메일 형식이라면
    if (emailRegex.test(emailInput.value)) {
      emailPass = true;
      emailResultDiv.innerText = "이메일 형식입니다.";
      emailResultDiv.style.color = "blue";
    } else {
      emailResultDiv.innerText = "이메일 형식이 아닙니다.";
      emailResultDiv.style.color = "red";
    }
  };
};
changeHeaderUtil()
