// chatting.js

// 클라이언트 소켓 생성
//const socket = io();

// 전송 버튼 클릭 이벤트 핸들러
const sendButton = document.querySelector('.chat-send-botton');
sendButton.addEventListener('click', async() => {
  // 입력된 채팅 내용 가져오기
  const chatInput = document.querySelector('#chatId');
  console.log(chatInput);
  const message = chatInput.value;
  
  // 채팅 내용을 서버로 전송
  //socket.emit('chatMessage', message);
  console.log(user_id);
 await axios.post('http://127.0.0.1:8080/chat/create',{data:{user_id ,message}})

  // 입력 필드 초기화
  chatInput.value = '';
});
let user_id = null;


const getUsers = async()=>{
  const {data} = await axios.get("http://127.0.0.1:8080/chat/Users") 
  console.log(data);
  const popupContent = document.querySelector(".popup-content");
  data.forEach((e,index)=>{
    const div = document.createElement("div");
    const div2 = document.createElement("div");
    const img = document.createElement("img");
    const p = document.createElement("p");
    div.className="imgsize"
    img.src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTExMDFfMjkx%2FMDAxNjM1NzcyNTAyMzM2.cJE1tVC6KDvRbLggbBVEvvTt44ThhLU0wXelkyRh_bgg.ogMtpmeg-v7VIqtsSBpxHCNzt--aP7oHwL3PVm2RgiQg.JPEG.yunalee1997%2F4cc82b04dee244c22d13aee91e4b5e58.jpg&type=sc960_832"
    p.onclick=()=>{chattingroom(index+1)};
    p.innerHTML=e.nickname;
    div2.className="border-bottom"
    div.append(img,p);
    popupContent.append(div,div2);

  });

}
getUsers();

// 서버에서 전달된 채팅 메시지를 받는 이벤트 핸들러
// socket.on('chatMessage', (message) => {
//   // 받은 메시지를 처리하고 화면에 표시
//   const chatContainer = document.querySelector('.chattingroom');
//   const messageElement = document.createElement('div');
//   messageElement.textContent = message;
//   chatContainer.appendChild(messageElement);
// });

// 이전 채팅 내용을 받아오는 함수

sendButton.addEventListener('click', () => {
  const input = document.getElementById('chatId');
  const message = input.value;

  // 메시지 전송 로직 처리 후 HTML에 채팅 내용 추가
  const chatMessages = document.getElementById('chatMessages');
  const p = document.createElement('p');
  p.textContent = message;
  chatMessages.appendChild(p);});

  sendButton.addEventListener('click', () => {
    const input = document.getElementById('chatId');
    const message = input.value;
  
    // 채팅 영역 스크롤 제어
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
   
  
 // 오른쪽위 선택창 바꿔주는 함수
window.onload = function () {
  axios
    .get("http://127.0.0.1:8080/login/view", { withCredentials: true })
    .then((res) => {
      console.log(res.data);
      if (res.data) {
        if (res.data == "다시 로그인 해주세요") {
          headerUtilLogin.innerHTML = ` <a href="/login">${res.data}</a>`;
        } else {
          headerUtilLogin.innerHTML = ` ${res.data}`;
          console.log(headerSignUp.innerHTML)
          headerSignUp.innerHTML = '<a href="/freeboards/main"> 자유 게시판 </a>';
          console.log(headerSignUp.innerHTML)
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
