---
title: "Extenstion Method: 확장 메서드"
date: 2021-11-18T01:32:38+09:00
tags: ["csharp","unity","Extenstion Method"]
categories: ["csharp","unity"]
---
유니티에서 여러가지 연습을 하려고 생각하고 있었을 때, 나만의 tween을 만들어 보고싶다고 생각했다.
DoTween을 사용할 때 여러 함수들이 transform, image 등에서 부터 바로 DoTween 함수를 사용할 수 있었던 것이 기억에 남았다.

![예시](/images/studying2_0.png)

나도 이런식으로 바로바로 접근할 수 있으면 좋겠다고 생각을 해서 방법을 찾아보니, {{< color   color="#FFD400" text="Extenstion Method" >}}를 이용하면 되는 것!

## {{< color color="#FFD400" text="Extenstion Method" >}}가 뭐야? 🧐

- 특수한 종류의 `static` 메서드.
- 다른 클래스의 `인스턴스 메서드`인 것 처럼 사용되는 기능.
- 클래스, 구조체, 인터페이스 등에 적용 가능.  


<br>

## 왜 사용하는거야? 🧐

- 인스턴스 메서드를 추가하려면 해당 클래스 안에 메서드를 추가해야한다.
- 하지만 접근이 불가한 클래스라면 ???
- {{< color color="#FFD400" text="Extenstion Method" >}}를 사용하자!  


<br>

## 어떻게 사용해야해? 🧐

- static class
- static method
- public
- {{< color color="#FFD400" text="Extenstion Method" >}}는 첫번째 파라미터로 반드시 클래스명을 지정해야 함.<br> `public static void Function(this T parm)` 
- 이 파라미터 앞에 반드시 `this` 키워드를 추가할 것!
- 만약 {{< color color="#FFD400" text="Extenstion Method" >}} 사용 후 또 다른 확장 메소드를 쓰고 싶을 시 this로 들어왔던 첫 파라미터를 반환 해주면 된다.

🍑 예시: tween 만들기 프로젝트에 일부를 이용했다..ㅎㅎ
```csharp
using System.Collections;
using UnityEngine;

namespace MyTween
{
    public static class Tween
    {
        public static Transform Move(this Transform tr, Vector3 to, float duration, AnimationCurve ease)
        {
            return tr;
        }

        public static Transform Scale(this Transform tr, Vector3 to, float duration, AnimationCurve ease)
        {
            return tr;
        }
    }
}
```
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
using MyTween;

public class ButtonDirecting : MonoBehaviour, IPointerDownHandler, IPointerUpHandler
{
    public AnimationCurve ease;
    public Vector2 toSize = Vector2.one;
    public float duration;
    private bool isTweening = false;
    private event Action onClick;

    private Vector2 fromSize;

    public void OnClick()
    {
        transform.Move(Vector3.one, 1f, ease).Scale(Vector3.one, 1f);
    }
}
```

 
