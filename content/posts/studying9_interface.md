---
title: "interface: 인터페이스"
date: 2021-12-01T20:57:53+09:00
tags: ["interface","csharp"]
categories: ["csharp"]
---

## {{< color color="#FFD400" text="interface(인터페이스)" >}}가 뭐야? 🧐

나는 인터페이스을 기능들의 묶음이라고 이해했다.

<br>

`Can Do`를 알려주는 역할을 한다.

## {{< color color="#FFD400" text="interface(인터페이스)" >}}는 어떤 상황에서 사용해야할까? 🧐

💚 예시
<br>
만약 {{< color color="#4EC9B0" text="조류" >}}라는 클래스가 있다고 하자.
이 클래스를 상속 받는 {{< color color="#4EC9B0" text="참새" >}}와 {{< color color="#4EC9B0" text="앵무새" >}} 파생 클래스가 있다. 
<br>

새는 날 수 있으니까 {{< color color="#FFA000" text="Fly()" >}}를 조류 클래스에 추가를 했다.
<br>

하지만 이후에 {{< color color="#4EC9B0" text="펭귄" >}}과 {{< color color="#4EC9B0" text="슈가글라이더" >}}를 만들어달라는 요청을 받았다. 하지만 생각해보니 펭귄은 날 수 없는데 슈가글라이더는 조류가 아닌데도 날 수 있지않은가?

<br>

이렇게 같은 부모 클래스를 가지고 있지않음에도 수행할 수 있는 기능은 같은 경우(슈가글라이더) 또는 같은 클래스를 상속을 받았지만 그 클래스의 기능이 필요하지 않는 경우가 있다(펭귄).

<br>

이런 경우에 사용해야 할 것이 {{< color color="#29B6F6" text="interface" >}}이다. 즉, 인터페이스는 어떠한 기능을 수행할 수 있는지 알려주는 역할을 하는 것이다. `Can Do`!


🍑 위의 설명을 코드로 만들어 보자!
```csharp
public interface IFly
{
    void Fly();
}

public abstract class Birds : Animal
{
    protected Birds(Beak beak)
    {
        this.beak = beak;
    }
    public Beak beak { get; private set; }
}

public class Sparrow : Birds, IFly
{
    public void Fly()
    {
        Console.WriteLine("포로록~ 참새 난다~");
    }
    public Sparrow(Beak beak) : base(beak)
    {
    }
}

public class Parrot : Birds, IFly
{
    public void Fly()
    {
       Console.WriteLine("푸드덕~ 앵무새 난다~");
    }
    public Parrot(Beak beak) : base(beak)
    {
    }
}

public class Penguin : Birds, ISwim
{
    public void Swim()
    {
        Console.WriteLine("슈슉~ 펭귄 수영한다~");
    }
    public Penguin(Beak beak) : base(beak)
    {
    }
}

public class SugarGlider : Mammalia, IFly
{
    public void Fly()
    {
        Console.WriteLine("슝~ 슈가 글라이더 난다~");
    }
}
```
<br>

## {{< color color="#FFD400" text="interface(인터페이스)" >}}의 특징은? 🧐
- 내부를 구체화 하지않은 메소드만으로 이루워져있다.
- `인스턴스가 불가능하다.`: 다른 일반 클래스처럼 new로 인스턴스화 할 수 없다. 반드시 상속을 통해 사용해야한다.
- `다중 상속이 가능하다!`
- 인터페이스를 상속한 클래스는 반드시 인터페이스 안의 모든 메소드를 구체화 해야한다.
- 접근 한정자가 항상 `public`이다.
- 내부 메소드 또한 public으로 구현이된다.

<br>

** 다음 포스팅은 `abstract class`에 대해서 공부해보도록 하겠당~

