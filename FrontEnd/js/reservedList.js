window.onload = async () => {

    try {
        // 예매내역 정보 요청
        const { data } = await axios.get(url + "/mypage/getReservedList", {
            withCredentials: true,
        });

        console.log(data);

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

            const priceSpan = document.createElement("span");
            priceSpan.innerText = el.reservedList.Show.price;

            showDetail.append(titleSpan, detailSpan, span1, priceSpan);
            showContainter.append(showImg, showDetail);

            let container;
            if (el.reviewBoard) { // 후기 있으면
                container = createReviewContainer(el);

            } else { // 후기 없으면
                container = createReviewContainerInput(el);

            }

            console.log(container);
            reservedContainer.append(showContainter, container);
            reservedListDiv.append(reservedContainer);

            if (!el.reviewBoard) {
                const inputs = document.querySelectorAll(`.star_radio`);
                inputs.forEach((input) => {
                    // 별점 선택했을때
                    input.addEventListener("change", (e) => {
                        console.log(e.target.id.split("_")[2]);
                        document.querySelector(`#starRate_${e.target.id.split("_")[1]}`).value = e.target.id.split("_")[2];
                    });
                });

            }
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





    // // 수정버튼을 누르면 아이디로 해당하는 태그를 찾아 append로 붙여준다.
    // // review-container안에 review,content두개의 태그가 있다. 이 둘을 none 클래스를 붙여주어 안 보여지게 한다.(review-container의
    // // html을 공백으로 해도 되지만 너무 멀리 와벼렸다 ) 그 다음 해당자리에inputReview의 html을 붙여넣어준다.
    // // review-container-input는 모든 예매 후기가 공통으로 가지는 양식이므로 All로 가져올 필요 없다. 다만 review-container는
    // // 해당하는 class로 가져오자.
    // const inputReview = document.querySelectorAll(".review-container-input");
    // const afterReview = document.querySelectorAll(".review-container");
    // // // 수정 버튼 클릭하면
    // updateButton_3.onclick = () => {
    //   const review = document.querySelectorAll(".user-review");
    //   const content = document.querySelectorAll(".content");
    //   review[0].classList.add("none");
    //   content[0].classList.add("none");
    //   console.log(inputReview[0]);
    //   afterReview[0].innerHTML += inputReview[0].innerHTML;
    // };





}



const createReviewContainer = (el) => {
    const reviewContainer = document.createElement("div");
    reviewContainer.classList.add("review-container");

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
    reviewTimeSpan.innerText = el.reviewBoard.createdAt;
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

const createReviewContainerInput = (el) => {
    const reviewContainerInput = document.createElement("div");
    reviewContainerInput.classList.add("review-container-input");

    const starpointWrap = document.createElement("div");
    starpointWrap.classList.add("starpoint_wrap");

    const startpointBox = document.createElement("div");
    startpointBox.classList.add("starpoint_box");

    const showId = el.reservedList.Show.id;

    startpointBox.innerHTML =
        `<label for="starpoint_${showId}_1" class="label_star" title="1"><span class="blind">1점</span></label>
    <label for="starpoint_${showId}_2" class="label_star" title="2"><span class="blind">2점</span></label>
    <label for="starpoint_${showId}_3" class="label_star" title="3"><span class="blind">3점</span></label>
    <label for="starpoint_${showId}_4" class="label_star" title="4"><span class="blind">4점</span></label>
    <label for="starpoint_${showId}_5" class="label_star" title="5"><span class="blind">5점</span></label>
    <input type="radio" name="starpoint" id="starpoint_${showId}_1" class="star_radio starpoint_${showId}" />
    <input type="radio" name="starpoint" id="starpoint_${showId}_3" class="star_radio starpoint_${showId}" />
    <input type="radio" name="starpoint" id="starpoint_${showId}_2" class="star_radio starpoint_${showId}" />
    <input type="radio" name="starpoint" id="starpoint_${showId}_4" class="star_radio starpoint_${showId}" />
    <input type="radio" name="starpoint" id="starpoint_${showId}_5" class="star_radio starpoint_${showId}" />
    <input type="hidden" id="starRate_${showId}">
    <span class="starpoint_bg"></span>`;

    starpointWrap.append(startpointBox);

    const searchContainer = document.createElement("div");
    searchContainer.classList.add("searchContainer");

    // textarea 아이디 뒷부분과 button 아이디 뒷부분이 같으면 해당하는 textarea의 값이 전송되게
    const textarea = document.createElement("textarea");
    textarea.classList.add("reviewInput");
    textarea.id = `reviewInput_${showId}`;
    textarea.placeholder = "후기를 입력하세요.";
    const button = document.createElement("button");
    button.classList.add("searchButton");
    button.id = `searchButton_${showId}`;
    button.innerText = "후기 등록";
    button.onclick = insertReview;

    searchContainer.append(textarea, button);
    reviewContainerInput.append(starpointWrap, searchContainer);


    return reviewContainerInput;
}


// 후기 등록 버튼 클릭
const insertReview = async (e) => {
    // 공연 아이디
    const showId = e.target.id.split("_")[1];
    const content = document.querySelector(`#reviewInput_${showId}`).value;
    const rates = document.querySelector(`#starRate_${showId}`).value;

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

    // 등록할 리뷰
    const review = { content, rates: parseInt(rates) };

    const { data } = await axios.post(url + "/mypage/insertReviewBoard/" + showId, review, {
        withCredentials: true
    });
    if (data == "0") {
        // 등록 성공
        alert("등록되었습니다.");
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


