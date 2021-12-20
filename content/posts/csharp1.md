---
title: "c#_string_StringBuilder"
date: 2021-11-12T04:21:22+09:00
tags: ["csharp", "string", "StringBuilder"]
---
# C# 공부 <span style=color:#7986CB>string/StringBuilder</span> 🤔

## ✨{{< color color="#FFA726" text="string" >}}

- Immutable(불변) 변수. 
- 값이 아닌 참조 변수.
- 내부적으로 문자열을 관리하는 버퍼를 가지고 있지않다. 대신 이를 참조하고 있다.
- string마다 새로운 클래스가 생성이 된다.

```csharp
string a = "안녕" + "하세요";
//"안녕" "하세요" -> 각각의 string class 생성. 
//a string class 생성.
//총 3개의 string class가 생성된다. -> 즉 garbage가 많이 생긴다.
```  
<br>

## ✨{{< color color="#FFA726" text="StringBuilder" >}}

- 내부적으로 버퍼를 가지고 있다.
- 조합이 가능하다. 즉, 조합할 때마다 새롭게 class를 생성하지않는다.
- 조합한 것을 string으로 반환이 가능하다.
- 길이가 충분히 길고 길이를 모를 때 사용하는 것이 바람직하다.
```csharp
StringBuilder sb1 = new StringBuilder("Hello");
//생성할 당시에 바로 넣기가 가능하다.
StringBuilder sb2 = new StringBuilder(100);
//버퍼공간을 미리 할당하는 것이 가능하다.
//미리 할당을 해놓으면 크기가 넘어가는 데이터가 들어오기 전까지는 Append를 사용할 시 추가 공간을 마련하지않아도 되어 조금 더 빠르다.

```  
<br>

# 🌟🌟 StringBuilder가 편리함에도 string이 필요한 이유

- 값의 변형없이 사용되는 string 에 대한 참조만이 필요할 경우.

```csharp
string a = "immutable";

//s1, s2, s3는 내부적으로 버퍼를 가지고 있지않기 때문에 a와 같은 버퍼를 참조한다.
//만약, string이 StringBuilder처럼 작동을 한다면...
//s1, s2, s3는 내부적으로 버퍼를 가지고 있어야하고 이는 a의 내부 버퍼를 복사한 값을 가지고 있을 것이다. => 메모리 낭비!
string s1 = a;
string s2 = b;
string s3 = c;
```  
- 멀티스레드 환경에서 string이 StringBuilder보다 안전하다.<br>


```csharp
string s = "a" + "b" + "c";
//string을 조합할 때는 연산의 최소 단위인 원자적 연산을 하기 때문에 스레드가 연산 중간에 간섭할 수 없어 값이 변할 위험이 없다.

StringBuilder sb = new StringBuilder();
sb.Append("a");
sb.Append("b");
sb.Append("c");
//StringBuilder로 조합할 경우에는 원자적 연산이 아니기 때문에 멀티스레드 환경에서 값이 변형될 위험이 있다.
``` 