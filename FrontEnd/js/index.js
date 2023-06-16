// 팝업 열어주는 함수
function openPopup(){
    let popup =  document.querySelector(".popup-wrap");
    // 디버깅 습관
    console.log(popup);
    
    console.log(popup.className);
    console.log(popup.classList);

    // popup.className
    // popup.classList

    // popup.className을 사용하면 문자열을 그대로 대입해주면 되고
    // popup.classList을 사용하면 메소드를 사용하면 된다.
    //

    // popup.className 써보자
    // 클래스 구분을 줘야 하기때문에 ' is-active'앞에 한칸 띄워줬다.
    // popup.className = popup.className + " is-active";
    // popup.classList.add("is-active");
    // 와 메소드 편하네

    // 조건문으로 해보자 클래스가 있는지 확인을 하고 있으면 붙히지말고
    // 없으면 붙히자..
    // popup.classList.contains("is-active") : is-active 클래스가
    //                                          있는지 확인
    // 문자열 버전
    // let strArr = popup.className.split(" ");
    // if(strArr.indexOf("is-active") != -1){
    //     // class 있으면
    //     // 문자열 제거해서 클래스를 지울수도 있고.
    // }else{
    //     // class 없으면
    //     popup.className = popup.className + " is-active";
    // }

    // 메소드 사용해서 조건 추가
    if(popup.classList.contains("is-active")){
        // is-active 있으면 제거할거임 ㅎㅎ
        // remove 클래스 제거 메소드
        popup.classList.remove("is-active");
        var chattingRoom = document.querySelector('.popup-content.chattingroom');
        chattingRoom.style.display = 'none';
        
    }else{
        // is-active 없으면 추가할거임
        // add 클래스 추가 메소드
        popup.classList.add("is-active");
    }
}
// 어렵고 힘든게 정상...

function chattingroom(e){
    var chattingRoom = document.querySelector('.popup-content.chattingroom');
  chattingRoom.style.display = 'block';
  user_id = e;
  console.log(user_id);
}

function chattingpage(){
    var chattingRoom = document.querySelector('.popup-content.chattingroom');
  chattingRoom.style.display = 'none';
}

function enableInput(){
    let messageElement = document.getElementById("message");
    messageElement.contentEditable = true;
    messageElement.focus();
}


changeHeaderUtil()


