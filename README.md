<div align = "center">
    <img src="images/logo.png">
</div>

<p align="center">
    <br> <a href="https://yeong-512f5.web.app/" style="font-size: medium;"><b>  너영나영 사이트 바로가기 </b></a> <br><br>
    <a href="https://youtu.be/k50wjZlmplM" style="font-size: medium;"><b>  너영나영 시연 영상 </b></a>
</p> 

<br><br><br>

## 프로젝트 소개
‘너하고 나하고’라는 의미를 담고 있는 제주어인 <너영나영>은 온라인과 오프라인에서 스포츠 경기를 함께 즐기고자 하는 사용자들을 연결하는 서비스입니다. 같이 할 사람을 구하는 사용자는 <너영나영>에서 원하는 스포츠 경기를 선택하면, 사용자의 기본 정보와 함께 같이 게시글이 올라갑니다. 다른 사용자들은 이미 올라온 게시글을 보고 함께 하려는 사람을 찾습니다.<br><br><br>


## 주요 기능
- 로그인, 회원가입 및 정보 수정
- 경기별 게시글 게시판
- 게시글 작성 및 조회, 매칭 신청
- 대기, 모집 마감, 현재 신청 인원을 통한 매칭 현황 제공
- 사용자의 프로필 카드를 보고 함께할 사람을 선택
- 모집 완료 시 매칭 성공된 사용자의 이메일 제공
<br><br><br>

## 개발 팀원
|                                                                                       조서림                                                                                       |
|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| [<img src="https://github.com/kookmin-sw/capstone-2024-16/assets/65213245/274ad6c0-e2b2-4752-a172-96ed13859248" height=130 width=130> <br/> @srcho01](https://github.com/srcho01) | 
|                                                                                  기획, 디자인, FE                                                                                  |

<br><br>

## 사용 기술
<h4> ⚒️ Tech Skills ⚒️ </h4>
<p display="inline-block">
    <img src=https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB>
    <img src=https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E>
    <img src=https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white>
    <img src=https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34>
</p>

<h4> 🌐 Others 🌐 </h4>
<p display="inline-block">
    <img src=https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white>
    <img src=https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white>
    <img src=https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white> 
    <img src=https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white>
</p>

<br><br>

## 상세 기능
### 로그인 및 회원가입
<p align="center">
    <img src="images/sign_up.jpg" align="center" width="47%">
    <img src="images/login.jpg" align="center" width="49%">
</p>

- 회원가입에는 이메일, 이름, 비밀번호, 성별, 닉네임이 필수적으로 필요하고, 관심 스포츠와 관심 스포츠팀은 추가로 선택할 수 있습니다.
- 회원가입 시 이메일과 닉네임은 확인을 해야 가입 가능합니다.
- 관심 스포츠와 관심 스포츠팀은 드롭다운 메뉴에서 선택하고, 버튼을 눌러 삭제합니다.<br><br>


### 메인 화면
<p align="center">
    <img src="images/main_logout.jpg" align="center" width="49%">
    <img src="images/main_login.jpg" align="center" width="48%">
</p>

- 현재 시각과 각 스포츠별 경기 일정을 최대 10개씩 보여줍니다.
- 화면 비율에 따라 가로로 스크롤할 수 있습니다.
- 경기 스케쥴 카드를 눌러 경기별 매칭 게시판으로 이동합니다.
- 로그인하지 않았을 때는 경기 스케쥴 카드를 누르면 로그인 화면으로 이동합니다.
- 로그인을 했을 때는 닉네임을 표시하고  프로필 수정, 마이페이지 화면으로 이동할 수 있습니다.<br><br>


### 프로필 수정
<p>
    <img src="images/profile.jpg" width="50%">
</p>

- 현재 저장된 정보를 불러옵니다.
- 이메일, 이름, 성별은 수정할 수 없고, 닉네임, 관심 스포츠, 관심 스포츠팀은 변경할 수 있습니다.<br><br>


### 매칭 게시판
<p align="left">
    <img src="images/match_board.jpg" align="center"  width="59%">
    <img src="images/post_offline.jpg" align="center" width="17%">
    <img src="images/post_online.jpg" align="center" width="17%">
</p>

- "+" 버튼을 누르면 글을 등록할 수 있습니다.
- 오프라인과 온라인 중에 선택하여 글을 작성합니다.
- 글을 등록하면 팝업이 꺼지고 작성한 글이 매칭 게시판에 보여집니다.<br><br>


### 마이페이지
<p align="center">
    <img src="images/mypage_before.jpg" align="center" width="68%">
    <img src="images/match_ing.jpg" align="center" width="30%">
</p>
<p align="center">
    <img src="images/mypage_after.jpg" align="center" width="69%">
    <img src="images/match_complete.jpg" align="center" width="30%">
</p>

- 자신이 등록한 글과 신청한 글을 볼 수 있습니다.
- 등록한 글을 누르면 해당 글에 함께하고자 하는 사용자 목록을 보여줍니다.
- '정보'를 누르면 신청한 사용자의 프로필을 보고 수락할 수 있습니다.
- 수락이 완료된 사용자는 수락 상태로 변경됩니다.
- 모집 인원을 달성하면 모집 완료 상태로 바뀌고, 글을 누르면 글 작성자를 포함하여 함께할 사람들의 이메일이 보여집니다.