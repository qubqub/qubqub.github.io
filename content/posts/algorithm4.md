---
title: "AlgorithmStudy_백준 1439"
date: 2021-11-11
tags: ["csharp", "알고리즘", " 백준"]
categories: ["algorithm"]
---
# 알고리즘 공부 {{< color color="#FFD400" text="백준 1439" >}} 🧐
#### 숫자의 합    


## 👉문제
다솜이는 0과 1로만 이루어진 문자열 S를 가지고 있다. 다솜이는 이 문자열 S에 있는 모든 숫자를 전부 같게 만들려고 한다. 다솜이가 할 수 있는 행동은 S에서 연속된 하나 이상의 숫자를 잡고 모두 뒤집는 것이다. 뒤집는 것은 1을 0으로, 0을 1로 바꾸는 것을 의미한다.

예를 들어 S=0001100 일 때,

1. 전체를 뒤집으면 1110011이 된다.
2. 4번째 문자부터 5번째 문자까지 뒤집으면 1111111이 되어서 2번 만에 모두 같은 숫자로 만들 수 있다.
하지만, 처음부터 4번째 문자부터 5번째 문자까지 문자를 뒤집으면 한 번에 0000000이 되어서 1번 만에 모두 같은 숫자로 만들 수 있다.

문자열 S가 주어졌을 때, 다솜이가 해야하는 행동의 최소 횟수를 출력하시오.


## 👉입력  
첫째 줄에 문자열 S가 주어진다. S의 길이는 100만보다 작다.


## 👉출력
첫째 줄에 다솜이가 해야하는 행동의 최소 횟수를 출력한다.  


🍑풀이

```csharp
using System;
public class Program
{
	public static void Main()
	{				
		var list = Console.ReadLine();
		
		int count_zero = 0;//0이 쓰여진 카드 그룹의 갯수 (1 이 나오기 전까지의 카드 그룹) 
		int count_one = 0;//1 이 쓰여진 카드 그룹의 갯수 (0 이 나오기 전까지의 카드 그룹) 
		
		for(int i = 0; i < list.Length - 1; ++i)
		{
			if(list[i] != list[i + 1]) //다음 카드와 비교했을 때 서로 다른 카드일 경우
			{	
				if(list[i] == '0')
				{
					if(count_zero == 0 && count_one == 0)//맨 처음 분기점 일 경우
					{
						count_one++;//그룹이 하나 생성
					}
					count_zero++;//그룹 생성
				}
				else if(list[i] == '1')
				{
					if(count_zero == 0 && count_one == 0)
					{
						count_zero++;
					}
					count_one++;
				}
			}
		}
				
		var result = Math.Min(count_zero, count_one); //더 작은 값을 출력
					
		Console.WriteLine(result);	
	}	
}
```

[문제풀러가기](https://www.acmicpc.net/problem/1439)

이..친구는.. 네번이나 틀렸다눈... ㅠㅠ
