---
title: "Draw Call: 드로우콜(2)"
date: 2021-11-25T00:05:33+09:00
tags: ["unity","DrawCall","Batch"]
categories: ["unity"]
cover:
  hidden: true
  image: "/logo/logo-unity-01.png"
  alt: "unity"
---

이전 포스트에서는 드로우콜 자체에 대해 알아보았다면, 이번 포스트에서는 드로우콜을 줄이기 위해 알아야하는 것과 드로우콜을 줄이는 방법에 대해 알아보겠다.

## {{< color color="#FFD400" text="Batch" >}}, {{< color color="#FFD400" text="Batching" >}}이 뭐야? 🧐
- `Batch`: 이전 포스트에서 언급했던 DP Call과 render state change들을 합친 넓은 의미의 드로우콜.
- `Batching`: 드로우콜을 줄이는 작업(어떠한 조건 아래 다수의 Batch를 하나로 만드는 작업).

💚`Batching` 세부 설명

Project Setting > Player 에서 사용이 체크가 되어있는지 확인.
![체크 확인](/images/studying5_1.png)

1. `Static Batching`: Static 플래그가 체크되어있는 정적인 오브젝트에 적용 됨.
- 적용 방법
![적용 방법](/images/studying5_0.png)
- 버텍스 연산을 런타임에 수행하지 않기때문에 Dynamic Batching 보다 효율적.
- 같은 머티리얼을 사용하는 메쉬들을 렌더링할 때 드로우콜을 줄일 수 있다.(동일한 머티리얼 `인스턴스`여야 함)
- 배경 같은 요소(트랜스폼 등이 바뀌지 않는 오브젝트)에 적용해주기에 적합함. 

<br>

⚠️주의⚠️

<br>

메모리가 추가로 필요함.
<br>

해당되는 오브젝트들은 처음부터 Scene에 존재해야 함.
<br>

동일한 머터리얼을 사용할 지라도 스크립트에서 `Renderer.material.color = Color.red;`처럼 머터리얼의 속성을 변경한다면 **복사본이 생성**되기 때문에 적용되지않는다(`Renderer.sharedMaterial`사용으로 해결가능).

2. `Dynamic Batching`: Static 플래그가 체크되어있지않은 모든 오브젝트에 적용 됨.
- 매 프레임, 오브젝트들의 버텍스 정보를 합쳐 버텍스 버퍼와 인덱스 버퍼에 담아 GPU가 렌더링 함.
- 따라서 매 프레임마다 오버헤드가 발생.
- 그러나 드로우콜을 줄임으로 전체적인 성능 향상.

<br>

⚠️주의⚠️

<br>

`Skinned Mesh`에는 적용이 되지않음.

<br>

버텍스가 너무 많은 메쉬에는 적용이 되지않음.

<br>

## 2D 환경에서는 드로우콜을 어떻게 줄이나요? 🧐
-  Sprite Mode: Multiple 사용.
- Sprite Atlas 이용.

<br>

참고자료: 유니티 그래픽스 최적화 스타트업