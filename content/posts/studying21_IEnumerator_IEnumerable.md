---
title: "IEnumerable과 IEnumerator 그리고 foreach"
date: 2021-12-19T14:29:54+09:00
tags: ["csharp", "ienumerable", "ienumerator", "foreach"]
categories: ["csharp"]
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
  image: ""
  alt: ""

draft: false
---

## ✏️ 포스팅 목적
IEmerable, IEnumerator 항상 사용하는 List, Array 같은 Collection 들은 이 인터페이스들을 가지고 있는데, 어떤 것들인지 잘 알지 못하는 것 같아 공부를 해보려 한다!

<br>

## {{< color color="#FFD400" text="IEnumerable" >}}가 뭐야? 🧐

- 열거가능한(enumerable) 오브젝트를 위한 IEnumerator를 반환한다.
- 열거자(enumerator)는 컬렉션의 모든 컨텐츠에 접근하는 간단한 방법을 제공한다.

 🍑 IEnumerable
```csharp
public interface IEnumerable
{ 
    IEnumerator GetEnumerator();
}
```

<br>

## {{< color color="#FFD400" text="IEnumerator" >}}가 뭐야? 🧐
- iterator
> 객체 지향적 프로그래밍에서 배열이나 그와 유사한 자료 구조의 내부의 요소를 순회(traversing)하는 객체이다.

### 💚 MoveNext()
- 열거자를 열거의 다음 요소로 이동한다. 
- 요소가 유효함을 나타내는 bool값을 반환한다.
- 생성시 열거자는 개념적으로 열거의 첫 요소 앞에 위치하며, MoveNext의 첫번째 호출은 열거의 첫 요소를 가져온다.
### 💚 Current
- 열거의 현재 요소를 반환한다.
- 반환되는 값은 MoveNext의 첫 호출 이전에 정의 되지 않는다.

🍑 IEnumerator
```csharp
 public interface IEnumerator
    {
        bool MoveNext();

//Current가 null이 되어도 경고를 띄우지 않겠다!
#nullable disable 
        object Current
#nullable restore
        {
            get;
        }
        //처음 부터 다시 시작할 수 있도록 열거자를 열거의 시작으로 재설정한다.
        //MoveNext를 한 번도 호출하지 않은 때 처럼 첫 요소의 앞부분으로 변경.
        //그냥 말 그대로 리셋한다고 생각하면 됨!
        void Reset();
    }
```

## {{< color color="#FFD400" text="foreach" >}}랑 무슨 관련이 있을까? 🧐
- foreach는 IEnumerable을 가지고 있어야 사용이 가능하다.

### 🍑 테스트 코드!
```csharp
static void Main(string[] args)
{
    List<int> list = new() { 5, 8, 2, 1, 3 };
    using var enumerator = list.GetEnumerator();
    
    //MoveNext가 true인 동안 => 다음 요소가 있는 동안!
    while (enumerator.MoveNext())
    {
        Console.WriteLine(enumerator.Current);
    }
    //결과값: 5 8 2 1 3
    
    //위의 작업을 간소화 해준 것이 바로 foreach!
    foreach (var element in list)
    {
        Console.WriteLine(element);
    }
    //결과값: 5 8 2 1 3
}
```
### 🖌 내가 만든 이미지로 이해하는 foreach작동 방법
![이미지](/images/studying21.png)

### 그렇다면 반복문 {{< color color="#FFD400" text="for" >}}와 어떠한 차이가 있을까? 🧐

List, Array처럼 순서가 있는, `index로 접근이 가능한 컨테이너에서만 사용`이 가능하다. 하지만 foreach는 
순서가 있는 컨테이너도, Dictionary처럼 `순서가 없는 컨테이너도 사용`이 가능하다.

## ✏️ 마무리하며..

순서가 중요한 또는 특정 인덱스의 값에 접근해야하는 상황이라면 for를 순서가 없는 컨테이너면 foreach를 사용하면 되겠다!

<br>

테스트 코드 `using var enumerator = list.GetEnumerator();`에서 `using`이라는 키워드를 사용했는데, 이 키워드를 사용하지않았더니 노란 밑줄이 생기면서 IEnumerator가 `Dispose` 되지않는다고 친절히 말해줬다. using이 Dispose와 관련이 있다고 하는데 이것을 좀 더 공부해서 다음에 포스팅해보도록 하겠다!