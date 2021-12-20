---
title: "const와 readonly"
date: 2021-12-18T16:40:54+09:00
tags: ["csharp", "const", "readonly"]
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
## {{< color color="#FFD400" text="상수" >}}가 뭐야? 🧐
> 상수(常數, constant)란 수식에서 변하지 않는 값을 뜻한다. 이것은 변하는 값 변수와 반대이다.

## {{< color color="#FFD400" text="종류" >}}는 뭐가 있을까? 🧐
1. const 
2. readonly

- 값 형식: 데이터자체임으로 필드 변경이 불가능 하다.
- 참조 형식: 데이터에 대한 참조이기 때문에 참조 개체 자체는 변경이 불가능 하지만 개체가 만약 클래스 인스턴스라면 멤버 변수를 바꾸는 것은 가능하다.

💚 예시
```csharp
class Program
  {
      private readonly static Test test = new Test();
      static void Main(string[] args)
      {
          //개체 참조를 바꾸는 것은 불가능
          test = test1;//오류!!!
          //개체 내 필드를 바꾸는 것은 가능!
          test.value1 = 3;
      }
  }
  class Test
  {
      public int value1 = 1;
  }
```

## {{< color color="#FFD400" text="차이점" >}}에 대해 알아보자! 🧐
> readonly 키워드는 const 키워드와 다릅니다. const 필드는 필드 선언에서만 초기화될 수 있습니다. readonly 필드는 선언이나 생성자에서 초기화될 수 있습니다. 따라서 `readonly 필드는 사용된 생성자에 따라 다른 값을 가질 수 있습니다.` 또한 `const 필드가 컴파일 시간 상수`라고 하더라도 `readonly 필드는 다음 줄에서와 같이 런타임 상수에 사용`될 수 있습니다. 

💛 컴파일 타임 상수: 컴파일할 때 정해지는 상수. -> 선언때만 초기화가 가능!!!

<br>

💛 런타임 상수: 런타임에 정해지는 상수. -> 그래서 생성자에서 값을 초기화가 가능!!!!!

💚 예시
```csharp
class Program
{
    static void Main(string[] args)
    {
        TestClass test = new TestClass(20);
        //const: 클래스에 멤버변수 중 canst변수가 있다면 static변수 처럼 작동함!(단 하나!)
        //readonly: 클래스 인스턴스 마다 각자 다른 값을 가질 수 있음.
        Console.WriteLine($"ValueA: {TestClass.ValueA}, ValueB: {test.ValueB}");
    }
}
class TestClass
{
    //const는 선언 때 값을 초기화해주어야 함.
    public const int ValueA = 10;
    //readonly는 선언때 초기화를 안해줘도 됨.
    public readonly int ValueB;
    //readonly는 생성자에서 초기화가 가능.
    //const는 생성자에서도 불가능 하다.
    public TestClass(int value)
    {
        ValueB = value;
    }
    public void Method(int value)
    {
        //둘 다 초기화후에는 값 변경이 불가능 하다!
        ValueB = value; //빨간밑줄
        ValueA = value;//빨간밑줄
        //const는 메소드 안에서 선언 가능
        const int valueC = 1;
        //readonly는 불가능 하다.

        readonly int valueD //빨간밑줄
    }
}
```