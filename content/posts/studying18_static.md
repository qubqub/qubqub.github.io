---
title: "static: 정적"
date: 2021-12-17T23:54:11+09:00
tags: ["csharp", "static"]
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

static... 여러곳에 사용을 해봤던 keyword 이지만, 정작 확실하게 아는걸까?

<br>

그래서 공부를 해보았다!


## {{< color color="#FFD400" text="static" >}}이 뭐야? 🧐

- keyword 중 하나로 클래스, 필드, 속성, 메소드 등의 앞에 붙을 수 있다.
> - 특정 개체가 아닌 형식에 속하는 정적 멤버를 선언 할 수 있습니다.

## {{< color color="#FFD400" text="static class" >}}에 대해 알아보자! 🧐

- class 앞에 static keyword를 사용하여 정의한다.
- 정적 클래스는 모든 클래스 멤버가 static으로 구성되어있다.
- non-static 클래스와 다르게 인스턴스가 불가능하다.(new 사용 불가!)
- 이름 자체로 클래스 멤버에 접근 가능하다.
- public 생성자를 가질 수 없다. 

## {{< color color="#FFD400" text="static field" >}}에 대해 알아보자! 🧐

- field 앞에 static keyword를 사용하여 정의한다.
- non-static 클래스도 멤버로 가질 수 있다.
- 클래스 인스턴스 개수에 관계없이 하나만 존재한다.
- 프로그램 실행 후 해당 클래스가 처음으로 호출 될 때 한 번 초기화.
- 초기화 후 계속 동일한 메모리 사용.
💚 예시
```csharp
class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Hello World!");
        var staticField1 = new StaticField(2);

        //static field는 클래스이름 자체로 접근
        //non-static field는 클래스를 인스턴스한 변수 명으로 접근
        Console.WriteLine($"field1:{StaticField.field1}, field2:{staticField1.field2}");
    }
}
class StaticField
{
    public static int field1;
    public int field2;

    public StaticField(int num)
    {
        field2 = num;
    }
    //정적 생성자는 매개변수를 넣을 수 없음(사용자가 부르는 것이 아님!)
    static StaticField()
    {
      //정적 필드를 초기화
        field1 = 1;
    }
}
```
💛 정적 필드의 일반적인 사용 목적

1. 인스턴스화된 개체 개수를 유지 -> 한 개만 만든다는 소리인거 같아
2. 모든 인스턴스 간에 공유해야하는 값을 저장!(값을 공유)

## {{< color color="#FFD400" text="static method" >}}에 대해 알아보자! 🧐

- field 앞에 static keyword를 사용하여 정의한다.
- non-static 필드에 접근 할 수 없음.
- 메서드 매개 변수에 명시적으로 전달되지 않은 경우 개체의 인스턴스 변수에 액세스할 수 없습니다. <- 이게 뭔소린가 했더니!
💚 예시
```csharp
class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Hello World!");
        
        int value;
        //value에 빨간 밑줄이 쳐집니다.
        //명시적이라는 말은 값을 딱 정해줘야 된다는 뜻인듯?
        StaticField.StaticMethod(value);
        //요러케 값을 명시 해줘야 오류가 뜨지 않는다!
        int value = 1;
        StaticField.StaticMethod(value);
    }
}
class StaticField
{
    public static int field1;

    public static void StaticMethod(int value)
    {
         field1 = value;
    }
}
```
- 오버로드는 가능하지만 오버라이딩은 불가능하다. 
💛 오버로드: 같은 메소드 이름을 사용하는 것(매개 변수는 달라야 함)  오버라이딩: 함수자체를 재정의 하는것 (부모-자식 관계)

<br>

=> 이유: 단 하나만 존재하기 때문에! 상속을 통해 재정의가 가능하다면 단 하나가 아니지 않을까..?

<br>


참고 !("https://docs.microsoft.com/ko-kr/dotnet/csharp/language-reference/keywords/static")