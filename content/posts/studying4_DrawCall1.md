---
title: "Draw Call: 드로우콜(1)"
date: 2021-11-24T23:19:40+09:00
tags: ["unity","DrawCall","Batch"]
categories: ["unity"]
cover:
  hidden: true
  image: "/logo/logo-unity-01.png"
  alt: "unity"
---
오늘 비대면 면접을 보았는데, 이전 프로젝트에서 `드로우콜`을 줄이려는 노력을 했냐고 물어보셨다.<br>
나는 딱히 `드로우콜`에 대해서 생각을 해본 적이 별로 없어서 없다고 말했지만, 이 부분에 대해 좀 더 알 필요가 있다고 생각했다. <br>그래서 오늘의 공부는 `드로우콜`!

## {{< color color="#FFD400" text="Draw Call" >}}이 뭐야? 🧐
-  간단 요약 정의: CPU가 GPU에 오브젝트를 그리라는 명령을 호출하는 것.<br>

💚세부 설명
1.  오브젝트가 실제 화면에 렌더링 되려면 CPU -> GPU 정보 전달 필요함.
2. 정보: 메시, 텍스처, 쉐이더, 트랜스폼, 알파블렌딩 여부 등이 존재.
3. CPU 메모리에서 GPU 메모리로 위의 정보 데이터들의 복사가 이루워짐.(게임 수행 내내 데이터는 메모리에 상주)
4. GPU에는 렌더링 할 것의 상태 정보를 담는 테이블이 존재.(`Render States`: GPU 메모리의 데이터 위치 정보 보유)
5. 새로운 오브젝트를 그릴 때 마다 상태 변경 CPU -> GPU로 상태 변경 명령을 내림.(변경이 필요한 부분만)
6. CPU -> GPU로 상태 변경 명령(`render state change`) + 렌더 명령(`Draw Primitive Call(DP Call)`) = `드로우콜`
7. CPU -> 커맨드 버퍼(`Command Buffer`) -> GPU 순으로 명령이 이루워짐.  

<br>

## {{< color color="#FFD400" text="Draw Call" >}}이 많으면 무엇이 문제일까? 🧐 
- 명령을 GPU에서 사용하는 신호로 변환해야하기 때문에 CPU에 부담이 된다.(CPU 오버헤드)  


<br>

## 어떻게 해야할까? 🧐 
- 렌더링에 관련된 작업들을 별도의 쓰레드에서 수행하게한다.(`Multithreaded Rendering`)
![유니티 설정](/images/studying4_0.png)
- 드로우콜을 줄인다.

<br>

 ⚠️주의⚠️
 
 <br>

 드로우콜을 줄이는 데에는 텍스쳐의 크기 또는 폴리곤의 수를 줄이는 것과 관련이 없다!  
 

<br>

## {{< color color="#FFD400" text="Draw Call" >}}은 어떻게 발생되는 걸까? 🧐
보통 오브젝트를 그릴 때 Mesh가 1개, Material이 1개일 경우 드로우콜이 한 번 일어난다.
1. `Mesh`가 여러 개인 경우
2. `Material`이 여러 개인 경우
3. `Shader`에 따라서...
<br>

⚠️주의⚠️

<br>

**수많은 상태 변경들을 포함**하기 때문에 드로우콜의 비용은 개당으로 계산하기 어렵다.

<br>

 참고자료: 유니티 그래픽스 최적화 스타트업
 
