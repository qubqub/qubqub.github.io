---
title: "AlgorithmStudy_백준 1712"
date: 2021-11-11
tags: ["csharp", "알고리즘", " 백준"]
categories: ["algorithm"]
---
# 알고리즘 공부 {{< color color="#FFD400" text="백준 1712" >}} 🧐
#### 숫자의 합    
<br>

## 👉문제
월드전자는 노트북을 제조하고 판매하는 회사이다. 노트북 판매 대수에 상관없이 매년 임대료, 재산세, 보험료, 급여 등 A만원의 고정 비용이 들며, 한 대의 노트북을 생산하는 데에는 재료비와 인건비 등 총 B만원의 가변 비용이 든다고 한다.

예를 들어 A=1,000, B=70이라고 하자. 이 경우 노트북을 한 대 생산하는 데는 총 1,070만원이 들며, 열 대 생산하는 데는 총 1,700만원이 든다.

노트북 가격이 C만원으로 책정되었다고 한다. 일반적으로 생산 대수를 늘려 가다 보면 어느 순간 총 수입(판매비용)이 총 비용(=고정비용+가변비용)보다 많아지게 된다. 최초로 총 수입이 총 비용보다 많아져 이익이 발생하는 지점을 손익분기점(BREAK-EVEN POINT)이라고 한다.

A, B, C가 주어졌을 때, 손익분기점을 구하는 프로그램을 작성하시오.  

<br>

## 👉입력  
첫째 줄에 A, B, C가 빈 칸을 사이에 두고 순서대로 주어진다. A, B, C는 21억 이하의 자연수이다.   

<br>

## 👉출력
첫 번째 줄에 손익분기점 즉 최초로 이익이 발생하는 판매량을 출력한다. 손익분기점이 존재하지 않으면 -1을 출력한다.  

<br>

🍑풀이 1

```csharp
using System;
					
public class Program
{
	public static void Main()
	{				
		string input = Console.ReadLine();
		
		var list = input.Split(' ');
		
		int fix = int.Parse(list[0]);
		int variable = int.Parse(list[1]);
		int price = int.Parse(list[2]);
			
		if(variable >= price)//가변지출이 제품 가격과 같거나 크면 손익이 날 수 없다.
		{
			Console.WriteLine(-1);//-1 출력
			return;
		}
		
		int count = 1;
		int cost = 0;
		
		while(true) //카운트를 1씩 올리면서 손익분기점을 찾는다
		{
			cost = fix + variable * count; //총 비용 = 고정지출 + 가변지출 * 제품 갯수
			if(price * count - cost > 0 )//순 이익 = 제품 가격 * 제품 갯수 - 총 비용
			{
				break;
			}
			
			count++;
		}

		Console.WriteLine(count);
	}
	
}
```  


🍑풀이 2

```csharp
using System;
					
public class Program
{
	public static void Main()
	{				
		string input = Console.ReadLine();
		
		var list = input.Split(' ');
		
		int fix = int.Parse(list[0]);
		int variable = int.Parse(list[1]);
		int price = int.Parse(list[2]);
		
		if(variable >= price)
		{
			Console.WriteLine(-1);
			return;
		}
		
		int count = 1;
        // 0이 되는 지점 => fix + variable * count = price * count
        // fix = (price - variable) * count
		count = fix/(price - variable) + 1;
		
		Console.WriteLine(count);
	}
	
}
```  
 [문제풀러가기](https://www.acmicpc.net/problem/1712)

