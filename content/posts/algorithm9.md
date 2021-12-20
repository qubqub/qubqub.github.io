---
title: "AlgorithmStudy_백준 9461"
date: 2021-11-15T00:26:56+09:00
tags: ["csharp", "알고리즘", " 백준"]
categories: ["algorithm"]
---
# 알고리즘 공부 {{< color color="#FFD400" text="백준 9461" >}} 🧐
#### 파도반 수열


## 👉문제
아래의 그림과 같이 삼각형이 나선 모양으로 놓여져 있다. 첫 삼각형은 정삼각형으로 변의 길이는 1이다. 그 다음에는 다음과 같은 과정으로 정삼각형을 계속 추가한다. 나선에서 가장 긴 변의 길이를 k라 했을 때, 그 변에 길이가 k인 정삼각형을 추가한다.

파도반 수열 P(N)은 나선에 있는 정삼각형의 변의 길이이다. P(1)부터 P(10)까지 첫 10개 숫자는 1, 1, 1, 2, 2, 3, 4, 5, 7, 9이다.

N이 주어졌을 때, P(N)을 구하는 프로그램을 작성하시오.

{{< image src="/images/Baekjoon9461.png" >}}


<br>

## 👉입력  
첫째 줄에 테스트 케이스의 개수 T가 주어진다. 각 테스트 케이스는 한 줄로 이루어져 있고, N이 주어진다. (1 ≤ N ≤ 100)


<br>

## 👉출력
각 테스트 케이스마다 P(N)을 출력한다.  

<br>

🍑풀이
```csharp
using System;
using System.Linq;

namespace Algorithm9
{
    class Baekjoon9461
    {
        static void Main(string[] args)
        {
            var t = int.Parse(Console.ReadLine()!);
            var n = new int[t];//n 수열에서 뽑아 출력해야하는 n번째 수들의 배열
            for (int i = 0; i < t; i++)
            {
                n[i] = int.Parse(Console.ReadLine()!);
            }
            
            var list = n.ToList();
            list.Sort();
            
            var max = list[t - 1];//입력 중 가장 큰 숫자

            var padovan = new long[max];

            padovan[0] = 1;
            padovan[1] = 1;
            padovan[2] = 1;

            while (padovan[^1] == 0)
            {
                for (int i = 3; i < max; i++)//입력된 가장 큰 수 번째까지 수열을 구한다.
                {
                    if (padovan[i] != 0)
                    {
                        continue;
                    }
                    padovan[i] = padovan[i - 3] + padovan[i - 2];
                    //(규칙) => i번째는 i-3번째 + i-2번째 
                }
            }

            var result = new long[t];//결과값을 담을 배열

            for (int i = 0; i < t; i++)
            {
                result[i] = padovan[n[i] - 1];//결과값의 배열에 n값의 순서대로 수열의 값을 대입
            }
            
            Console.WriteLine(String.Join("\n", result));

        }
    }
}
```

<br>

[문제풀러가기](https://www.acmicpc.net/problem/9461)