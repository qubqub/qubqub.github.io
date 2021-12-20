---
title: "AlgorithmStudy_백준 1929"
date: 2021-11-12T23:39:46+09:00
tags: ["csharp", "알고리즘", " 백준"]
categories: ["algorithm"]
---
# 알고리즘 공부 {{< color color="#FFD400" text="백준 1929" >}} 🧐
#### 소수 구하기


## 👉문제
M이상 N이하의 소수를 모두 출력하는 프로그램을 작성하시오.


## 👉입력  
첫째 줄에 자연수 M과 N이 빈 칸을 사이에 두고 주어진다. (1 ≤ M ≤ N ≤ 1,000,000) M이상 N이하의 소수가 하나 이상 있는 입력만 주어진다.


## 👉출력
한 줄에 하나씩, 증가하는 순서대로 소수를 출력한다.  


🍑풀이 

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Algorithm7
{
    class Beakjun1929
    {
        static void Main(string[] args)
        {
            var list = Console.ReadLine()!.Split(' ').Select(int.Parse).ToArray();
            int m = list[0];
            int n = list[1];

            List<int> result = new List<int>();
            //소수의 정의 : 1과 자기자신으로 밖에 나눌 없는 것..
            
            for (int i = m; i <= n; i++)
            {
                if (i == 1)
                {
                    continue;
                }
                if (i is > 1 and < 4)//2, 3은 소수
                {
                    result.Add(i);
                    continue;
                }
                if (i % 2 == 0)//2의 배수는 모두 합성수
                {
                    continue;
                }
                bool primeNum = true;  
                for (int k = 1; (k * 2 + 1) <= Math.Sqrt(i); k++)//소수는 다 홀수이다. => 2k + 1
                {                                                //합성수라면 수의 제곱근보다 작거나 같은 수가 존재한다.
                    if (i % (k * 2 + 1) == 0)
                    {
                        primeNum = false;//소수가 아니다!
                        break;
                    }
                }
                if (primeNum == true)
                {
                    result.Add(i);
                }
              
            }
            StringBuilder sb = new StringBuilder(String.Join("\n", result.ToArray()));
  
            Console.WriteLine(sb);
        }
    }
}
```


[문제풀러가기](https://www.acmicpc.net/problem/1929)