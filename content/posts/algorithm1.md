---
title: "AlgorithmStudy_백준 11720"
date: 2021-11-11T04:21:22+09:00
tags: ["csharp", "알고리즘", " 백준"]
categories: ["algorithm"]
---

# 알고리즘 공부 {{< color color="#FFD400" text="백준 11720" >}} 🧐
#### 숫자의 합
<br>

## 👉문제
N개의 숫자가 공백 없이 쓰여있다. 이 숫자를 모두 합해서 출력하는 프로그램을 작성하시오.  
<br>
## 👉입력
첫째 줄에 숫자의 개수 N (1 ≤ N ≤ 100)이 주어진다. 둘째 줄에 숫자 N개가 공백없이 주어진다.  
<br>
## 👉입력
입력으로 주어진 숫자 N개의 합을 출력한다.  
<br>

🍑풀이

```csharp
using System;					
public class Program
{
	public static void Main()
	{		
		int count = int.Parse(Console.ReadLine()); //입력받아 int로 전환 
		string nums = Console.ReadLine(); //공백없이 숫자 입력
		
        int result = 0;
			
		foreach(var item in nums)//item : char
		{
            //변환된 값을 더하기.
			result += int.Parse(item.ToString());//char->string->int 
		}
		
		Console.WriteLine(result);	
	}	
}
```  

[문제풀러가기](https://www.acmicpc.net/problem/11720)