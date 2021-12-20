---
title: "Git(1)"
date: 2021-12-17T21:20:43+09:00
tags: ["git"]
categories: ["git"]
series: [""]
chapter: [""]
author: [""]
ShowReadingTime: true
ShowBreadCrumbs: false
ShowPostNavLinks: true
ShowCodeCopyButtons: true
ShowCreativeCommons: true
showToc: true
TocOpen: false
comments: true
disableShare: false
searchHidden: false
cover:
  hidden: true
  image: "/logo/logo-git.png"
  alt: "git"

draft: false
---

git을 이용을 하는데... 내가 아는 것이라고는 오로지 `add->commit->push`밖에 없어서 좀 더 알아보고자 포스팅을 하기로 했다.

## {{< color color="#FFD400" text="git" >}}이 뭐야? 🧐
- 버전 관리 시스템(VCS)
- 백업
1. 원격 저장소에 저장해서 어디에서든지 내려받아 작업을 수행할 수 있다.
2. 이전 버전으로 돌아갈 수 있다.
- 협업
1. 다른 사람이 수정한 내역도 원격 서버에 올라가 있다면 자신의 저장소에도 적용이 가능
2. commit내역을 통해 누가 무엇을 수정했는지 알 수 있음.
3. branch를 통해 각자 기능을 만들고 이것들을 병합하여 하나의 branch로 만들 수 있음.(충돌에 유의해야함)


## 💛워킹 디렉터리
- 사용자가 실제로 작업하는 작업공간.

## 💛스테이지 영역
- 임시영역
- 워킹 디렉터리에서 생성하거나 수정한 파일을 git add 명령어를 사용할 시 이곳으로 저장됨.
- 이 영역의 파일들은 모두 `tracked` 상태.
### 💚tracked 상태
- git이 파일을 추적할 수 있는 상태.
- 생성 후 git add 명령어를 수행한 상태.
- 파일 수정이 이루어졌는지 확인이 가능한 상태.
### 💚untracked 상태
- git이 파일을 추적할 수 없는 상태.
- 생성 후 git add 명령어를 수행하지 않은 상태.
- 파일을 수정해도 git이 알 수 없는 상태.
### 💚staged 상태
- 워킹 디렉터리에서 수행한 작업들(생성,수정 모두)이 git add 명령어를 통해 스테이지 영역에 올라온 상태.
### 💚unstaged 상태
- 워킹 디렉터리에서 새로 생성한 파일을 아직 git add 명령어를 수행하지 않은 상태.(+ untracked 상태)
- 기존 staged 상태의 파일을 수정하고 git add 명령어를 수행하지 않은 상태.(+ modified 상태 + tracked 상태)
### 💚modified 상태
- tracked 상태의 파일을 수정후 git add 명령어를 수행하지 않은 상태.
- git add 명령어를 수행해줘야 하는 상태.
### 💚unmodified 상태
- 스테이지로 파일을 올린 후 어떠한 수정도 없는 상태.

## 기본 {{< color color="#FFD400" text="명령어" >}}를 알아보자 🧐
### 0. `clone`
- 원격 저장소를 로컬 저장소에 저장하는 명령어.
- 기존에 저장소가 미리 만들어져 있어야함.
- clone 명령어 수행.
![clone](/images/studying17_0.PNG)
- 이후 생성된 파일.
![clone](/images/studying17_1.PNG)

### 1. `add`
- 워킹 디렉터리 -> 스테이지 영역.
- untracked -> tracked 상태 변경.
- git이 파일을 추적할 수 있도록 해주는 명령어.
- 파일 생성 또는 수정을 했을 경우(원격 저장소에 파일을 저장하고 싶다면) 반드시 해주어야 한다.

### 2. `status`
- git의 현재 상태를 보여줌.
- test예시: test를 생성 직후에는 commit해야한다고 알려줌. 해당 파일 수정후 modified되었다고 알려줌.
![add](/images/studying17_2.PNG)

### 3. `commit`
- 변화된 내옹을 저장소에 기록.
- 반드시 tracked 상태여야 함.
- 스테이지 영역에 새로운 변경 내용이 있어야 함.
- add 되어 있던 파일들을 기록.
- `-m`를 통해 짧은 메세지를 추가 할 수 있다.
- test예시: 수정된 Test.txt를 커밋해보았다. 
![add](/images/studying17_3.PNG)

### 4. `rm --cached`
- 파일을 잘못 올렸을 경우 사용.
- staged -> untracked 상태 변경.
- commit에 반영하고 싶지않을 경우에 사용.
- test 예시
![add](/images/studying17_4.PNG)

### 5. `reset HEAD`
- commit을 한 파일을 rm 을 통해 untracked상태로 변경하였다면 이 명령어를 사용하여 파일을 정리해주어야함. <- 사실 이해가 잘 가지않음...

### 6. `checkout 파일이름`
- 해당 파일을 이전 commit 내용으로 되돌림.
- test예시: 변경을 commit = 기존 change만 있던 내용에 miss 단어 추가.
![add](/images/studying17_6.PNG)
- test예시: checkout 후 결과 = 다시 이전의 chnage만 있던 상태로 돌아감.

### 7. `log`
- commit 내역 조회.
![add](/images/studying17_5.PNG)

<br>

참고 "Git 교과서"
