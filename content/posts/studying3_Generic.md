---
title: "Generic: 제너릭 클래스"
date: 2021-11-23T23:32:06+09:00
tags: ["csharp","unity","Generic"]
categories: ["csharp","unity"]
cover:
  hidden: true
  image: "/log/logo-csharp.png"
  alt: "c#"
---
유니티에서 쓸 Tween을 만들고 있는 중이다.<br>
Tween에서 여러가지 클래스를 처리하고 싶어서 Generic class를 활용하기로 하였다.

## {{< color color="#FFD400" text="Generic class" >}}가 뭐야? 🧐

>일반적으로 클래스를 정의할 때, 클래스 내의 모든 데이타 타입을 지정해 주게 된다. 하지만 어떤 경우는 클래스의 거의 모든 부분이 동일한데 일부 데이타 타입만이 다른 경우가 있을 수 있다.<br>
이런 경우 C#의 제네릭 타입(Generic Type)을 사용할 수 있는데, 제네릭 타입에서는 int, float, double 같은 데이타 요소 타입을 확정하지 않고 이 데이타 타입 자체를 타입파라미터(Type Parameter)로 받아들이도록 클래스를 정의한다. 

(c++ 의 템플릿과 비슷!)



<br>

## 왜 사용하는거야? 🧐

- 기능이 같은 클래스를 타입만 바꾸어 새롭게 구현할 필요없이 Generic class로 구현하면 여러 타입으로 하나의 클래스를 활용할 수 있다.  
- 대표적 예시로 `List<T>`가 있다. 


<br>

## 어떻게 사용해야해? 🧐
- `public class [ClassName]<T>` 로 선언.
- 여러개의 타입을 사용하고 싶을 때는 `<T1, T2 ...>` 이런 식으로 나열하면 된다.
- 제네릭 타입에 제약을 두고 싶을 경우 `where T : [제약조건]`과 같이 마지막에 조건을 붙인다.<br>

 ⚠️주의⚠️ <br>만약 제네릭 클래스가 `MonoBehaviour`를 상속하고 있을 때, GameObject에 `AddComponent`를 바로 할 경우 `null`이 된다. **각 제네릭 타입마다 class를 새로 생성 후 가능하다.**

 ⛔ 옳지않은 예시
```csharp
using System;
using UnityEngine;

namespace MyTween
{
    public class Tween<T1, T2>: MonoBehaviour
    {
        private T1 target;
        private T2 v_end;
    }

    public static class TweenManager 
    {
        public static Tween<Transform, Vector3> Move(this Transform tr, Vector3 to, float duration)
        {
            Tween<Transform, Vector3> tween = tr.gameObject.AddComponent<Tween<Transform, Vector3>>();//null 반환!!
            return tween;
        }
    }
}
```
💚 옳은 예시
```csharp
using System;
using UnityEngine;

namespace MyTween
{
    public class TweenVector3 : Tween<Transform, Vector3>
    { }

   
    public static class TweenManager 
    {
        public static Tween<Transform, Vector3> Move(this Transform tr, Vector3 to, float duration)
        {
            TweenVector3 tween = tr.gameObject.AddComponent<TweenVector3>();//성공적인 반환!!
            return tween;
        }
    }
}

```