---
title:  "AlgorithmStudy_백준 1541"
date: 2021-11-17T20:14:27+09:00
tags: ["csharp", "알고리즘", " 백준"]
categories: ["algorithm"]
---
# 알고리즘 공부 {{< color color="#FFD400" text="백준 1541" >}} 🧐
#### 잃어버린 괄호

## 👉문제
세준이는 양수와 +, -, 그리고 괄호를 가지고 식을 만들었다. 그리고 나서 세준이는 괄호를 모두 지웠다.

그리고 나서 세준이는 괄호를 적절히 쳐서 이 식의 값을 최소로 만들려고 한다.

괄호를 적절히 쳐서 이 식의 값을 최소로 만드는 프로그램을 작성하시오.

<br>

## 👉입력  
첫째 줄에 식이 주어진다. 식은 ‘0’~‘9’, ‘+’, 그리고 ‘-’만으로 이루어져 있고, 가장 처음과 마지막 문자는 숫자이다. 그리고 연속해서 두 개 이상의 연산자가 나타나지 않고, 5자리보다 많이 연속되는 숫자는 없다. 수는 0으로 시작할 수 있다. 입력으로 주어지는 식의 길이는 50보다 작거나 같다.


<br>

## 👉출력
첫째 줄에 정답을 출력한다.

<br>

🍑풀이
```csharp
using System;
using System.Collections.Generic;
using System.Linq;

namespace Algorithm10
{
    class Baekjon1541
    {
        static void Main(string[] args)
        {
            var op = new char[] {'+', '-'};
            var input = Console.ReadLine();
            var opList =  input!.ToCharArray().Where(a => a is '+' or '-').ToArray();
            var nList = input!.Split(op).Select(int.Parse).ToArray();//연산자를 기준으로 SPLIT

            if (nList.Length == 1) //수 하나만 들어왔을 경우(연산자가 없는 경우)
            {
                Console.WriteLine(nList[0]);
                return;
            }
            int re = nList[0];

            List<int> results = new List<int>();//결과값들을 저장해 놓을 공간(-기준으로 끊어 +연산한 값들)

            for (int i = 0; i < opList.Length; i++)
            {
                if (opList[i] == '+')
                {
                   re += nList[i + 1];
                }
                else
                {
                    results.Add(re);//-를 만나기 전까지 더한 수의 합을 ADD
                    re = nList[i + 1];// -를 만난 후 다음 수
                }

                if (i == opList.Length - 1)//다음 연산자가 없을 경우
                {
                    results.Add(re);
                }
            }

            var result = results[0];

            for (int i = 1; i < results.Count; i++)
            {
                result -= results[i];//처음 값에서 나머지 값을 모두 빼줌
            }
            
            Console.WriteLine(result);
        }
    }
}
```

<br>

[문제풀러가기](https://www.acmicpc.net/problem/1541)