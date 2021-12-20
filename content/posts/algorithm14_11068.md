---
title: "AlgorithmStudy_백준 11068"
date: 2021-11-26T00:18:15+09:00
tags: ["csharp", "알고리즘", " 백준"]
categories: ["algorithm"]
---

# 알고리즘 공부 {{< color color="#FFD400" text="백준 11068" >}} 🧐
#### 회문인 수

## 👉문제
어떤 수를 왼쪽부터 읽어도, 오른쪽부터 읽어도 같을 때 이 수를 회문인 수라고 한다. 예를 들어, 747은 회문인 수이다. 255도 회문인 수인데, 16진수로 표현하면 FF이기 때문이다. 양의 정수를 입력받았을 때, 이 수가 어떤 B진법 (2 ≤ B ≤ 64)으로 표현하면 회문이 되는 경우가 있는지 알려주는 프로그램을 작성하시오. B진법이란, 한 자리에서 수를 표현할 때 쓸 수 있는 수의 가짓수가 B라는 뜻이다. 예를 들어, 십진법에서 B는 10이다.   


<br>

## 👉입력  
입력 데이터는 표준입력을 사용한다. 입력은 T개의 테스트 데이터로 구성된다. 입력의 첫 번째 줄에는 테스트 데이터의 수를 나타내는 정수 T가 주어진다. 각 테스트 데이터는 64 이상 1,000,000 이하인 하나의 정수로 주어진다.


<br>

## 👉출력
출력은 표준출력을 사용한다. 하나의 테스트 데이터에 대한 답을 하나의 줄에 출력한다. 각 테스트 데이터에 대해, 주어진 수가 어떤 B진법 (2 ≤ B ≤ 64)으로 표현하여 회문이 될 수 있다면 1을, 그렇지 않다면 0을 출력한다.

<br>

🍑풀이
```csharp
using System;
using System.Collections.Generic;

namespace Algorithm14
{
    class Baekjoon11068
    {
        static void Main(string[] args)
        {
            var t = int.Parse(Console.ReadLine()!);
            var arr = new int[t];
            for (int i = 0; i < t; i++)
            {
                arr[i] = int.Parse(Console.ReadLine()!);
            }
            
            for (int i = 0; i < t; i++)
            {
                int result = 0;
                    for (int j = 2; j <= 64; j++)
                    {
                        var convert = ConvertJ(arr[i], j);
                        result = Check(convert);
                        if (result == 1)
                        {
                            break;
                        }
                    }
                
                Console.WriteLine(result);
            }

            int Check(List<int> list)//회문인지 체크
            {
                for (int i = 0; i < list.Count / 2; i++)
                {
                    if (list[i] != list[list.Count - i - 1])
                    {
                        return 0;
                    }
                }
                return 1;
            }

            List<int> ConvertJ(int value, int j)//진법 변환(사실 여기서 뒤집어주어야 알맞은 값이 나오지만 사실 이 문제에서는 상관이없기때문에 뒤집지않았다.)
            {
                List<int> list = new List<int>();
                
                while (value / j > 0)
                {
                    list.Add(value % j);
                    value /= j;
                }
                list.Add(value);

                return list;
            }
        }
    }
}

```

<br>

[문제풀러가기](https://www.acmicpc.net/problem/11068)