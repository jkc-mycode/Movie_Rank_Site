
// 리뷰 작성 폼을 출력하는 함수
export const loadReviewForm = (id) => {
    const $movieReview = document.getElementById("movie_review");
    $movieReview.innerHTML = ' ';

    const review_tmp = `
    <div class="row g-3">
        <div class="col-md-4">
            <input type="text" id="reviewer" class="form-control" placeholder="작성자" aria-label="작성자">
        </div>
        <div class="col-md-4">
            <input type="password" id="review_pass" class="form-control" placeholder="비밀번호" aria-label="비밀번호">
        </div>
    </div><br>
    <div class="row g-3">
        <div class="col-12">
            <textarea class="form-control" id="review_content" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
        </div>
    </div><br>
    <div class="review_btn_box">
        <button id="review_btn" class="btn btn-primary review_btn" type="button">Submit</button>
    </div>
    `
    $movieReview.insertAdjacentHTML("beforeend", review_tmp);

    document.getElementById("review_btn").addEventListener("click", () => {
        saveReview(id);
    })
}


// 리뷰 저장하는 함수
export const saveReview = (id) => {
    let date = new Date();

    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2)
    let days = ('0' + date.getDate()).slice(-2)
    let hours = ('0' + date.getHours()).slice(-2)
    let minutes = ('0' + date.getMinutes()).slice(-2)
    let seconds = ('0' + date.getSeconds()).slice(-2)

    let day = year + '-' + month + '-' + days + " " + hours + ":" + minutes + ":" + seconds

    const review = {
        movieId: id,
        reviewer: document.getElementById("reviewer").value,
        reviewPass: document.getElementById("review_pass").value,
        reviewContent: document.getElementById("review_content").value,
        dateTime: day
    }
    localStorage.setItem(crypto.randomUUID(), JSON.stringify(review));
    console.log(localStorage);
}


// 리뷰 리스트 로드하는 함수
export const loadReview = (id) => {
    let searchReviews = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);

        if (JSON.parse(value).movieId === id) {
            searchReviews.push([key, JSON.parse(value)]);
        }
    }
    console.log(searchReviews);
    searchReviews.sort((a, b) => a[1].dateTime < b[1].dateTime ? -1 : 1);
    console.log(searchReviews);

    document.getElementById("movie_review_list_box").innerHTML = " ";
    searchReviews.forEach((item) => {
        let review_list_tmp = `
        <hr>
        <div class="movie_review_list">
            <div class="review_list_left">
                <div class="review_img_name_date">
                    <div class="review_img_box">
                        <img class="commenter_img" src="./img/commenter_img.png">
                    </div>
                    <div class="review_name_date">
                        <p><b>${item[1].reviewer}</b></p>
                        <p>${item[1].dateTime}</p>
                    </div>
                </div>
                <div class="review_content">
                    <p>${item[1].reviewContent}</p>
                </div>
            </div>
            <div class="review_list_right">
                <div class="update_btn">
                    <button id="update_btn_${item[0]}" type="button" class="btn btn-outline-warning">수정</button>
                </div>
                <div class="delete_btn">
                    <button id="delete_btn_${item[0]}" type="button" class="btn btn-outline-danger">삭제</button>
                </div>
            </div>
        </div>
        `
        document.getElementById("movie_review_list_box").insertAdjacentHTML("beforeend", review_list_tmp);

        document.getElementById(`update_btn_${item[0]}`).addEventListener("click", () => {
            updateReview(item[0]);
        });

        document.getElementById(`delete_btn_${item[0]}`).addEventListener("click", () => {
            deleteReview(item[0]);
        });
    })

}


// 리뷰 수정하는 함수
export const updateReview = (reviewId) => {
    const reviewData = JSON.parse(localStorage.getItem(reviewId));

    if (prompt("비밀번호를 입력해주세요.", "") === reviewData.reviewPass) {
        reviewData.reviewer = prompt("작성자를 입력해주세요.", reviewData.reviewer);
        reviewData.reviewContent = prompt("내용을 입력해주세요.", reviewData.reviewContent);
        reviewData.reviewPass = prompt("내용을 입력해주세요.", "");
        localStorage.removeItem(reviewId);
        localStorage.setItem(reviewId, JSON.stringify(reviewData));
        alert("변경되었습니다!");
        loadReview(reviewData.movieId);
    } else {
        alert("비밀번호가 틀렸습니다!!");
    }
}


// 리뷰 삭제하는 함수
export const deleteReview = (reviewId) => {
    const reviewData = JSON.parse(localStorage.getItem(reviewId));

    if (prompt("비밀번호를 입력해주세요.", "") === reviewData.reviewPass) {
        localStorage.removeItem(reviewId);
        alert("삭제 되었습니다");
        loadReview(reviewData.movieId);
    } else {
        alert("비밀번호가 틀렸습니다!!");
    }
}