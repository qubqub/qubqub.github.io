---
title: "AlgorithmStudy_백준 11727"
date: 2021-12-16T23:08:56+09:00
tags: ["csharp", "알고리즘", " 백준", "빠른제곱알고리즘"]
categories: ["algorithm"]
author: [""]
ShowReadingTime: true
ShowBreadCrumbs: false
ShowPostNavLinks: true
ShowCodeCopyButtons: true
ShowCreativeCommons: true
showToc: true
TocOpen: true
comments: true
disableShare: false
searchHidden: false
cover:
  hidden: true
  image: ""
  alt: ""

draft: false
---

dp문제에 너무 약한 나... 문제를 작게 쪼개서 푸는 방법을 잘 생각해봐야겠다..

# 알고리즘 공부 {{< color color="#FFD400" text="백준 11727" >}} 🧐
#### 제로

## 👉문제
2×n 직사각형을 1×2, 2×1과 2×2 타일로 채우는 방법의 수를 구하는 프로그램을 작성하시오.

아래 그림은 2×17 직사각형을 채운 한가지 예이다.

![그림](/images/algorithm21.png)

<br>

## 👉입력  
첫째 줄에 n이 주어진다. (1 ≤ n ≤ 1,000)


<br>

## 👉출력
첫째 줄에 2×n 크기의 직사각형을 채우는 방법의 수를 10,007로 나눈 나머지를 출력한다.  

<br>

🍑풀이
```csharp
using System;

namespace Algorithm21
{
    class Beakjoon11727
    {
        private static long mod = 10007;

        static void Main(string[] args)
        {
            var n = int.Parse(Console.ReadLine()!);

            long[] arr = new long[n + 1];

            arr[1] = 1; //1*2 블록 하나
            if (n > 1)
            {
                arr[2] = 3; //2*2 블록 하나 or 2*1블록 둘 or 1*2블록 둘
            }

            //방법1
            // 한 칸이 비워져 있다고 했을 때 그 한 칸을 채우는 방법은 하나이다. 
            // 두 칸이 비워져 있다고 했을 때 그 두 칸을 채우는 방법은 세가지 이지만,
            // 1*2블록 둘의 경우는 한 칸이 비워져 있을 경우랑 같은 경우로 생각할 수 있다.
            // 따라서, 2*2 블록 하나 or 2*1블록 둘 -> 두가지의 방법이 있다.
            // 3부터 arr[n] = arr[n - 1] + 2 * arr[n - 2]
            
            for (int i = 3; i <= n; i++)
            {
                arr[i] = (arr[i - 1] + 2 * arr[i - 2]) % mod;
            }

            Console.WriteLine(arr[n]);

            //방법2
            //공식 도출: [n번째의 값] = 2^(n-1) + [n-2번째의 값]
            long GetAn(int index)
            {
                if (arr[index] != 0)
                {
                    return arr[index];
                }

                arr[index] = (MyPownMod(2, index - 1) + GetAn(index - 2)) % mod;
                return arr[index];
            }

            Console.WriteLine(GetAn(n));
        }

        //빠른 거듭제곱 알고리즘.. + MOD 
        static long MyPownMod(long _base, long _exp)
        {
            long let = 1;
            while (_exp > 1)
            {
                var temp = _exp & 1; //홀수냐 짝수냐
                if (temp == 1) //홀수
                {
                    let = (_base * let) % mod; 
                    //mod를 계속 해주는 이유
                    //값이 넘어가 overflow가 될 수 있기 때문... 
                }

                _base = _base * _base % mod;
                _exp >>= 1;
            }

            return (_base * let) % mod;
        }
    }
}

```
<br>

## 🍏공식도출 방법을 사용했을 때 겪었던 문제점

- n의 범위가 1~1000까지 였기 때문에 거듭제곱을 사용할 때 오버플로우가 일어났다. 그 결과 이상한 값이 나왔다.
- 빠른거듭제곱 알고리즘을 사용한 이유: 거듭제곱을 할 때마다 `오버플로우가 되지않게 mod처리!`

[문제풀러가기](https://www.acmicpc.net/problem/11727)
