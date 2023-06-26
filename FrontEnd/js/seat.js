// let dropdown = document.querySelector('.dropdown');
// let dropdownContent = document.querySelector('.dropdown-content');

// dropdown.addEventListener('click', function() {
//     dropdownContent.classList.toggle('show');
// });

// reservation_num => 공연아이디, 날짜 정보 포함

window.onload = async () => {
  // reservation_num 받아오기
  const reservation_num = new URLSearchParams(window.location.search).get(
    "reservation_num"
  );
  const show_id = parseInt(reservation_num.split("_"));

  const { data } = await axios.get("/reservation/user", {
    withCredentials: true,
  });
  const user_id = data.primaryKey;

  let ticketPrice;
  // let seats = document.querySelectorAll('.seat');
  let countDisplay = document.getElementById("count");
  let totalDisplay = document.getElementById("total");
  // let ticketPrice = 10000; // 한 좌석당 가격
  let selectedSeats = []; // 선택된 좌석 배열
  // let selectedSeats = null; // 선택된 좌석 배열

  // socket 연결
  const socket = io();

  socket.emit("reservation");

  socket.emit("joinReservation", { show_id, reservation_num });

  socket.on("joinReservation", (data) => {
    const { show, seats } = data;

    ticketPrice = show.price;

    // 좌석 출력
    renderSeats(seats);

    // 공연 정보 출력
    renderShow(show);
  });

  // 좌석 정보 받아와서 좌석 출력(요소 생성, 결제/미결제 좌석에 따라 다르게 출력)
  const renderSeats = (seats) => {
    const seatsDiv = document.querySelector(".seats-div");
    const selectedSeat = document.querySelector(".selected");

    let selectedX;
    let selectedY;
    selectedSeats[0] = null;

    if (selectedSeat) {
      selectedX = selectedSeat.getAttribute("x");
      selectedY = selectedSeat.getAttribute("y");

      selectedSeats[0] = selectedSeat;
    }

    seatsDiv.innerHTML = "";

    seats.forEach((seatX, x) => {
      const seatXContainer = document.createElement("div");
      seatXContainer.classList.add("row");
      seatX.forEach((seat, y) => {
        const seatY = document.createElement("div");
        seatY.classList.add("seat");
        seatY.setAttribute("x", x);
        seatY.setAttribute("y", y);

        if (selectedX) {
          // 사용자가 선택해놓은 좌석
          if (x == selectedX && y == selectedY) {
            seatY.classList.add("selected");
          }
        }

        // 이미 결제된 좌석이면
        if (seat == 1) {
          seatY.classList.remove("selected");
          seatY.classList.add("disabled");
        }

        seatXContainer.append(seatY);
      });

      seatsDiv.append(seatXContainer);
    });

    // 클릭이벤트 추가
    addSeatsEvent();
  };

  // 공연 정보 출력하는 부분
  const renderShow = (show) => {
    showTitle.innerText = show.title;
    showMonth.innerText = reservation_num.split("_")[1].substring(0, 2);
    showDate.innerText = reservation_num.split("_")[1].substring(2, 4);
  };

  function updateSelectedSeatsCount() {
    // let selectedSeatsCount = selectedSeats.length;
    let selectedSeatsCount;
    if (selectedSeats[0]) {
      selectedSeatsCount = 1;
    } else {
      selectedSeatsCount = 0;
    }
    countDisplay.textContent = selectedSeatsCount;
  }

  function updateTotalPrice() {
    let totalPrice = selectedSeats.reduce(function (total, seat) {
      return total + ticketPrice;
    }, 0);
    totalDisplay.textContent = totalPrice;
  }

  // 좌석 클릭 이벤트 추가하는 함수
  const addSeatsEvent = () => {
    let seatsArr = document.querySelectorAll(".seat");
    seatsArr.forEach((seats) => {
      // 좌석 클릭 이벤트 추가
      seats.addEventListener("click", function () {
        if (this.classList.contains("disabled")) {
          alert("선택할 수 없는 좌석임");
          return;
        }

        if (this.classList.contains("selected")) {
          // 이미 선택된 좌석인 경우, 선택 취소
          this.classList.remove("selected");
          selectedSeats.splice(selectedSeats.indexOf(this), 1);
          selectedSeats[0] = null;
          // } else if (selectedSeats.length < 2) {
        } else if (!selectedSeats[0]) {
          const x = this.getAttribute("x");
          const y = this.getAttribute("y");
          console.log(x, y);
          this.classList.add("selected");
          selectedSeats[0] = this;
          socket.emit("getSeat", { x, y, reservation_num });
        } else {
          alert("좌석 하나만 예매 가능");
        }

        updateSelectedSeatsCount();
        updateTotalPrice();
      });
    });
  };

  socket.on("getSeatsInfo", (data) => {
    const { seats } = data;
    console.log("getSeatsinfo", seats);
    renderSeats(seats);
  });

  socket.on("getSeat", (data) => {
    console.log(data);
    const { pay, seats, x, y } = data;
    // 이미 결제된 좌석이라면
    if (pay) {
      alert("이미 다른 고객님이 결제한 좌석입니다.");
      renderSeats(seats);
    } else {
      const seat = document.querySelector(`.seat[x="${x}"][y="${y}"]`);
      // selectedSeats.push(seat);
      selectedSeats[0] = seat;
      // selectedSeats = seat;
      // 선택되지 않은 좌석이고 최대 선택 가능한 개수보다 작을 경우, 선택
      seat.classList.add("selected");
    }
  });

  // 결제하기 버튼 클릭
  payButton.onclick = async () => {
    // const x = selectedSeats.getAttribute("x");
    // const y = selectedSeats.getAttribute("y");
    const x = selectedSeats[0].getAttribute("x");
    const y = selectedSeats[0].getAttribute("y");

    socket.emit("payment", { x, y, reservation_num, show_id, user_id });

    try {
      console.log(ticketPrice)
      // 추가할 부분. 확인하세요
      // 결제창 출력
      // 결제
      location.href = `/reservation/pay/?x=${x}&y=${y}&reservation_num=${reservation_num}&show_id=${show_id}&user_id=${user_id}&ticketPrice=${ticketPrice}`;
      setTimeout(async () => {
        // 결제 완료되면 실행될 코드
        // 지금은 결제 부분 구현되지 않아서 settimeout으로 처리함
        selectedSeats[0] = null;
        const { data } = await axios.post(
          "/reservation/check",
          {
            x,
            y,
            reservation_num,
            show_id,
            user_id,
          },
          {
            withCredentials: true,
          }
        );

        if (data.result) {
          alert("결제 완료");

          // 마이페이지로 이동하거나 결제 완료되고 처리할 코드 작성
          // 아니면 새로고침
        } else {
          alert("다시 시도하거나 관리자에게 문의하세요");
        }
      }, 1000);
    } catch (error) {
      // 결제 취소하거나 에러나면
      socket.emit("paymentReset", { x, y, reservation_num, show_id, user_id });
    }
  };

  socket.on("payment", (data) => {
    console.log(data.message);
    if (!data.result) {
      // 결제 요청 보낸 좌석이 이미 결제된 좌석이라면
      alert("이미 결제된 좌석입니다.");
      renderSeats(data.seats);
      // 수정할 부분 확인하세요.
      // 결제창을 생성했는데 result == false => 새로고침할것인지
    }
  });

  // 결제 취소
  socket.on("paymentReset", (data) => {
    console.log(data.message);
    if (data.result) {
      alert("결제 취소 완료");
    } else {
      alert("오류. 관리자에게 문의 바랍니다.");
    }
  });

  // 에러나면
  socket.on("error", (data) => {
    alert(data.error);
  });

  changeHeaderUtil();
};

// let movies = document.querySelectorAll('.dropdown-content div');

// movies.forEach(function(movie) {
//     movie.addEventListener('click', function() {
//         let selectedMovie = this.textContent;
//         // 선택한 영화로 드롭다운 버튼 내용 변경
//         dropdown.firstElementChild.textContent = selectedMovie;
//         // 위 코드는 영화를 선택할 때마다 selectedMovie 변수의 값을 이용하여
//         // dropdown 요소의 첫 번째 자식 요소의 텍스트 내용을 변경하고 있다.
//         dropdownContent.classList.remove('show');
//     });
// });
