# 🖥️ Team 9to9의 팀 소개 페이지 프로젝트
![alt text](./img/project_thumbnail.png)

## 프로젝트 소개
- 프로젝트 이름 : SPING(스핑)
- 내용 : 인기 영화 검색 사이트 구현하기
- 구분 : 개인 프로젝트
- GitHub Page : [https://jkc-mycode.github.io/Movie_Site/](https://jkc-mycode.github.io/Movie_Site/)

<br>

## 1. 개발 기간
- 2024.04.23 ~ 2024.04.26

<br>

## 2. 개발 환경
- FrontEnd : HTML, CSS, JavaScript, Bootstrap
- API : [TMDB 인기 영화 정보](https://www.themoviedb.org/?language=ko)

<br>

## 3. 주요 기능
### 3-1. TMDB API를 이용한 영화 데이터 가져오기
- 

<br>

### 3-2. 영화 제목으로 검색
- 

<br>

### 3-3. 페이지네이션(Pagination)
- 

<br>

## 6. 페이지 사진 첨부
![alt text](./imgs/readme/image.png)
![alt text](./imgs/readme/main_page_member_card.png)
![alt text](./imgs/readme/main_page_comment.png)
![alt text](./imgs/readme/modal-1.png)
![alt text](./imgs/readme/modal-2.png)
![alt text](./imgs/readme/modal-3.png)
![alt text](./imgs/readme/modal-4.png)
![alt text](./imgs/readme/modal-5.png)

<br>

## 7. 어려웠던 점
### 7-1. 코드 분리의 어려움 (김정찬)
- 초반에 코드 및 파일 분리를 제대로 기획하지 못해서 각자가 똑같은 파일을 복사해서 가져가서 작업 함
- 복사된 파일을 가져가서 작업 후 깃허브로 올리면 한 사람이 직접 코드를 병합하는 방식을 사용함
- class 명이나 ID가 겹쳐서 스타일이 깨지는 경우가 많이 발생함
- 특히 프로젝트 규모가 작다보니 코드나 파일의 분리가 어려웠음


### 7-2. 댓글 기능을 모달 창에 넣기 (김정찬)
- 처음 구상은 댓글 기능을 각자의 모달 창에 넣어서 댓글을 따로 보고 작성할 수 있도록 만들 예정이었음
- 하지만 댓글 기능을 구현하고 각자의 모달 창에 넣어보니 각자의 규격에 맞도록 댓글 구역을 수정해야 하는 문제가 발생함
- 댓글 리스트는 하나의 스크립트 파일로 일정한 형식의 HTML로 가져오기 때문에 각자에 맞도록 수정하려면 인원수 만큼의 코드가 필요함 
- (근데 지금 생각해보면 class를 여러개 사용해서 따로 구현할 수 있지 않았을까 생각함)
- 댓글의 CRUD 는 파이어베이스에서 직접 제공하고 있기 때문에 간편하게 구현이 가능함


### 7-3. 모달창 안에서 레이어 구분 나누기 (홍성빈)
- 모달 창 규격 안에서 class 사용해 구간을 나눠놓고 사용해야함
- 그밖을 벗어나서 임의로 position 기능을 이용할때마다 각자 모니터 마다 배치가달라짐
