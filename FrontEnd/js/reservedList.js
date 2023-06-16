window.onload = async () => {

    try {
        // 예매내역 정보 요청
        const { data } = await axios.get(url + "/mypage/getReservedList", {
            withCredentials: true,
        });

        const reservedListDiv = document.querySelector(".generalMyPage-contents-detail-reserved");
        reservedListDiv.innerHTML =
            `<h1
        style="
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;">
        예매 내역
        </h1>`;

        // 화면 출력 만약 후기 없으면 등록하는 부분 보여주게
        data.forEach(el => {
            const reservedContainer = document.createElement("div");
            reservedContainer.classList.add("reserved-container");
            reservedContainer.id = `reserved_container_${el.reservedList.id}`;
            const showContainter = document.createElement("div");
            showContainter.classList.add("show-container");
            const showImg = document.createElement("img");
            showImg.src = imgPath + "/" + el.reservedList.Show.img;
            const showDetail = document.createElement("div");
            showDetail.classList.add("show-detail");
            const titleSpan = document.createElement("span");
            titleSpan.innerText = el.reservedList.Show.title;
            const detailSpan = document.createElement("span");
            detailSpan.innerText = el.reservedList.Show.detail;

            // span1 시간정보??
            const span1 = document.createElement("span");
            span1.innerText = "예매번호 : " + el.reservedList.reservation_num;

            const priceSpan = document.createElement("span");
            priceSpan.innerText = el.reservedList.Show.price;

            showDetail.append(titleSpan, detailSpan, span1, priceSpan);
            showContainter.append(showImg, showDetail);

            let container;
            if (el.reviewBoard) { // 후기 있으면
                container = createReviewContainer(el);

            } else { // 후기 없으면
                container = createReviewContainerInput(el, false);

            }

            reservedContainer.append(showContainter, container);
            reservedListDiv.append(reservedContainer);

            const inputs = document.querySelectorAll(`.starpoint_${el.reservedList.Show.id}`);
            inputs.forEach((input) => {
                // 별점 선택했을때
                input.addEventListener("change", (e) => {
                    console.log(e.target.id.split("_")[2]);
                    document.querySelector(`#starRate_${e.target.id.split("_")[1]}`).value = e.target.id.split("_")[2];
                });
            });
        });

    } catch (error) {
        console.log(error);
    }

    // 내가 쓴 글 버튼 클릭
    myFreeBoard.onclick = () => {
        window.location.href = "../../freeboard/freeboard.html?page=my";
    }

    // 좋아요한 글 클릭
    likeFreeBoard.onclick = () => {
        window.location.href = "../../freeboard/freeboard.html?page=likes";
    }
}

// 오른쪽위 선택창 바꿔주는 함수
  axios
    .get(" /login/view", { withCredentials: true })
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

const createReviewContainer = (el) => {
    const reviewContainer = document.createElement("div");
    reviewContainer.classList.add("review-container");
    if (el.reviewBoard) {
        reviewContainer.id = `reviewContainer_${el.reviewBoard.id}`;
    } else {
        reviewContainer.id = `reviewContainer_reservedList_${el.reservedList.id}`;
    }

    const userReview = document.createElement("div");
    userReview.classList.add("user-review");

    const userReviewLeft = document.createElement("div");
    userReviewLeft.classList.add("user-review-left");

    // 작성자 이미지, 닉네임, 후기 생성 시각, 공연 제목 말고 좋아요 개수 표시
    const writerImg = document.createElement("img");
    writerImg.src = imgPath + "/" + el.reviewBoard.User.img;

    const userReviewDetail = document.createElement("div");
    userReviewDetail.classList.add("user-review-detail");

    const writerNickDiv = document.createElement("div");
    const writerNick = document.createElement("span");
    writerNick.innerText = el.reviewBoard.User.nickname;
    writerNickDiv.append(writerNick);

    const reviewTime = document.createElement("div");
    const reviewTimeSpan = document.createElement("span");
    reviewTimeSpan.classList.add(`rate${el.reviewBoard.rates}`);

    reviewTimeSpan.innerText = el.reviewBoard.createdAt.substr(0,10);
    reviewTime.append(reviewTimeSpan);

    const likesDiv = document.createElement("div");
    const likes = document.createElement("span");
    likes.innerText = "좋아요 " + el.reviewBoard.likes;
    likesDiv.append(likes);

    userReviewDetail.append(writerNickDiv, reviewTime, likesDiv);

    userReviewLeft.append(writerImg, userReviewDetail);

    const updateButtonContainer = document.createElement("div");
    updateButtonContainer.classList.add("update-button-container");

    const updateButton = document.createElement("button");
    updateButton.classList.add("updateButton");
    updateButton.id = `updateButton_${el.reviewBoard.id}`;
    updateButton.innerText = "수정";

    updateButton.onclick = () => {
        const reviewContainerInput = createReviewContainerInput(el, true);
        // 후기 내용 안보이게
        const container = document.querySelector(`#reviewContainer_${el.reviewBoard.id}`);
        if (container) {
            container.style.display = "none";
        } else {
            document.querySelector(`reviewContainer_reservedList_${el.reservedList.id}`).style.display = "none";
        }
        document.querySelector(`#reserved_container_${el.reservedList.id}`).append(reviewContainerInput);

        const inputs = document.querySelectorAll(`.starpoint_${el.reviewBoard.show_id}_${el.reviewBoard.id}`);
        inputs.forEach((input) => {
            // 별점 선택했을때
            input.addEventListener("change", (e) => {
                console.log(e.target.id.split("_")[3]);
                document.querySelector(`#starRate_${e.target.id.split("_")[1]}_${e.target.id.split("_")[2]}`).value = e.target.id.split("_")[3];
            });
        });
    };

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton");
    deleteButton.id = `deleteButton_${el.reviewBoard.id}`;
    deleteButton.innerText = "삭제";

    // 삭제 버튼 클릭
    deleteButton.onclick = deleteReview;

    updateButtonContainer.append(updateButton, deleteButton);
    userReview.append(userReviewLeft, updateButtonContainer);

    const content = document.createElement("div");
    content.classList.add("content");
    content.innerText = el.reviewBoard.content;

    reviewContainer.append(userReview, content);

    return reviewContainer;
}

const createReviewContainerInput = (el, edit) => {
    const reviewContainerInput = document.createElement("div");
    reviewContainerInput.classList.add("review-container-input");

    const starpointWrap = document.createElement("div");
    starpointWrap.classList.add("starpoint_wrap");

    const startpointBox = document.createElement("div");
    startpointBox.classList.add("starpoint_box");

    let showId;
    let id;
    if (edit) {
        // 수정하는 영역 생성
        showId = el.reviewBoard.show_id;
        id = el.reviewBoard.id;

        startpointBox.innerHTML =
            `<label for="starpoint_${showId}_${id}_1" class="label_star" title="1"><span class="blind">1점</span></label>
    <label for="starpoint_${showId}_${id}_2" class="label_star" title="2"><span class="blind">2점</span></label>
    <label for="starpoint_${showId}_${id}_3" class="label_star" title="3"><span class="blind">3점</span></label>
    <label for="starpoint_${showId}_${id}_4" class="label_star" title="4"><span class="blind">4점</span></label>
    <label for="starpoint_${showId}_${id}_5" class="label_star" title="5"><span class="blind">5점</span></label>
    <input type="radio" name="starpoint" id="starpoint_${showId}_${id}_1" class="star_radio starpoint_${showId}_${id}" />
    <input type="radio" name="starpoint" id="starpoint_${showId}_${id}_2" class="star_radio starpoint_${showId}_${id}" />
    <input type="radio" name="starpoint" id="starpoint_${showId}_${id}_3" class="star_radio starpoint_${showId}_${id}" />
    <input type="radio" name="starpoint" id="starpoint_${showId}_${id}_4" class="star_radio starpoint_${showId}_${id}" />
    <input type="radio" name="starpoint" id="starpoint_${showId}_${id}_5" class="star_radio starpoint_${showId}_${id}" />
    <input type="hidden" id="starRate_${showId}_${id}">
    <span class="starpoint_bg"></span>`;


    } else {
        // 등록하는 영역 생성
        showId = el.reservedList.Show.id;

        startpointBox.innerHTML =
            `<label for="starpoint_${showId}_1" class="label_star" title="1"><span class="blind">1점</span></label>
        <label for="starpoint_${showId}_2" class="label_star" title="2"><span class="blind">2점</span></label>
        <label for="starpoint_${showId}_3" class="label_star" title="3"><span class="blind">3점</span></label>
        <label for="starpoint_${showId}_4" class="label_star" title="4"><span class="blind">4점</span></label>
        <label for="starpoint_${showId}_5" class="label_star" title="5"><span class="blind">5점</span></label>
        <input type="radio" name="starpoint" id="starpoint_${showId}_1" class="star_radio starpoint_${showId}" />
        <input type="radio" name="starpoint" id="starpoint_${showId}_2" class="star_radio starpoint_${showId}" />
        <input type="radio" name="starpoint" id="starpoint_${showId}_3" class="star_radio starpoint_${showId}" />
        <input type="radio" name="starpoint" id="starpoint_${showId}_4" class="star_radio starpoint_${showId}" />
        <input type="radio" name="starpoint" id="starpoint_${showId}_5" class="star_radio starpoint_${showId}" />
        <input type="hidden" id="starRate_${showId}">
        <span class="starpoint_bg"></span>`;

    }

    starpointWrap.append(startpointBox);

    const searchContainer = document.createElement("div");
    searchContainer.classList.add("searchContainer");

    // textarea 아이디 뒷부분과 button 아이디 뒷부분이 같으면 해당하는 textarea의 값이 전송되게
    const textarea = document.createElement("textarea");
    textarea.classList.add("reviewInput");

    let button;
    if (edit) {
        // 수정
        textarea.id = `reviewInput_${showId}_${id}`;
        textarea.value = el.reviewBoard.content;
        button = document.createElement("button");
        button.classList.add("searchButton");
        button.id = `searchButton_${showId}_${id}`;
        button.innerText = "후기 수정";
        button.onclick = (e) => {
            insertReview(e, true);
        };
    } else {
        // 등록
        textarea.id = `reviewInput_${showId}`;
        textarea.placeholder = "후기를 입력하세요.";
        button = document.createElement("button");
        button.classList.add("searchButton");
        button.id = `searchButton_${showId}`;
        button.innerText = "후기 등록";
        button.onclick = (e) => {
            insertReview(e, false);
        };
    }

    searchContainer.append(textarea, button);
    reviewContainerInput.append(starpointWrap, searchContainer);

    return reviewContainerInput;
}


// 후기 등록, 후기 수정 버튼 클릭
const insertReview = async (e, edit) => {
    // 공연 아이디
    const showId = e.target.id.split("_")[1];

    let id;
    let content;
    let rates;
    if (edit) {
        id = e.target.id.split("_")[2];
        content = document.querySelector(`#reviewInput_${showId}_${id}`).value;
        rates = document.querySelector(`#starRate_${showId}_${id}`).value;
    } else {
        content = document.querySelector(`#reviewInput_${showId}`).value;
        rates = document.querySelector(`#starRate_${showId}`).value;
    }

    // content 값이 없으면
    if (!content) {
        alert("후기 작성해주세요.");
        return;
    }

    //rates 값이 없으면
    if (!rates) {
        alert("평점 선택해주세요.");
        return;
    }

    // 등록, 수정할 리뷰
    const review = { content, rates: parseInt(rates) };

    let requestUrl;
    if (edit) {
        requestUrl = url + "/mypage/editReviewBoard/" + id;
    } else {
        requestUrl = url + "/mypage/insertReviewBoard/" + showId
    }

    const { data } = await axios.post(requestUrl, review, {
        withCredentials: true
    });
    if (data == "0") {
        // 성공
        alert("완료되었습니다.");
        // 새로고침
        window.location.reload();
    } else {
        alert("오류");
    }
}


// 리뷰 삭제 버튼 클릭
const deleteReview = async (e) => {
    if (!confirm("리뷰를 삭제하시겠습니까?")) {
        return;
    }
    // 삭제할 리뷰 아이디
    const reviewBoardId = e.target.id.split("_")[1];

    const { data } = await axios.get(url + "/mypage/deleteReviewBoard/" + reviewBoardId, {
        withCredentials: true
    });
    if (data == "0") {
        // 삭제 성공
        alert("삭제되었습니다.");
        // 새로고침
        window.location.reload();
    } else {
        alert("오류");
    }
}

// 오른쪽위 선택창 바꿔주는 함수
axios
.get("/login/view", { withCredentials: true })
.then((res) => {
  console.log(res.data);
  if (res.data) {
    if (res.data == "다시 로그인 해주세요") {
      headerUtilLogin.innerHTML = ` <a href="/login">${res.data}</a>`;
    } else {
      headerUtilLogin.innerHTML = ` ${res.data}`;
      console.log(headerSignUp.innerHTML);
      headerSignUp.innerHTML =
        '<a href="/freeboards/main"> 자유 게시판 </a>';
      console.log(headerSignUp.innerHTML);
    }
  }
})
.catch((error) => {
  console.log(error);
});