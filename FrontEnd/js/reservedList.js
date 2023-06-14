window.onload = async () => {

try {
        // 유저 정보 요청
        const data = await axios.get(url+"/mypage/getReservedList", {
            withCredentials: true,
        });

        console.log(data);
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

