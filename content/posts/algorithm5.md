---
title: "AlgorithmStudy_백준 1920"
date: 2021-11-12T04:21:22+09:00
tags: ["csharp", "알고리즘", " 백준"]
categories: ["algorithm"]
---

# 알고리즘 공부 {{< color color="#FFD400" text="백준 1920" >}} 🧐
#### 수 찾기


## 👉문제
N개의 정수 A[1], A[2], …, A[N]이 주어져 있을 때, 이 안에 X라는 정수가 존재하는지 알아내는 프로그램을 작성하시오.


## 👉입력  
첫째 줄에 자연수 N(1 ≤ N ≤ 100,000)이 주어진다. 다음 줄에는 N개의 정수 A[1], A[2], …, A[N]이 주어진다. 다음 줄에는 M(1 ≤ M ≤ 100,000)이 주어진다. 다음 줄에는 M개의 수들이 주어지는데, 이 수들이 A안에 존재하는지 알아내면 된다. 모든 정수의 범위는 -231 보다 크거나 같고 231보다 작다.



## 👉출력
M개의 줄에 답을 출력한다. 존재하면 1을, 존재하지 않으면 0을 출력한다.  



🍑풀이

```csharp
using System;
using System.Linq;
using System.Text;

namespace Algorithm1
{
    public static class Program
    {
        public static void Main()
        {
            var count_n = int.Parse(Console.ReadLine()!);
            var n = Console.ReadLine()!.Split(' ').Select(int.Parse).ToArray();
            var count_m = int.Parse(Console.ReadLine()!);
            var m = Console.ReadLine()!.Split(' ').Select(int.Parse).ToArray();

            var result = new int[m.Length];

            Array.Sort(n);

            for (int i = 0; i < count_m; i++)
            {
                if (m[i] < n[0] || m[i] > n[^1]) //값이 범위에서 벗어나면 0
                {
                    result[i] = 0;
                    continue;
                }
                
                int pivot = count_n / 2; //이진탐색을 활용!
                int left = 0;
                int right = count_n - 1;

                while (true)
                {
                    if (left > right)
                    {
                        result[i] = 0;
                        break;
                    }
                    else
                    {
                        if (m[i] == n[pivot]) // 피봇과 값이 같은 경우
                        {
                            result[i] = 1;
                            break;
                        }
                        else if (m[i] > n[pivot]) // 피봇의 값보다 큰 경우
                        {
                            left = pivot + 1;
                        }
                        else // 피봇의 값보다 작은 경우
                        {
                            right = pivot - 1;
                        }
                        pivot = (left + right) / 2;
                    }
                }
            }

            Console.WriteLine(string.Join("\n", result));
        }
    }
}
```


 시간초과로 애먹었음...

 
 출력 방식을 바꾸었더니 해결이 되었다..! (원래는 result를 돌면서 하나씩 출력했었다)

[문제풀러가기](https://www.acmicpc.net/problem/1920)

